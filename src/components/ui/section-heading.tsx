type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
