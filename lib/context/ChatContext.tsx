"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  altar?: string;
  region?: string;
  role: 'user' | 'admin';
}

interface ChatContextType {
  messages: ChatMessage[];
  isChatEnabled: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleChatStatus: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatEnabled, setIsChatEnabled] = useState(true);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const toggleChatStatus = useCallback(() => {
    setIsChatEnabled((prev) => !prev);
  }, []);

  const value = {
    messages,
    isChatEnabled,
    addMessage,
    toggleChatStatus,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
