"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { readStreamableValue } from "ai/rsc";
import { ArrowUp, Copy, Globe, Paperclip } from "lucide-react";

import { askQuestion } from "@/app/chat/(server-actions)/ask-question";
import { cn, copyToClipboard } from "@/lib/utils";

import { Input } from "../ui/input";

const ChatBox = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSearch, setWebSearch] = useState<boolean>(false);

  const handleFileUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleMessage = async () => {
    setMessage("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, client: message, bot: "" },
    ]);

    try {
      const { output } = await askQuestion(message, webSearch, files);
      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              bot: (lastMessage?.bot || "") + delta,
            } as Message;
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error streaming response:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-5">
      <div className="flex h-full max-h-[calc(100vh-202px)] w-full flex-col items-center justify-start gap-8 overflow-y-auto rounded-xl border p-4">
        {messages.map((message) => (
          <Fragment key={message.id}>
            <div className="flex w-full flex-col items-end justify-end gap-1.5">
              <span className="ml-auto w-fit max-w-md text-wrap rounded-xl bg-primary/20 px-4 py-1 text-right text-primary">
                {message.client}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(message.client)}
                className="flex size-6 items-center justify-center rounded p-1 transition-colors hover:bg-muted"
              >
                <Copy className="size-full text-gray-500" />
              </button>
            </div>
            {message.bot === "" ? (
              <div className="mr-auto flex items-center justify-start rounded-xl bg-primary/20 p-3">
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
              <div className="flex w-full flex-col items-start justify-start gap-1.5">
                <span className="mr-auto w-full text-wrap rounded-xl bg-transparent text-left text-primary">
                  <MDEditor.Markdown
                    source={message.bot}
                    style={{
                      backgroundColor: "transparent",
                      color: "hsl(var(--primary))",
                    }}
                    className="bg-transparent text-primary"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(message.bot)}
                  className="flex size-6 items-center justify-center rounded p-1 transition-colors hover:bg-muted"
                >
                  <Copy className="size-full text-gray-500" />
                </button>
              </div>
            )}
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
            placeholder={`What can I help with ? ${webSearch}`}
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
