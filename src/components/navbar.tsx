"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

import { clearLocalStorage, cn } from "@/lib/utils";

import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b bg-sidebar px-5">
      <SidebarTrigger />
      <div className="flex gap-5">
        <ModeToggle />
        <LogoutLink
          onClick={clearLocalStorage}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Logout
        </LogoutLink>
      </div>
    </nav>
  );
};

export default Navbar;
