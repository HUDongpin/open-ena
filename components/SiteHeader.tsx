import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

interface SiteHeaderProps {
  active: "open-ena" | "about";
}

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="site-header-inner">
        <Link className="site-brand" href="/" aria-label="Open ENA home">
          <BrandLogo priority />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/" aria-current={active === "open-ena" ? "page" : undefined}>
            Open ENA
          </Link>
          <Link href="/about" aria-current={active === "about" ? "page" : undefined}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
