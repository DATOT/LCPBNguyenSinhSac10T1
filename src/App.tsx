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
import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import TeamIT from "./pages/teamIT";
import TeamMedia from "./pages/teamMedia";
import TeamScience from "./pages/teamScience";
import TeamPresentation from "./pages/teamPresentation";

function App() {
  const lang = getLang();
  const content = getContent(lang);

  if (!content.biography || !content.historyOfSite) return null;

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/teamIT' element={<TeamIT/>}/>
        <Route path='/teamMedia' element={<TeamMedia/>}/>
        <Route path='/teamScience' element={<TeamScience/>}/>
        <Route path='/teamPresentation' element={<TeamPresentation/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;