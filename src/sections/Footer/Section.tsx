import React from "react";
import { Users, Globe, Phone, Mail, Music } from "lucide-react";

type FooterProps = {
  projectInfo: {
    title: string;
    authorLabel: string;
    authorName: string;
  };

  heritageInfo: {
    title: string;
    facebookLabel: string;
    phone: string;
    email: string;
  };

  contact: {
    title: string;
    facebookLabel: string;
    tiktokLabel: string;
  };

  sources: {
    sourcesTitle: string;
    data: string[];
  };
};

const Section: React.FC<FooterProps> = ({
  projectInfo,
  heritageInfo,
  contact,
  sources,
}) => {
  return (
    <footer
      className="w-full font-sans"
      style={{
        background: `rgb(var(--color-surface))`,
        color: "rgb(var(--color-text))",
      }}
    >
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMN 1 */}
          <div className="flex flex-col items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase border-b-2 pb-1"
              style={{ borderColor: "rgb(var(--color-border))" }}>
              {projectInfo.title}
            </h3>

            <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden"
              style={{
                border: "2px solid rgb(var(--color-primary))",
                backgroundColor: "rgb(var(--color-surface-elevated))",
              }}>
              <img src="/assets/LogoTruong.png" className="w-full h-full" />
            </div>

            <ul className="text-sm space-y-4 w-full">
              <li className="flex items-start gap-3">
                <Users className="w-6 h-6 mt-1"
                  style={{ color: "rgb(var(--color-primary))" }} />
                <span className="font-semibold uppercase">
                  {projectInfo.authorLabel}: {projectInfo.authorName}
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase border-b-2 pb-1"
              style={{ borderColor: "rgb(var(--color-border))" }}>
              {heritageInfo.title}
            </h3>

            <div className="w-full mb-6 overflow-hidden"
              style={{
                border: "2px solid rgb(var(--color-primary))",
                backgroundColor: "rgb(var(--color-surface-elevated))",
              }}>
              <img src="assets/khuditich.png"
                className="w-full h-full object-contain" />
            </div>

            <ul className="text-sm space-y-4 w-full max-w-[280px] font-semibold">
              <li className="flex items-center gap-3">
                <div className="rounded-full p-1"
                  style={{ border: "2px solid rgb(var(--color-border))" }}>
                  <Globe className="w-5 h-5" />
                </div>
                <a href="https://www.facebook.com/KDTNSS/" className="underline text-blue-400">
                  {heritageInfo.facebookLabel}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="rounded-full p-1"
                  style={{ border: "2px solid rgb(var(--color-border))" }}>
                  <Phone className="w-5 h-5" />
                </div>
                <span>{heritageInfo.phone}</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="rounded-full p-1"
                  style={{ border: "2px solid rgb(var(--color-border))" }}>
                  <Mail className="w-5 h-5" />
                </div>
                <span>{heritageInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase border-b-2 pb-1"
              style={{ borderColor: "rgb(var(--color-border))" }}>
              {contact.title}
            </h3>

            <ul className="text-sm space-y-5 w-full max-w-[220px] mb-10 font-semibold">
              <li className="flex items-center gap-3">
                <div className="rounded-full p-1"
                  style={{ border: "2px solid rgb(var(--color-border))" }}>
                  <Globe className="w-5 h-5" />
                </div>
                <a href="https://www.facebook.com/profile.php?id=61580526609861"
                  className="underline text-blue-400">
                  {contact.facebookLabel}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="rounded-full p-1"
                  style={{ border: "2px solid rgb(var(--color-border))" }}>
                  <Music className="w-5 h-5" />
                </div>
                <a href="https://www.tiktok.com/@chuyentoan1khoa17nqd"
                  className="underline text-blue-400">
                  {contact.tiktokLabel}
                </a>
              </li>
            </ul>

            <h3 className="text-xl font-bold uppercase border-b-2 pb-1"
              style={{ borderColor: "rgb(var(--color-border))" }}>
              {sources.sourcesTitle}
            </h3>
            <ul className="text-sm space-y-2 mt-4 w-full max-w-[220px] font-semibold">
              {sources.data.map((value: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2"
                    style={{ backgroundColor: "rgb(var(--color-primary))" }}
                  />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Section;