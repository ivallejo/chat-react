import { useState } from 'react';
import { Message, ChatResponse } from '../types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! ¿En qué puedo ayudarte hoy? 👋", time: "15:45", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text: string, isUser: boolean) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      time,
      isUser
    }]);
  };

  const fetchBotResponse = async (userMessage: string) => {
    try {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch(`http://localhost:3001/consultar?consulta=${encodeURIComponent(userMessage)}`);
      const data: ChatResponse = await response.json();
      addMessage(data.respuesta, false);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      addMessage("Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.", false);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    addMessage,
    fetchBotResponse
  };
};