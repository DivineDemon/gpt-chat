declare type Message = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "CLIENT" | "BOT";
  conversationId: string | null;
};
