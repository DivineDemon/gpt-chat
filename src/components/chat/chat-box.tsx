"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { readStreamableValue } from "ai/rsc";
import { ArrowUp, Copy, Globe, Paperclip } from "lucide-react";

import { askQuestion } from "@/app/chat/(server-actions)/ask-question";
import useChat from "@/hooks/use-chat";
import useRefetch from "@/hooks/use-refetch";
import { cn, copyToClipboard } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Input } from "../ui/input";

const ChatBox = () => {
  const refetch = useRefetch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatId, conversation, setChatId } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSearch, setWebSearch] = useState<boolean>(false);
  const createMessage = api.message.createMessage.useMutation();
  const createConversation = api.conversation.createConversation.useMutation();

  const handleFileUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleMessage = async () => {
    if (!message.trim()) {
      return;
    }

    setMessage("");
    setLoading(true);

    setMessages([
      ...messages,
      {
        id: `${messages.length + 1}`,
        type: "CLIENT",
        content: message,
        conversationId: chatId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: `${messages.length + 2}`,
        type: "BOT",
        content: "",
        conversationId: chatId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    try {
      await createMessage.mutateAsync({
        content: message,
        conversationId: chatId,
        type: "CLIENT",
      });

      let botResponse = "";
      const { output } = await askQuestion(message, webSearch, chatId, files);

      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          botResponse += delta;

          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content: (lastMessage?.content || "") + delta,
            } as Message;
            return updatedMessages;
          });
        }
      }

      await createMessage.mutateAsync({
        content: botResponse,
        conversationId: chatId,
        type: "BOT",
      });
    } catch (error) {
      console.error("Error streaming response:", error);
    } finally {
      setLoading(false);
    }

    setFiles([]);
    refetch();
  };

  const createNewConversation = async () => {
    const response = await createConversation.mutateAsync();

    if (response) {
      setChatId(response.id);
    }

    refetch();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      createNewConversation();
    } else {
      setMessages(conversation?.messages || []);
    }
  }, [chatId, conversation]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-5">
      <div className="flex h-full max-h-[calc(100vh-202px)] w-full flex-col items-center justify-start gap-8 overflow-y-auto rounded-xl border p-4">
        {messages.map((message) => (
          <Fragment key={message.id}>
            <div
              className={cn("flex w-full flex-col gap-1.5", {
                "items-end justify-end": message.type === "CLIENT",
                "items-start justify-start": message.type === "BOT",
              })}
            >
              <span
                className={cn("text-wrap rounded-xl text-primary", {
                  "ml-auto w-fit max-w-md bg-primary/20 px-4 py-1 text-right":
                    message.type === "CLIENT",
                  "mr-auto w-full bg-transparent text-left":
                    message.type === "BOT",
                })}
              >
                {message.type === "CLIENT" ? (
                  message.content
                ) : message.content === "" ? (
                  <div className="mr-auto flex w-fit items-center justify-start rounded-xl bg-primary/20 p-3">
                    <div className="mx-1 size-2 animate-fade-dots rounded-full bg-primary" />
                    <div
                      className="mx-1 size-2 animate-fade-dots rounded-full bg-primary"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="mx-1 size-2 animate-fade-dots rounded-full bg-primary"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                ) : (
                  <MDEditor.Markdown
                    source={message.content}
                    style={{
                      backgroundColor: "transparent",
                      color: "hsl(var(--primary))",
                    }}
                    className="bg-transparent text-primary max-w-md prose"
                  />
                )}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(message.content)}
                className="flex size-6 items-center justify-center rounded p-1 transition-colors hover:bg-muted"
              >
                <Copy className="size-full text-gray-500" />
              </button>
            </div>
          </Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-1.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessage();
          }}
          className="flex w-full items-center justify-center overflow-hidden rounded-full bg-muted px-5 py-2.5"
        >
          <Input
            type="text"
            value={message}
            disabled={loading}
            placeholder="What can I help with ?"
            className="flex-1 border-none shadow-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Input
            type="file"
            multiple={true}
            max={3}
            ref={fileRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFiles(Array.from(e.target.files));
              }
            }}
          />
          <div className="flex items-center justify-center gap-5">
            <button
              type="submit"
              disabled={loading || !message}
              className="size-8 rounded-full bg-primary p-1.5 text-white hover:bg-primary/90"
            >
              <ArrowUp className="size-full" />
            </button>
            <button
              type="button"
              onClick={handleFileUpload}
              disabled={loading}
              className={cn(
                "relative size-8 rounded-full bg-black p-1.5 text-white hover:bg-primary/90",
                {
                  "bg-primary": files.length > 0,
                }
              )}
            >
              <Paperclip className="size-full" />
              {files.length > 0 && (
                <div className="absolute -right-1 -top-1 size-4 rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                  {files.length}
                </div>
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => setWebSearch(!webSearch)}
              className={cn(
                "size-8 cursor-pointer rounded-full bg-black p-1.5 text-white hover:bg-primary/90",
                {
                  "bg-primary": webSearch,
                }
              )}
            >
              <Globe className="size-full" />
            </button>
          </div>
        </form>
        <span className="w-full text-right text-xs text-gray-500">
          Only text-based and Image files are allowed. A Maximum of only 3 files
          for each query.
        </span>
      </div>
    </div>
  );
};

export default ChatBox;
