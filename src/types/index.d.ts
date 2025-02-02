declare type Message = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "CLIENT" | "BOT";
  conversationId: string | null;
};

declare type AIMessage = {
  role: "user" | "assistant" | "system" | "data";
  content: any;
};
