export type HistoryItem = {
  year: number;
  title: string;
  description: string;
};

export interface SectionProps {
  title: string;
  data: HistoryItem[];
}
