"use server";

import { readFile, unlink, writeFile } from "fs/promises";
import path from "path";

import { env } from "@/env";

export async function parseImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  const filePath = path.join(
    "C:/Users/mohdm/Documents/Code/personal/gpt-chat/public/tmp/",
    fileName
  );

  await writeFile(filePath, buffer);
  const fileContent = await readFile(filePath);
  const base64String = fileContent.toString("base64");
  await unlink(filePath);

  const formData = new FormData();
  formData.append("image", base64String);

  const converted = await fetch(
    `https://api.imgbb.com/1/upload?key=${env.IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const response: {
    data: { url: String };
  } = await converted.json();

  return response.data.url;
}
