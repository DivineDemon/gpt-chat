"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { ArrowUp, Globe, Paperclip } from "lucide-react";

import { chat } from "@/lib/constants";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatBox = () => {
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(chat);

  const handleMessage = () => {
    setMessage("");
    setLoading(true);

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        client: message,
        bot: "",
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-5">
      <div className="flex h-full max-h-[calc(100vh-178px)] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto rounded-xl border p-4">
        {messages.map((message) => (
          <Fragment key={message.id}>
            <span className="ml-auto w-fit max-w-md text-wrap rounded-xl bg-black px-4 py-1 text-right text-white dark:bg-white dark:text-black">
              {message.client}
            </span>
            {message.bot === "" ? (
              <div className="mr-auto flex items-center justify-start rounded-xl bg-muted p-3">
                <div className="mx-1 size-2 animate-fade-dots rounded-full bg-black dark:bg-white" />
                <div
                  className="mx-1 size-2 animate-fade-dots rounded-full bg-black dark:bg-white"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="mx-1 size-2 animate-fade-dots rounded-full bg-black dark:bg-white"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            ) : (
              <span className="mr-auto w-fit max-w-md text-wrap rounded-xl bg-muted px-4 py-1 text-left">
                {message.bot}
              </span>
            )}
          </Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
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
        <div className="flex items-center justify-center gap-5">
          <Button
            type="submit"
            className="size-7 rounded-full bg-black p-1 text-white dark:bg-white dark:text-black"
          >
            <ArrowUp className="size-full" />
          </Button>
          <Paperclip className="size-5" />
          <Globe className="size-5" />
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
