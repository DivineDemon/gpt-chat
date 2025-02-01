"use server";

import mammoth from "mammoth";

export async function parseDocument(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const { value: text } = await mammoth.extractRawText({
    buffer,
  });

  return text;
}
