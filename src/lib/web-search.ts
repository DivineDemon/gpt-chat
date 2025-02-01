import { env } from "@/env";

export async function performWebSearch(query: string) {
  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": env.SERPER_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      gl: "us",
      hl: "en",
      num: 5,
    }),
  });

  if (!response.ok) {
    throw new Error(`Web search failed: ${response.statusText}`);
  }

  const data = await response.json();

  return `
    WEB SEARCH RESULTS:
    ${data.organic
      .map(
        (result: any, index: number) =>
          `${index + 1}. [${result.title}](${result.link})\n${result.snippet}`
      )
      .join("\n\n")}
      `;
}
