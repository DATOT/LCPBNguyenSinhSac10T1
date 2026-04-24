import React, { useEffect } from "react";
import { Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  numPages: number;
  scale: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pageRefs: React.MutableRefObject<HTMLDivElement[]>;
  onPageChange: (page: number) => void;
};

const PdfPages: React.FC<Props> = ({
  numPages,
  scale,
  containerRef,
  pageRefs,
  onPageChange
}) => {

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = Number(entry.target.getAttribute("data-page"));
            onPageChange(page);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    pageRefs.current.forEach((el, i) => {
      if (!el) return;
      el.setAttribute("data-page", String(i + 1));
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [numPages]);

  return (
    <div className="min-w-max flex flex-col items-center gap-6">
      {Array.from({ length: numPages }, (_, i) => (
        <div
          key={i}
          ref={((el) => el && (pageRefs.current[i] = el) as any)}
        >
          <Page pageNumber={i + 1} scale={scale} />
        </div>
      ))}
    </div>
  );
};

export default PdfPages;