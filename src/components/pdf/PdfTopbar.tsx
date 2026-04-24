import React from "react";
import { ZoomIn, ZoomOut, FileText } from "lucide-react";

type Props = {
  title: string;
  currentPage: number;
  numPages: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const PdfTopbar: React.FC<Props> = ({
  title,
  currentPage,
  numPages,
  onZoomIn,
  onZoomOut
}) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-[rgb(var(--color-background))] shadow">
      <div className="flex items-center gap-2">
        <FileText size={18} />
        <span className="font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span>
          {currentPage} / {numPages || "--"}
        </span>

        <button onClick={onZoomOut}>
          <ZoomOut size={18} />
        </button>

        <button onClick={onZoomIn}>
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
};

export default PdfTopbar;