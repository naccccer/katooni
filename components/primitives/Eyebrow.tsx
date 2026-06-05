import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "volt";
};

export function Eyebrow({ children, className, tone = "default" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        tone === "volt" && "text-volt-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
