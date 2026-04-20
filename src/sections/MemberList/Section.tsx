import React from "react";
import MemberDropdown from "./components/MemberDropdown";

const members = [
  {
    image: "https://i.pravatar.cc/100?img=4",
    name: "Đạt",
    role: "Dev, Leader",
  },
  {
    image: "https://i.pravatar.cc/100?img=9",
    name: "Võ Hồ Thiên Hương",
    role: "Designer, Leader design",
  },
  {
    image: "https://i.pravatar.cc/100?img=61",
    name: "Hà Bảo Khang",
    role: "Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=23",
    name: "Nguyễn Tấn Phát",
    role: "Dev",
  },
  {
    image: "https://i.pravatar.cc/100?img=32",
    name: "Bùi Phạm Khánh An",
    role: "Designer",
  },
  {
    image: "https://i.pravatar.cc/100?img=46",
    name: "Phạm Nguyễn Đăng Khôi",
    role: "Designer",
  },
  {
    image: "https://i.pravatar.cc/100?img=64",
    name: "Trần Hữu Thành",
    role: "Designer",
  },
  {
    image: "https://i.pravatar.cc/100?img=12",
    name: "Mai Nguyễn Hải Bằng",
    role: "Designer",
  },
  {
    image: "https://i.pravatar.cc/100?img=6",
    name: "Trần Phạm Anh Khoa",
    role: "Designer",
  },
];

const Section = () => {
  return (
    <div className="w-full p-2" style={{
        backgroundColor: "rgb(var(--color-background))",
      }}>
      <MemberDropdown members={members} title="Team IT" />
    </div>
  );
};

export default Section;
