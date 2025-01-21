import { type Metadata } from "next";
import { Fira_Code } from "next/font/google";

import "@/assets/css/globals.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPT Chat",
  description: "Because no one should pay for help.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn("antialiased", firaCode.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
