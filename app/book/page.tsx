import type { Metadata } from "next";

import { BookingForm } from "@/components/site/booking-form";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request a confidential appointment with Joshab Psychiatric Center. We'll be in touch within 24 hours.",
};

export default function BookPage() {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-start justify-center px-4 py-12 sm:px-6 sm:py-20">
        <BookingForm />
      </div>
    </section>
  );
}
