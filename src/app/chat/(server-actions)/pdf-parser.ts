"use server";

import PDFParser from "pdf2json";

export async function parsePdf(file: File) {
  let parsedText = "";

  if (!file || !(file instanceof File)) {
    throw new Error("Invalid file provided.");
  }

  const pdfParser = new (PDFParser as any)(null, 1);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{ text: string }>((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      parsedText = pdfParser.getRawTextContent();
      resolve({ text: parsedText });
    });

    try {
      pdfParser.parseBuffer(fileBuffer);
    } catch (error) {
      reject(new Error("Error loading the PDF file."));
    }
  });
}
