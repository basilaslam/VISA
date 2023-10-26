"use";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfRender = ({
  pdfUrl,
  addToSelected,
  selectedPages,
}: {
  pdfUrl: string;
  addToSelected: (val: number) => void;
  selectedPages: number[];
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center overflow-auto">
      <div className="flex-1 w-full">
        <Document
          onLoadSuccess={(res) => setTotalPages(res._pdfInfo.numPages)}
          loading={
            <div className="flex justify-center">
              <Loader2 className="my-24 h-6 w-6 animate-spin text-primary-500" />
            </div>
          }
          className={" w-fit max-h-full mx-auto"}
          file={pdfUrl}
        >
          <ul>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                onClick={() => addToSelected(index + 1)}
                className={cn(
                  `border-black border-dashed border-2 rounded-md mt-4 ${
                    selectedPages.includes(index + 1) ? "border-blue-400" : ""
                  }`
                )}
              >
                <Page pageNumber={index + 1} className="max-h-full mx-auto" />
              </li>
            ))}
          </ul>
        </Document>
      </div>
    </div>
  );
};

export default PdfRender;
