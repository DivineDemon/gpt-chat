"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

import Logo from "@/assets/img/favicon.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/env";
import { cn } from "@/lib/utils";

const Page = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-5">
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <form className="flex max-w-sm flex-col items-center justify-center gap-5 p-5">
        <Image
          src={Logo}
          alt="logo"
          width={48}
          height={48}
          className="size-12"
        />
        <span className="w-full text-center text-2xl font-semibold">
          Create an <span className="text-primary">account</span>
        </span>
        <div className="flex w-full flex-col items-center justify-center gap-1.5">
          <Label
            htmlFor="email"
            className="w-full text-left text-xs font-medium"
          >
            Email
          </Label>
          <Input
            placeholder="johndoe@example.com"
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <RegisterLink
          className={cn("w-full", buttonVariants({ variant: "default" }))}
          authUrlParams={{
            connection_id: env.NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID,
            register_hint: email,
          }}
        >
          Register
        </RegisterLink>
        <fieldset className="w-full border-t border-gray-300 text-center">
          <legend className="px-5">or</legend>
        </fieldset>
        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <RegisterLink
            className={cn("w-full", buttonVariants({ variant: "default" }))}
            authUrlParams={{
              connection_id: env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID,
            }}
          >
            Register with Google
          </RegisterLink>
          <RegisterLink
            className={cn("w-full", buttonVariants({ variant: "default" }))}
            authUrlParams={{
              connection_id: env.NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID,
            }}
          >
            Register with Github
          </RegisterLink>
        </div>
        <Link href="/sign-in" className="w-full text-center text-xs">
          Already have an account ?&nbsp;
          <span className="cursor-pointer font-medium text-primary underline">
            Sign in
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Page;
