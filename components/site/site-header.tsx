import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <LogoMark className="h-10 w-10 text-2xl" />
          <span className="font-display text-lg font-semibold leading-tight tracking-wide text-cream sm:text-xl">
            Joshab
            <span className="hidden sm:inline"> Psychiatric Center</span>
          </span>
        </Link>
        <Button
          asChild
          size="sm"
          className="bg-gold text-navy hover:bg-gold/90"
        >
          <Link href="/book">Book an Appointment</Link>
        </Button>
      </div>
    </header>
  );
}
