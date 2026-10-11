/** A symmetrical eight-point spark, drawn specifically for MODIVO. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M43 5h14v26l19-19 12 12-19 19h26v14H69l19 19-12 12-19-19v26H43V69L24 88 12 76l19-19H5V43h26L12 24l12-12 19 19V5Z"
        fill="currentColor"
      />
      <circle cx="50" cy="50" r="10" fill="var(--mark-cutout, var(--paper))" />
    </svg>
  );
}
