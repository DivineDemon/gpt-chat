import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b px-2.5">
      <SidebarTrigger />
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
