import React from "react";
import MemberDropdown from "./components/MemberDropdown";

const members = [
  {
    image: "https://i.pravatar.cc/100?img=6",
    name: "Khang",
    role: "Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=3",
    name: "Phát",
    role: "Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=4",
    name: "Đạt",
    role: "Dev, Leader",
  },
];

const Section = () => {
  return (
    <div className="w-full h-screen bg-gray-100 p-2">
      <MemberDropdown members={members} title="team coder" />
    </div>
  );
};

export default Section;
