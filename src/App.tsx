import "./styles/index.css";

import * as BiographySection from "./sections/Biography/Section";
import * as FooterSection from "./sections/Footer/Section";
import * as GallerySection from "./sections/Gallery/Section";
import * as HeaderSection from "./sections/Header/Section";
import * as HistoryOfSiteSection from "./sections/HistoryOfSite/Section";
import * as MapSection from "./sections/Map/Section";
import * as MemberListSection from "./sections/MemberList/Section";
import * as AboutSection from "./sections/About/Section";

import Navbar from "./components/navbar/Navbar";
import { getLang, getContent } from "./i18n";

function App() {
  const lang = getLang();
  const content = getContent(lang);

  if (!content.biography || !content.historyOfSite) return null;

  return (
    <div
      className="flex flex-col gap-1"
      style={{ backgroundColor: "rgb(var(--color-blue-dark))" }}
    >
      <Navbar sections={content.navbar.sections} />

      <div id="header">
        <HeaderSection.default content={content.headerSection} />
      </div>

      <div id="about-place">
        <AboutSection.default
          varient="place"
          title={content.aboutTheSite.title}
          description={content.aboutTheSite.description}
          image={content.aboutTheSite.image}
        />
      </div>

      <div id="about-person">
        <AboutSection.default
          varient="person"
          title={content.aboutNguyenSinhSac.title}
          description={content.aboutNguyenSinhSac.description}
          image={content.aboutNguyenSinhSac.image}
        />
      </div>

      <div id="biography">
        <BiographySection.default
          data={content.biography.data}
          title={content.biography.title}
        />
      </div>

      <div id="history">
        <HistoryOfSiteSection.default
          data={content.historyOfSite.data}
          title={content.historyOfSite.title}
        />
      </div>

      <div id="map">
        <MapSection.default
          mapInfo={content.mapSection.mapInfo}
          title={content.mapSection.title}
          hint={content.mapSection.hint}
        />
      </div>

      <div id="gallery">
        <GallerySection.default config={content.gallery} />
      </div>

      <div id="members">
        <MemberListSection.default
          teams={content.teamsSection.teams}
          title={content.teamsSection.title}
        />
      </div>

      <div id="footer">
        <FooterSection.default
          projectInfo={content.footer.projectInfo}
          heritageInfo={content.footer.heritageInfo}
          contact={content.footer.contact}
          sources={content.footer.sources}
        />
      </div>
    </div>
  );
}

export default App;