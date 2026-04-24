import { Section } from "@/components/navbar/types";
import { Member, Team } from "@/sections/MemberList/Section";

export type HistoryItem = {
  year: number;
  title: string;
  description: string;
};
export type TimelineItem = {
  time: string | number;
  title: string;
  description: string;
};
export type MapInfo = Record<
  string,
  {
    title: string;
    shortDescription?: string;
    fullDescription?: string;
    image?: string;
    showFull?: boolean;
    color?: string;
  }
>;
export type ContentSchema = {
  biography: {
    title: string;
    data: HistoryItem[];
  };
  historyOfSite: {
    title: string;
    data: TimelineItem[];
  };
  mapSection: {
    title: string;
    hint: string;
    mapInfo: MapInfo;
  };
  aboutTheSite: {
    title: string;
    description: string;
    image: string;
  };
  aboutNguyenSinhSac: {
    title: string;
    description: string;
    image: string;
  };

  gallery: {
    title: string;
    loadingText: string;

    form: {
      title: string;
      authorPlaceholder: string;
      titlePlaceholder: string;
      descriptionPlaceholder: string;
      submitText: string;

      dropIdleText: string;
      dropActiveText: string;
      dropWithFileText: string;

      errorTitleRequired: string;
      errorFileRequired: string;
    };

    card: {
      cta: string;
    };
  };

  footer: {
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
  teamsSection: {
    title: string;
    teams: Team[];
  };
  headerSection: {
    locationTag: string;
    province: string;

    badge: string;

    titleTop: string;
    titleMain: string;

    subtitlePrefix: string;
    subtitleHighlight: string;

    location: string;
    time: string;

    exploreLabel: string;

    backgroundImage: string;
  };
  navbar: {
    sections: Section[];
  };
  teamIT: {
    title: string;
    productInfo: string;
    members: Member[];
  };
  teamMedia: {
    title: string;
    posterSrc: string;
    recapSrc: string;
    trailerSrc: string;
    members: Member[];
  };
  teamScience: {
    title: string;
    infographicSrc: string;
    docSrc: string;
    members: Member[];
  };
  teamPresentation: {
    title: string;
    members: Member[];
    aboutVideoSrc: string;
  };
  productText: string;
  memberText: string;
};
