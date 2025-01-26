import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = async () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b bg-sidebar px-2.5">
      <SidebarTrigger />
      <div className="flex gap-2.5">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
