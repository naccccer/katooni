type OvalaLogoProps = {
  className?: string;
};

export function OvalaLogo({ className }: OvalaLogoProps) {
  return (
    <svg
      viewBox="0 0 200 36"
      role="img"
      aria-label="OVALA"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="100"
        y="26"
        textAnchor="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight={800}
        fontSize="28"
        letterSpacing="6"
        fill="currentColor"
      >
        OVALA
      </text>
    </svg>
  );
}
