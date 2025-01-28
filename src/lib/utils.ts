import { type ClassValue, clsx } from "clsx";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
