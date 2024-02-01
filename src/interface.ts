interface DateMessages {
  messages: ItemMessage[];
}
interface ItemMessage {
  text: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
}

interface RequestData {
  type: "GET" | "POST" | "PATCH";
  data: object;
  headers: object;
  url: string;
}

export { DateMessages, ItemMessage, RequestData };
