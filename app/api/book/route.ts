import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import { SERVICE_NAMES } from "@/lib/services";

// Use "onboarding@resend.dev" for testing until the domain is verified in Resend.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Joshab Psychiatric Center <bookings@joshabpsychiatry.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type BookingInput = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseBody(body: unknown): BookingInput | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;
  const str = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const name = str("name");
  const email = str("email");
  const phone = str("phone");
  const date = str("date");
  const service = str("service");
  const notes = str("notes");

  if (!name || name.length > 200) return null;
  if (!EMAIL_RE.test(email) || email.length > 254) return null;
  if (!phone || phone.length > 50) return null;
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) return null;
  if (!SERVICE_NAMES.includes(service)) return null;
  if (notes.length > 5000) return null;

  return { name, email, phone, date, service, notes: notes || null };
}

function providerEmailHtml(b: BookingInput) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;font-weight:600;vertical-align:top;">${label}</td><td style="padding:6px 0;">${value}</td></tr>`;
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0e1f2e;">
      <h2 style="font-family:Georgia,serif;margin:0 0 16px;">New Appointment Request</h2>
      <table style="border-collapse:collapse;">
        ${row("Name", escapeHtml(b.name))}
        ${row("Email", escapeHtml(b.email))}
        ${row("Phone", escapeHtml(b.phone))}
        ${row("Preferred Date", escapeHtml(formatDate(b.date)))}
        ${row("Service", escapeHtml(b.service))}
        ${row("Notes", b.notes ? escapeHtml(b.notes).replace(/\n/g, "<br />") : "—")}
      </table>
    </div>`;
}

function patientEmailHtml(b: BookingInput) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0e1f2e;line-height:1.6;">
      <p>Hi ${escapeHtml(b.name)},</p>
      <p>Thank you for reaching out to Joshab Psychiatric Center. We have received your request for ${escapeHtml(b.service)} on ${escapeHtml(formatDate(b.date))} and will be in touch within 24 hours.</p>
      <p>— The Joshab Team</p>
    </div>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const booking = parseBody(body);
  if (!booking) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const providerEmail = process.env.PROVIDER_EMAIL;

  if (!supabaseUrl || !serviceRoleKey || !resendKey || !providerEmail) {
    console.error("[book] Missing required environment variables.");
    return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
  }

  // 1. Save to Supabase (service role key, server-side only)
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: dbError } = await supabase.from("joshab_bookings").insert({
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    date: booking.date,
    service: booking.service,
    notes: booking.notes,
  });

  if (dbError) {
    console.error("[book] Supabase insert failed:", dbError.message);
    return NextResponse.json(
      { error: "Could not save your request." },
      { status: 500 }
    );
  }

  // 2. Send both emails via Resend. Only from/to/subject/html are passed.
  const resend = new Resend(resendKey);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: providerEmail,
      subject: `New Appointment Request — ${booking.name}`,
      html: providerEmailHtml(booking),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject:
        "We received your appointment request — Joshab Psychiatric Center",
      html: patientEmailHtml(booking),
    }),
  ]);

  const labels = ["provider", "patient"];
  let emailFailures = 0;
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      emailFailures++;
      console.error(`[book] Resend ${labels[i]} email threw:`, result.reason);
    } else if (result.value.error) {
      emailFailures++;
      console.error(
        `[book] Resend ${labels[i]} email failed:`,
        result.value.error
      );
    }
  });

  // The booking is already saved, so the request itself succeeded even if
  // an email failed; failures are logged above for follow-up.
  return NextResponse.json({ ok: true, emailFailures });
}
