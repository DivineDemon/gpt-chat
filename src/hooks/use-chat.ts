"use client";

import { useEffect } from "react";

import { useLocalStorage } from "usehooks-ts";

import { api } from "@/trpc/react";

const useChat = () => {
  const [chatId, setChatId] = useLocalStorage("chatId", "");
  const { data: chats } = api.conversation.getConversations.useQuery();

  const conversation = chats?.find(
    (conversation) => conversation.id === chatId
  );

  useEffect(() => {
    if (chats && chats.length > 0) {
      setChatId(chats[chats.length - 1]!.id);
    }
  }, [chats, setChatId]);

  return {
    chats,
    chatId,
    setChatId,
    conversation,
  };
};

export default useChat;
