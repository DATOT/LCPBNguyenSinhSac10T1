export type Info = {
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: string;
  showFull?: boolean;
  color?: string;
};

export interface SectionProps {
  title: string;
  hint: string;
  mapInfo: Record<string, Info>;
}
