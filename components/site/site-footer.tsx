import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";

import { LogoMark } from "@/components/site/logo-mark";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <LogoMark className="h-14 w-14 text-3xl" />
              <span className="font-display text-2xl font-semibold tracking-wide">
                Joshab Psychiatric Center
              </span>
            </div>
            <p className="mt-5 max-w-sm font-display text-lg italic text-gold">
              Evidence-informed care, deeply human in approach.
            </p>
          </div>

          <address className="space-y-3 text-sm not-italic text-cream/85">
            <h2 className="mb-4 font-display text-xl font-semibold text-cream">
              Contact
            </h2>
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Phone: </span>
                <a
                  href="tel:+16316584722"
                  className="hover:text-gold hover:underline"
                >
                  (631) 658-4722
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Email: </span>
                <a
                  href="mailto:Info@joshabpsychiatry.com"
                  className="break-all hover:text-gold hover:underline"
                >
                  Info@joshabpsychiatry.com
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Website: </span>
                <a
                  href="https://www.joshabspychiatry.com"
                  className="hover:text-gold hover:underline"
                >
                  www.joshabspychiatry.com
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Profile: </span>
                <a
                  href="https://www.psychologytoday.com/profile/1865182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold hover:underline"
                >
                  Psychology Today Profile
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Address: </span>
                230 Hilton Ave, Suite 203, Hempstead, NY 11550
              </span>
            </p>
          </address>
        </div>

        <div className="mt-10 border-t border-gold/30 pt-6 text-center text-xs text-cream/60">
          © 2025 Joshab Psychiatric Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
