import { type Metadata } from "next";
import { Fira_Code } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "@/assets/css/globals.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPT Chat",
  description: "Because no one should pay for help.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={cn(
            "flex min-h-[calc(100vh-1px)] flex-col antialiased",
            firaCode.className
          )}
        >
          <main className="relative flex flex-1 flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
