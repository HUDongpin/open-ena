import Image from "next/image";
import type { TeamMember } from "@/lib/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <article className="team-card">
      <div className="team-portrait">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
          style={{ objectPosition: member.imagePosition }}
          priority={index < 2}
        />
      </div>
      <div className="team-card-body">
        <p className="team-institution">{member.institution}</p>
        <h2>{member.name}</h2>
        <p className="team-role">{member.role}</p>
        <p className="team-bio">{member.bio}</p>
        {member.profileUrl ? (
          <a className="team-profile-link" href={member.profileUrl} rel="noreferrer">
            {member.profileLabel}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
        ) : (
          <span className="team-profile-note">Portrait and affiliation supplied by the Open ENA team</span>
        )}
      </div>
    </article>
  );
}
