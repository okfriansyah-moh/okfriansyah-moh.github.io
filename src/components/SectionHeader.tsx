type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({eyebrow, title, description}: SectionHeaderProps) {
  return (
    <header className="mb-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 m-0">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ifm-font-color-base)] m-0 mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-[15px] leading-relaxed max-w-2xl m-0">{description}</p>
      )}
    </header>
  );
}
