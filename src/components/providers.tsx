import { type ReactNode } from "react";

import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "./theme-provider";
import { SidebarProvider } from "./ui/sidebar";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
