import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-white border-t">
      <div className="flex items-center gap-2">
        <button className="p-2">
          <Paperclip className="w-6 h-6 text-gray-500" />
        </button>
        <input
          type="text"
          placeholder="Escribe tu pregunta..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
        <button 
          onClick={handleSend}
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};