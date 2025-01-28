"use server";

import { promises as fs } from "fs";
import PDFParser from "pdf2json";

export async function parsePdf(file: File) {
  let parsedText = "";

  if (!file || !(file instanceof File)) {
    throw new Error("Invalid file provided.");
  }

  const tempFilePath = `C:/Users/mohdm/Documents/Code/personal/gpt-chat/public/tmp/${file.name}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(tempFilePath, fileBuffer);

  const pdfParser = new (PDFParser as any)(null, 1);

  return new Promise<{ text: string }>((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      parsedText = pdfParser.getRawTextContent();
      resolve({ text: parsedText });
    });

    try {
      pdfParser.loadPDF(tempFilePath);
    } catch (error) {
      reject(new Error("Error loading the PDF file."));
    }
  });
}
