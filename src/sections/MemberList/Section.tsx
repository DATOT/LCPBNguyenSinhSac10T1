import React from "react";
import MemberDropdown from "./components/MemberDropdown";

const members = [
  {
    image: "https://i.pravatar.cc/100?img=2",
    name: "Khang",
    role: "Frontend Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=3",
    name: "Phát",
    role: "Backend Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=4",
    name: "Đạt",
    role: "Designer",
  },
];

const Section = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <MemberDropdown members={members} title="team coder" />
    </div>
  );
};

export default Section;
