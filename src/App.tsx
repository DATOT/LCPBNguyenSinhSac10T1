import "./styles/index.scss";
import * as BiographySection from "./sections/Biography/Section";
import * as FooterSection from "./sections/Footer/Section";
import * as GallerySection from "./sections/Biography/Section";
import * as HeaderSection from "./sections/Header/Section";
import * as HistoryOfSiteSection from "./sections/HistoryOfSite/Section";
import * as MapSection from "./sections/Map/Section";
import * as MemberListSection from "./sections/MemberList/Section";

function App() {
  return (
    <div>
      <HeaderSection.default />
      <BiographySection.default />
      <HistoryOfSiteSection.default />
      <MapSection.default />
      <GallerySection.default />
      <MemberListSection.default />
      <FooterSection.default />
    </div>
  );
}

export default App;
