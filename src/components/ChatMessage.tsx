import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <div className={`${message.isUser ? 'flex flex-col items-end' : 'max-w-[80%]'}`}>
    <div className="max-w-[80%]">
      <div className={`${
        message.isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-800'
      } rounded-2xl p-3 ${!message.isUser ? 'shadow-sm' : ''}`}>
        <p className="whitespace-pre-line">{message.text}</p>
      </div>
      <span className={`text-xs text-gray-500 ${message.isUser ? 'mr-2' : 'ml-2'} mt-1 block`}>
        {message.time}
      </span>
    </div>
  </div>
);