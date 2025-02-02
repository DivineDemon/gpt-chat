import { notFound, redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2 } from "lucide-react";

import { api } from "@/trpc/server";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const checkUser = await api.user.findUser();

  if (checkUser) {
    redirect("/chat");
  }

  const response = await api.user.syncUser({
    id: user.id,
    email: user.email!,
    imageUrl: user.picture!,
    firstName: user.given_name!,
    lastName: user.family_name!,
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
