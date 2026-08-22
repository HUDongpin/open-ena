import Image from "next/image";
import type { ProjectPublication } from "@/lib/publications";

interface PublicationCardProps {
  publication: ProjectPublication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const title = publication.titleItalic ? <cite>{publication.title}</cite> : publication.title;
  const sourceTitle = publication.sourceTitleItalic ? (
    <cite>{publication.sourceTitle}{publication.sourceItalicSuffix}</cite>
  ) : (
    <>{publication.sourceTitle}{publication.sourceItalicSuffix}</>
  );

  return (
    <article className="publication-card">
      <div className="publication-cover">
        <Image
          src={publication.cover}
          alt={publication.coverAlt}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 760px) 210px, 33vw"
        />
        <div className="publication-cover-label" aria-hidden="true">
          <span>PROJECT PUBLICATION</span>
          <strong>{publication.sequence}</strong>
        </div>
        <span className="publication-cover-year" aria-hidden="true">{publication.year}</span>
      </div>

      <div className="publication-card-body">
        <p className="publication-type">{publication.typeLabel} · {publication.year}</p>
        <h3>{publication.title.replace(/\.$/, "")}</h3>
        <p className="publication-citation">
          {publication.authors} {publication.date} {title}{" "}
          {publication.sourcePrefix ? <>{publication.sourcePrefix}{" "}</> : null}
          {sourceTitle}{publication.sourceSuffix}{" "}
          {publication.href ? (
            <a href={publication.href} rel="noreferrer">{publication.href}</a>
          ) : null}
        </p>

        {publication.href ? (
          <a className="publication-link" href={publication.href} rel="noreferrer">
            {publication.linkLabel}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
        ) : (
          <span className="publication-status">{publication.statusLabel}</span>
        )}
      </div>
    </article>
  );
}
