import "./styles/index.css";
import * as BiographySection from "./sections/Biography/Section";
import * as FooterSection from "./sections/Footer/Section";
import * as GallerySection from "./sections/Gallery/Section";
import * as HeaderSection from "./sections/Header/Section";
import * as HistoryOfSiteSection from "./sections/HistoryOfSite/Section";
import * as MapSection from "./sections/Map/Section";
import * as MemberListSection from "./sections/MemberList/Section";
import * as AboutSection from "./sections/About/Section"

import { getLang, getContent } from "./i18n";

function App() {
  const lang = getLang();
  const content = getContent(lang);
  
  if (!content.biography) return null;
  if (!content.historyOfSite) return null;

  return (
    <div>
      <HeaderSection.default />
      <AboutSection.default varient="place" title={content.aboutTheSite.title} description={content.aboutTheSite.description} image={content.aboutTheSite.image}/>
      <AboutSection.default varient="person" title={content.aboutNguyenSinhSac.title} description={content.aboutNguyenSinhSac.description} image={content.aboutNguyenSinhSac.image}/>
      <BiographySection.default data={content.biography.data} title={content.biography.title}/>
      <HistoryOfSiteSection.default data={content.historyOfSite.data} title={content.historyOfSite.title}/>
      <MapSection.default mapInfo={content.mapSection.mapInfo} title={content.mapSection.title}/>
      <GallerySection.default />
      <MemberListSection.default />
      <FooterSection.default />
    </div>
  );
}

export default App;
