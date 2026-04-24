import React from "react";
import { Document, Page } from "react-pdf";

type Props = {
  src: string;
  numPages: number;
  currentPage: number;
  onSelectPage: (page: number) => void;
};

const PdfSidebar: React.FC<Props> = ({
  src,
  numPages,
  currentPage,
  onSelectPage
}) => {
  return (
    <div className="w-28 flex-shrink-0 overflow-y-auto bg-[rgb(var(--color-background))] border-r p-2 space-y-2">
      {Array.from({ length: numPages }, (_, i) => (
        <div
          key={i}
          onClick={() => onSelectPage(i + 1)}
          className={`cursor-pointer border rounded ${
            currentPage === i + 1
              ? "border-blue-500"
              : "border-transparent"
          }`}
        >
          <Document file={src}>
            <Page
              pageNumber={i + 1}
              width={80}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      ))}
    </div>
  );
};

export default PdfSidebar;