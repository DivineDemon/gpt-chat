import { notFound, redirect } from "next/navigation";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";

import { api } from "@/trpc/server";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not Found!");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId!);

  if (!user.emailAddresses[0]?.emailAddress) {
    return notFound();
  }

  const response = await api.user.syncUser({
    id: userId,
    lastName: user.lastName ?? "",
    imageUrl: user.imageUrl ?? "",
    firstName: user.firstName ?? "",
    email: user.emailAddresses[0].emailAddress!,
  });

  if (response) {
    redirect("/chat");
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center p-4">
      <Loader2 className="size-14 animate-spin text-primary" />
    </div>
  );
};

export default Page;
