import React from 'react';
import { ArrowLeft, Video, Phone } from 'lucide-react';

interface ChatHeaderProps {
  isTyping: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isTyping }) => (
  <div className="px-4 py-3 flex items-center justify-between border-b">
    <div className="flex items-center gap-3">
      <button className="p-1">
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm">🤖</span>
        </div>
        <div>
          <h1 className="font-semibold text-gray-900">ChatBot</h1>
          <p className="text-sm text-emerald-500">
            {isTyping ? "Escribiendo..." : "En línea"}
          </p>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button>
        <Video className="w-6 h-6 text-gray-700" />
      </button>
      <button>
        <Phone className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  </div>
);