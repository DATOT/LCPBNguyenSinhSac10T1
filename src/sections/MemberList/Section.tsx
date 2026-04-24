import React from "react";
import MemberLink from "./components/MemberLink";

export type Member = {
  image: string;
  name: string;
  role: string;
};

export type TeamIT = {
  teamName: string;
  members: Member[];
};

export type TeamMedia = {
  teamName: string;
  trailerSrc: string;
  recapSrc: string;
  posterSrc: string;
  members: Member[];
};

export type TeamScience = {
  teamName: string;
  infoGraphicSrc: string;
  reportSrc: string;
  informationPostSrc: string;
  members: Member[];
};

export type TeamPresentation = {
  teamName: string;
  infoGraphicSrc: string;
  reportSrc: string;
  informationPostSrc: string;
  members: Member[];
};

export type Team = {
  title: string;
  href: string;
}

export type SectionProps = {
  title: string;
  teams: Team[];
};

const Section: React.FC<SectionProps> = ({ teams, title }: SectionProps) => {
  console.log(teams)
  return (
    <div
      className="w-full p-2 space-y-4"
      style={{
        backgroundColor: "rgb(var(--color-background))",
      }}
    >
      <h1 className="mb-6 text-3xl font-semibold text-[rgb(var(--color-text))]">{title}</h1>
      {teams.map((team, index) => (
        <MemberLink
          key={index}
          href={team.href}
          title={team.title}
        />
      ))}
    </div>
  );
};

export default Section;