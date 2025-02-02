declare type Message = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  type: "CLIENT" | "BOT";
  conversationId: string;
};

declare type AIMessage = {
  role: "user" | "assistant" | "system" | "data";
  content: any;
};
