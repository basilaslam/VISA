import axios from "axios";
import { PDFDocument, rgb } from 'pdf-lib'
import { createUploadthing, type FileRouter } from "uploadthing/express";


export async function POST(req: Request){
    const {pages, url} = req.body as any
    
    const joinPDFPages = async () => {
        const f = createUploadthing();

        try {
          // Download the PDF from the URL
          const response = await axios.get(url, {
            responseType: 'arraybuffer',
          });
      
          // Load the PDF document
          const pdfDoc = await PDFDocument.load(response.data);
      
          // Create a new PDF document for the joined pages
          const newPdfDoc = await PDFDocument.create();
      
          // Iterate through the page numbers and add them to the new document
          for (const pageNumber of pages) {
            if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
              const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
              newPdfDoc.addPage(page);
            } else {
              console.log(`Page ${pageNumber} does not exist in the input PDF.`);
            }
          }
      
          // Serialize the new PDF document
          const pdfBytes = await newPdfDoc.save();
      
              
        } catch (error) {
          console.error('Error:', error);
        }
      };

      joinPDFPages()
}