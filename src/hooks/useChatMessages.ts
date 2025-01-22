import { useState, useEffect } from 'react';
import { Message, ChatResponse } from '../types';

const END_POINT = import.meta.env.VITE_BACKEND_URL;

interface ThreadResponse {
  threadId: string;
}

export const useChatMessages = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(() => {
    return localStorage.getItem('threadId');
  });

  // Efecto para cargar mensajes anteriores cuando hay un threadId
  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (!threadId) return;
      
      try {
        const response = await fetch(`${END_POINT}/message/${threadId}`);
        const data: ChatResponse = await response.json();
        
        // Limpiar mensajes existentes antes de agregar los recuperados
        setMessages([]);
        // Agregar cada mensaje recuperado
        data.messages.reverse().forEach(message => {
          const now = new Date();
          const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          });
          
          if (message.text) {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              text: message.text.value,
              time,
              isUser: message.role === 'user'
            }]);
          }
        });
      } catch (error) {
        console.error('Error al recuperar mensajes anteriores:', error);
      }
    };

    fetchPreviousMessages();
  }, []);

  // Efecto existente para obtener threadId
  useEffect(() => {
    const fetchThreadId = async () => {
      if (threadId) return;
      
      try {
        const response = await fetch(`${END_POINT}/thread`);
        const data: ThreadResponse = await response.json();
        setThreadId(data.threadId);
        localStorage.setItem('threadId', data.threadId);
      } catch (error) {
        console.error('Error al obtener threadId:', error);
      }
    };

    fetchThreadId();
  }, [threadId]);

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
      const response = await fetch(`${END_POINT}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          threadId: threadId // Usar el threadId dinámico en lugar del hardcodeado
        })
      });
      const data: ChatResponse = await response.json();

      const element = data.messages[0]
      addMessage(element.text.value, false);
      
      // for (const element of data.messages) {
        // addMessage(element.text.value, false);
      // }
      
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
    fetchBotResponse,
    threadId
  };
};