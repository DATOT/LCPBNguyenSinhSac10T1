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
    description: string;
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
};
