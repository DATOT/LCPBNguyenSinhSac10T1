import React, { useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";

import PdfSidebar from "./PdfSidebar";
import PdfTopbar from "./PdfTopbar";
import PdfPages from "./PdfPages";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfViewerProps = {
  src: string;
  title?: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ src, title = "Document" }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<HTMLDivElement[]>([]);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages);
  };

  const scrollToPage = (page: number) => {
    const el = pageRefs.current[page - 1];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full h-screen flex bg-[rgb(var(--color-background))]">
      
      <PdfSidebar
        src={src}
        numPages={numPages}
        currentPage={currentPage}
        onSelectPage={scrollToPage}
      />

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        <PdfTopbar
          title={title}
          currentPage={currentPage}
          numPages={numPages}
          onZoomIn={() => setScale(s => s + 0.1)}
          onZoomOut={() => setScale(s => Math.max(0.4, s - 0.1))}
        />

        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-6 bg-[rgb(var(--color-surface))]"
        >
          <Document file={src} onLoadSuccess={onLoadSuccess}>
            <PdfPages
              numPages={numPages}
              scale={scale}
              containerRef={containerRef}
              pageRefs={pageRefs}
              onPageChange={setCurrentPage}
            />
          </Document>
        </div>

      </div>
    </div>
  );
};

export default PdfViewer;