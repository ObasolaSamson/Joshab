"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

function todayLocalISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState(false);
  const minDate = useMemo(todayLocalISO, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (!service) {
      setServiceError(true);
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      date: String(data.get("date") ?? ""),
      service,
      notes: String(data.get("notes") ?? "").trim(),
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      form.reset();
      setService("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="w-full border-gold/40 bg-white shadow-lg">
        <CardContent
          role="status"
          className="flex flex-col items-center gap-4 p-8 text-center sm:p-12"
        >
          <CheckCircle2 className="h-14 w-14 text-teal" aria-hidden="true" />
          <p className="font-display text-3xl font-semibold text-navy">
            Thank you! We&apos;ll be in touch within 24 hours.
          </p>
          <Button asChild className="mt-2 bg-navy text-cream hover:bg-navy/90">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const submitting = status === "submitting";

  return (
    <Card className="w-full border-gold/40 bg-white shadow-lg">
      <CardHeader className="space-y-2 p-6 pb-2 text-center sm:p-8 sm:pb-2">
        <CardTitle className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Book an Appointment
        </CardTitle>
        <CardDescription className="text-sm">
          Your request is confidential. We&apos;ll respond within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              min={minDate}
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select
              value={service}
              onValueChange={(value) => {
                setService(value);
                setServiceError(false);
              }}
              disabled={submitting}
            >
              <SelectTrigger
                id="service"
                aria-required="true"
                aria-invalid={serviceError}
                className={serviceError ? "border-destructive" : undefined}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {serviceError && (
              <p className="text-sm text-destructive" role="alert">
                Please select a service.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              Message / Notes{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              disabled={submitting}
            />
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              We&apos;re sorry — something went wrong sending your request.
              Please try again, or call us at (631) 658-4722.
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-navy text-cream hover:bg-navy/90"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Request Appointment"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
