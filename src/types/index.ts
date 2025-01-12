export interface Message {
  id: number;
  text: string;
  time: string;
  isUser: boolean;
}

export interface ChatResponse {
  respuesta: string;
}