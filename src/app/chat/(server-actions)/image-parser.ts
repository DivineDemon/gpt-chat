"use server";

import { env } from "@/env";

export async function parseImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64String = buffer.toString("base64");

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
