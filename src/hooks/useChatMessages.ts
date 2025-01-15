import { useState } from 'react';
import { Message, ChatResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

const END_POINT = import.meta.env.VITE_BACKEND_URL;

export const useChatMessages = () => {

  const [sessionId] = useState(uuidv4());

  
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Soy el asistente virtual encargado de brindarte información, apoyo y orientación sobre el consumo de drogas, prevención, y cómo buscar ayuda 🧠💬", time, isUser: false },
    { id: 2, text: " ¿Cuál es tu nombre para poder comenzar? ", time, isUser: false },
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
      const response = await fetch(`${END_POINT}/consultar?consulta=${encodeURIComponent(userMessage)}`, {
        method: 'GET',
        headers: {
          'x-session-id': sessionId
        }
      });
      const data: ChatResponse = await response.json();
      for (const element of data.respuesta) {

        await new Promise(resolve => setTimeout(resolve, 2000));
        addMessage(element, false);
      }
      
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