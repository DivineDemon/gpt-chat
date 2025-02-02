import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/img/favicon.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-5">
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <Image src={Logo} alt="logo" width={64} height={64} className="size-16" />
      <div className="flex w-full flex-col items-center justify-center gap-1.5">
        <span className="w-full text-center text-5xl font-bold">GPT Chat</span>
        <span className="w-full text-center dark:text-white/50">
          Login or Register to Continue
        </span>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({
              variant: "default",
              className: "h-[33px]",
            })
          )}
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({
              variant: "outline",
            })
          )}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Page;
