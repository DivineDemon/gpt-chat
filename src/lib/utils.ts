import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imageToB64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error("FileReader result is empty."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsDataURL(file);
  });
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (err) {
    toast.error("Failed to copy to clipboard.");
  }
}

export function cleanAndTruncate(input: string, maxLength: number): string {
  const cleaned = input.replace(/[^a-zA-Z0-9 ]/g, "");

  if (cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength) + "...";
  }

  return cleaned;
}

export function clearLocalStorage() {
  localStorage.clear();
}
