export interface Message {
  id: number;
  text: string;
  time: string;
  isUser: boolean;
}

export interface ChatResponse {
  messages: MessageResponse[];
}

export interface MessageResponse {
  type: string;
  text: Value;
  role: string;
}

export interface Value {
  value: string;
  annotations: string[];
}