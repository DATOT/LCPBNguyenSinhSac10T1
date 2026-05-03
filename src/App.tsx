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
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/home";
import TeamIT from "./pages/teamIT";
import TeamMedia from "./pages/teamMedia";
import TeamScience from "./pages/teamScience";
import TeamPresentation from "./pages/teamPresentation";
import { useEffect, useState } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function TeamsPage() {
  const [team, setTeam] = useState(
    window.location.hash.replace("#", "") || "IT"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setTeam(window.location.hash.replace("#", "") || "IT");
      window.scrollTo(0, 0); // optional
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div>
      <nav>
        <a href="#IT">IT</a>
        <a href="#Media">Media</a>
        <a href="#Science">Science</a>
        <a href="#Presentation">Presentation</a>
      </nav>

      {team === "IT" && <TeamIT />}
      {team === "Media" && <TeamMedia />}
      {team === "Science" && <TeamScience />}
      {team === "Presentation" && <TeamPresentation />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='/teams'>
          <Route path='IT' element={<TeamIT />} />
          <Route path='Media' element={<TeamMedia />} />
          <Route path='Science' element={<TeamScience />} />
          <Route path='Presentation' element={<TeamPresentation />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;