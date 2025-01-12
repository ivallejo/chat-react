import React, { useRef } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { useChatMessages } from './hooks/useChatMessages';
import { useChatScroll } from './hooks/useChatScroll';

function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, addMessage, fetchBotResponse } = useChatMessages();

  useChatScroll(messagesEndRef, [messages, isTyping]);

  const handleSendMessage = async (message: string) => {
    addMessage(message, true);
    await fetchBotResponse(message);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-lg">
        <ChatHeader isTyping={isTyping} />
        
        <div className="p-4 space-y-4 bg-gray-50 h-[600px] overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;