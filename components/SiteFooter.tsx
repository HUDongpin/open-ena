import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-mark" href="/" aria-label="Open ENA home">
          <img src="/logo-open-ena-mark.svg" alt="" width="36" height="36" />
          <span>Open ENA</span>
        </Link>
        <p>Open methods. Open tooling. Transparent analysis.</p>
      </div>
      <div className="site-footer-meta">
        <span>Next.js · jENA target</span>
        <a href="https://github.com/hudongpin/open-ena" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
