"use client";

import { useMemo, useState } from "react";

import { Edit, Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useChat from "@/hooks/use-chat";
import useRefetch from "@/hooks/use-refetch";
import { cleanAndTruncate, cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AppSidebar = () => {
  const refetch = useRefetch();
  const { chatId, chats, setChatId } = useChat();
  const [selected, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deleteConversation = api.conversation.deleteConversation.useMutation();
  const createConversation = api.conversation.createConversation.useMutation();

  const filteredChats = useMemo(() => {
    if (!chats) return [];
    return searchQuery
      ? chats.filter((item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : chats;
  }, [chats, searchQuery]);

  const handleConversationCreation = async () => {
    const response = await createConversation.mutateAsync(undefined, {
      onSuccess: () => {
        toast.success("Conversation created!");
      },
      onError: () => {
        toast.error("Failed to create conversation!");
      },
    });

    if (response) {
      setChatId(response.id);
    }

    refetch();
  };

  const changeActiveConversation = (id: string) => {
    setChatId(id);
  };

  const handleDelete = async (id: string) => {
    await deleteConversation.mutateAsync(
      { conversationId: id },
      {
        onSuccess: () => {
          toast.success("Conversation deleted!");
        },
        onError: () => {
          toast.error("Failed to delete conversation!");
        },
      }
    );
    refetch();
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b">
        <div className="flex h-full w-full items-center justify-center gap-2.5">
          <Input
            type="text"
            placeholder="Search Chats..."
            className="flex-1"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button
            disabled={createConversation.isPending}
            onClick={handleConversationCreation}
            type="button"
            variant="outline"
            size="icon"
          >
            {createConversation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Edit />
            )}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredChats.length > 0 ? (
              filteredChats.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <div
                      className={cn("flex w-full items-center justify-start", {
                        "bg-primary/20 text-primary": item.id === chatId,
                      })}
                    >
                      <div
                        onClick={() => changeActiveConversation(item.id)}
                        className="flex flex-1 cursor-pointer items-center justify-center"
                      >
                        <div className="flex size-5 items-center justify-center rounded-sm bg-primary uppercase text-white">
                          {cleanAndTruncate(`${item.name}`, 14).charAt(0)}
                        </div>
                        <span className="ml-2 flex-1 text-left">
                          {cleanAndTruncate(`${item.name}`, 14)}
                        </span>
                      </div>
                      <button
                        disabled={deleteConversation.isPending}
                        onClick={() => {
                          setSelected(item.id);
                          handleDelete(item.id);
                        }}
                        type="button"
                      >
                        {deleteConversation.isPending &&
                        selected === item.id ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          <Trash className="size-5" />
                        )}
                      </button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? "No chats found matching your search."
                  : "No chats available."}
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
