"use client";

import Image from "next/image";
import Link from "next/link";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { BrainCog, Waypoints } from "lucide-react";

import GithubIcon from "@/assets/img/github.svg";
import GoogleIcon from "@/assets/img/google.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <div className="relative grid w-full flex-grow items-center px-4 sm:justify-center">
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 px-4 py-10 sm:w-96 sm:px-8"
        >
          <header className="flex flex-col items-center text-center">
            <BrainCog className="size-10 text-primary" />
            <h1 className="mt-4 text-xl font-medium tracking-tight">
              Create an account
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="emailAddress" className="space-y-2">
              <Clerk.Label className="sr-only">Email</Clerk.Label>
              <Clerk.Input
                type="email"
                required
                placeholder="Email"
                className="w-full border-b border-neutral-200 bg-transparent pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="sr-only">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                placeholder="Password"
                className="w-full border-b border-neutral-200 bg-transparent pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignUp.Captcha className="empty:hidden" />
          <SignUp.Action
            submit
            className={cn(
              "w-full",
              buttonVariants({
                variant: "default",
              })
            )}
          >
            Sign Up
          </SignUp.Action>
          <div className="rounded-xl bg-neutral-100 p-5 dark:bg-white/10">
            <p className="mb-4 text-center text-sm/5 text-neutral-500 dark:text-gray-400">
              Alternatively, sign up with these platforms
            </p>
            <div className="space-y-2">
              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
              >
                <Image src={GoogleIcon} alt="google-icon" className="size-5" />
                Register with Google
              </Clerk.Connection>
              <Clerk.Connection
                name="github"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
              >
                <Image src={GithubIcon} alt="github-icon" className="size-5" />
                Register with Github
              </Clerk.Connection>
            </div>
          </div>
          <p className="text-center text-sm text-neutral-500">
            Already have an account?&nbsp;
            <Link
              href="/sign-in"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:underline dark:text-primary"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="verifications"
          className="w-full space-y-6 px-4 py-10 sm:w-96 sm:px-8"
        >
          <header className="flex flex-col items-center text-center">
            <Waypoints className="size-10 text-primary" />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
              Verify email code
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="sr-only">Email code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                placeholder="Email code"
                className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <SignUp.Action
              submit
              className={cn("w-full", buttonVariants({ variant: "default" }))}
            >
              Verify
            </SignUp.Action>
          </SignUp.Strategy>
          <p className="text-center text-sm text-neutral-500">
            Already have an account?&nbsp;
            <Link
              href="/sign-in"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:underline dark:text-primary"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
};

export default Page;
