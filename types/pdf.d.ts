export interface PDF {
    _id: string;
    fileName: string;
    fileUrl: string;
    fileKey: string;
    uploadedBy: string;
    uploadedAt: string;
    __v: number;
  }

  export interface PdfApiResponse {
      products: PDF[],
      status: string
} 
  export interface SinglePdfApiResponse {
    pdfData: PDF,
    status: string
} 