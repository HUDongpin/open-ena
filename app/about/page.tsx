import type { Metadata } from "next";
import Link from "next/link";
import PublicationCard from "@/components/PublicationCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TeamCard from "@/components/TeamCard";
import { projectPublications } from "@/lib/publications";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the researchers behind Open ENA and explore the project's publications.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Open ENA",
    description: "Meet the researchers behind Open ENA and explore the project's publications.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About | Open ENA",
    description: "Meet the researchers behind Open ENA and explore the project's publications.",
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
  const publicationsJsonLd = projectPublications.map((publication) => ({
    "@type": publication.href ? "ScholarlyArticle" : "CreativeWork",
    name: publication.title.replace(/\.$/, ""),
    author: publication.schemaAuthors.map((name) => ({ "@type": "Person", name })),
    ...(publication.href ? { datePublished: publication.datePublished } : {}),
    image: `https://www.open-ena.com${publication.cover}`,
    isPartOf: { "@type": "CreativeWork", name: publication.sourceName },
    ...(publication.href ? { sameAs: publication.href, identifier: publication.href } : {}),
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
              "@graph": [...peopleJsonLd, ...publicationsJsonLd],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <section className="about-hero" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">ABOUT OPEN ENA</p>
            <h1 id="about-title">A small team.<br /><em>An open horizon.</em></h1>
          </div>
          <div className="about-hero-copy">
            <p>Open ENA brings together learning science, quantitative ethnography, artificial intelligence, and educational technology.</p>
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

        <section className="publications-section" aria-labelledby="publications-title">
          <div className="publications-heading">
            <p className="eyebrow">PROJECT PUBLICATIONS</p>
            <h2 id="publications-title">Research behind the open work.</h2>
            <span>Selected work across three-dimensional ENA, data literacy, and the development of open, web-based analysis tools.</span>
          </div>
          <div className="publications-grid">
            {projectPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
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
