import Image from "next/image";
import Link from "next/link";
import { Brain, ExternalLink, MessagesSquare, Pill, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoMark } from "@/components/site/logo-mark";
import { SERVICES } from "@/lib/services";

const SERVICE_ICONS = {
  Psychotherapy: Brain,
  "Medication Management": Pill,
  "Talk Therapy": MessagesSquare,
  "Integrative Care": Sprout,
} as const;

const BIO_PARAGRAPHS = [
  'Abiodun Agbabiaka — known as "Abi" — is a board-certified Psychiatric Nurse Practitioner with more than a decade of inpatient experience, providing comprehensive mental health care to individuals ages 6 through 65. Grounded in the traditional standards of psychiatric practice, Abi integrates a deeply interpersonal approach that values connection, trust, and collaboration.',
  "With extensive clinical expertise, Abi offers a full spectrum of treatment modalities, including medication management, psychotherapy, talk therapy, and integrative care. For patients who desire a faith-based component, prayer therapy can be incorporated as part of a holistic healing plan. Across all settings, Abi is committed to delivering compassionate, evidence-informed care that supports emotional wellness, resilience, and long-term stability.",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy text-cream">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36">
          <LogoMark className="h-24 w-24 text-6xl sm:h-28 sm:w-28 sm:text-7xl" />
          <h1 className="mt-8 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A Healthier Mind. A Brighter Tomorrow.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-base text-cream/80 sm:text-lg">
            Comprehensive psychiatric care for ages 6–65, in-person &amp;
            virtual.
          </p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold text-navy hover:bg-gold/90"
            >
              <Link href="/book">Book an Appointment</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold bg-transparent text-cream hover:bg-gold/15 hover:text-cream"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-16 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center text-4xl font-semibold text-navy sm:text-5xl">
            Meet Abi
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          <div className="mt-10 flex justify-center">
            <Image
              src="/images/abi-portrait.jpg"
              alt="Abiodun Agbabiaka in a navy three-piece suit and red bow tie"
              width={768}
              height={1024}
              priority
              className="h-auto w-56 rounded-2xl border-4 border-gold object-cover shadow-lg sm:w-64"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="font-display text-2xl font-semibold text-teal sm:text-3xl">
              Abiodun Agbabiaka, PMHNP-BC
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-navy/70">
              Psychiatric Nurse Practitioner · DNP Candidate, Wilkes University
            </p>
          </div>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-navy/85 sm:text-lg">
            {BIO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-3">
            <Image
              src="/images/abi-formal.jpg"
              alt="Abiodun Agbabiaka in a white shirt, burgundy bow tie and suspenders"
              width={768}
              height={1024}
              className="aspect-[3/4] w-full rounded-xl object-cover shadow-md"
            />
            <Image
              src="/images/abi-studying.jpg"
              alt="Abiodun Agbabiaka studying advanced cardiovascular assessment materials"
              width={768}
              height={1024}
              className="aspect-[3/4] w-full rounded-xl object-cover object-right shadow-md"
            />
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-cream"
            >
              <a
                href="https://www.psychologytoday.com/profile/1865182"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Abi&apos;s Psychology Today Profile
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-16 bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center text-4xl font-semibold sm:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.name];
              return (
                <Card
                  key={service.name}
                  className="flex flex-col border-0 border-t-4 border-t-gold bg-teal text-cream shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="font-display text-2xl font-semibold leading-tight">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-cream/85">
                    {service.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="bg-gold text-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-balance text-4xl font-semibold sm:text-5xl">
            Ready to Take the First Step?
          </h2>
          <p className="mt-4 text-base text-navy/85 sm:text-lg">
            Book a confidential appointment online. We&apos;ll be in touch
            within 24 hours.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-navy text-cream hover:bg-navy/90"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
