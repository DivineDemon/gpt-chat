import { type ReactNode } from "react";

import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "./theme-provider";
import { SidebarProvider } from "./ui/sidebar";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <TooltipProvider>
            <Toaster richColors={true} duration={1500} />
            {children}
          </TooltipProvider>
        </SidebarProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
