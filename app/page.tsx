import type { Metadata } from "next";
import Link from "next/link";
import NetworkHero from "@/components/NetworkHero";
import OpenEnaPreview from "@/components/OpenEnaPreview";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Open ENA" },
  description: "Explore the Open ENA interface for transparent, browser-based Epistemic Network Analysis prepared for jENA integration.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Open ENA",
    description: "Explore a transparent Open ENA interface prepared for future jENA integration.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Open ENA",
    description: "Explore a transparent Open ENA interface prepared for future jENA integration.",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader active="open-ena" />
      <main id="main-content">
        <section className="open-hero" aria-labelledby="open-hero-title">
          <div className="open-hero-copy">
            <p className="eyebrow"><span aria-hidden="true" /> OPEN METHODS · OPEN TOOLING</p>
            <h1 id="open-hero-title">Epistemic networks,<br /><em>open by design.</em></h1>
            <p className="open-hero-lead">Open ENA is a focused, browser-based path from coded discourse to interpretable connections—designed around jENA and shaped for transparent research.</p>
            <div className="open-hero-actions">
              <a className="button-primary" href="#workspace">Explore the interface</a>
              <Link className="button-secondary" href="/about">Meet the team</Link>
            </div>
            <dl className="open-hero-facts">
              <div><dt>Framework</dt><dd>Next.js</dd></div>
              <div><dt>Planned runtime</dt><dd>jENA 0.6.2</dd></div>
              <div><dt>Current release</dt><dd>UI preview</dd></div>
            </dl>
          </div>
          <NetworkHero />
        </section>
        <OpenEnaPreview />
      </main>
      <SiteFooter />
    </>
  );
}
