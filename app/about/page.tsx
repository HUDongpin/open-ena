import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TeamCard from "@/components/TeamCard";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the researchers and collaborators behind Open ENA.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Open ENA",
    description: "Meet the researchers and collaborators behind Open ENA.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About | Open ENA",
    description: "Meet the researchers and collaborators behind Open ENA.",
  },
};

export default function AboutPage() {
  const peopleJsonLd = teamMembers.map((member) => ({
    "@type": "Person",
    name: member.name,
    affiliation: {
      "@type": "Organization",
      name: member.institution,
    },
    description: member.bio,
    ...(member.profileUrl ? { sameAs: member.profileUrl } : {}),
  }));

  return (
    <>
      <SiteHeader active="about" />
      <main id="main-content" className="about-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": peopleJsonLd,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <section className="about-hero" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">ABOUT OPEN ENA</p>
            <h1 id="about-title">A small team.<br /><em>An open horizon.</em></h1>
          </div>
          <div className="about-hero-copy">
            <p>Open ENA brings together learning science, quantitative ethnography, data science, and educational technology.</p>
            <p>We are building a transparent and approachable path into Epistemic Network Analysis—one where methods, interface decisions, and future capabilities can be inspected rather than hidden.</p>
          </div>
        </section>

        <section className="team-section" aria-labelledby="team-title">
          <div className="team-section-heading">
            <p className="eyebrow">THE TEAM</p>
            <h2 id="team-title">People behind the open work.</h2>
            <span>Four perspectives, connected by a shared commitment to understandable research tools.</span>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => <TeamCard key={member.name} member={member} index={index} />)}
          </div>
        </section>

        <section className="about-principle" aria-labelledby="principle-title">
          <div className="about-principle-mark" aria-hidden="true">
            <img src="/logo-open-ena-mark.svg" alt="" width="118" height="118" />
          </div>
          <div>
            <p className="eyebrow">WHY OPEN</p>
            <h2 id="principle-title">Openness is more than access.</h2>
            <p>It means making the path from evidence to interpretation visible: what the model receives, what the computation does, what the figure shows, and what it cannot claim.</p>
            <Link className="button-primary" href="/">Explore Open ENA</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
