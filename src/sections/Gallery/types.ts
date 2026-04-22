export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
};

export interface SectionProps {
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
}
