"use server";

import * as XLSX from "xlsx";

export async function parseSpreadsheet(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const sheetsData: Record<string, any[]> = {};
    const workbook = XLSX.read(buffer, { type: "buffer" });

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      sheetsData[sheetName] = XLSX.utils.sheet_to_json(worksheet!, {
        defval: "",
      });
    });

    return JSON.stringify(sheetsData);
  } catch (error) {
    console.error("Error parsing spreadsheet:", error);
    throw new Error("Failed to parse the spreadsheet file.");
  }
}
