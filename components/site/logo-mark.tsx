import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

/** Circular gold-bordered mark with an italic "J". Size via className (e.g. "h-20 w-20 text-5xl"). */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-navy font-display text-3xl italic leading-none text-gold",
        className
      )}
    >
      <span className="-translate-y-[0.04em] pr-[0.06em]">J</span>
    </span>
  );
}
