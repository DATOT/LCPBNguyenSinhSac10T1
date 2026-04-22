import React from "react";
import MemberDropdown from "./components/MemberDropdown";

export type Member = {
  image: string;
  name: string;
  role: string;
};

export type Team = {
  title: string;
  members: Member[];
};

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
        <MemberDropdown
          key={index}
          members={team.members}
          title={team.title}
        />
      ))}
    </div>
  );
};

export default Section;