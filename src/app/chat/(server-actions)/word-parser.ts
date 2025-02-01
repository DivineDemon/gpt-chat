"use server";

import { unlink, writeFile } from "fs/promises";
import mammoth from "mammoth";
import path from "path";

export async function parseDocument(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  const filePath = path.join(
    "C:/Users/mohdm/Documents/Code/personal/gpt-chat/public/tmp/",
    fileName
  );

  await writeFile(filePath, buffer);

  const { value: text } = await mammoth.extractRawText({
    buffer,
    path: filePath,
  });

  await unlink(filePath);

  return text;
}
