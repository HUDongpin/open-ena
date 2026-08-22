interface BrandLogoProps {
  priority?: boolean;
}

export default function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <picture className="brand-logo">
      <source media="(max-width: 480px)" srcSet="/logo-open-ena-compact.svg" />
      <img
        src="/logo-open-ena.svg"
        alt="Open ENA — Epistemic Network Analysis"
        width="250"
        height="80"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
