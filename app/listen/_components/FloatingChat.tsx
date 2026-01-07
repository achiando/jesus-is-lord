"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MessageSquare, Send, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { ChatUserDetailsForm } from './ChatUserDetailsForm';
import { useChat } from '@/lib/context/ChatContext'; // Import the new useChat hook

interface UserDetails {
  fullName: string;
  altar: string;
  region: string;
  bishop?: string;
}

const LOCAL_STORAGE_KEY = 'chatUserDetails';

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Use global state from context
  const { messages, addMessage, isChatEnabled } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    } else if (isOpen) {
      setIsFormOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSaveUserDetails = (data: UserDetails) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    setUserDetails(data);
    setIsFormOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || !userDetails || !isChatEnabled) return;

    addMessage({
      sender: userDetails.fullName,
      message: message.trim(),
      altar: userDetails.altar,
      region: userDetails.region,
      role: 'user',
    });

    setMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "rotate-90 bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        )}
        onClick={toggleChat}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed bottom-40 right-4 z-50 w-80 h-[400px] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="rounded-full" />
            <h3 className="font-semibold">Live Chat</h3>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("mb-3 flex items-start gap-2", msg.role === 'admin' && 'flex-row-reverse')}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className={cn(
                  "text-sm font-bold",
                  msg.role === 'admin' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                )}>
                  {msg.sender.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className={cn("flex-1 p-2 rounded-lg", msg.role === 'admin' ? 'bg-green-50 dark:bg-green-900/50' : 'bg-gray-50 dark:bg-gray-800')}>
                <div className="flex items-baseline justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="ml-2">{msg.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{msg.message}</p>
                {msg.role === 'user' && <p className="text-xs text-gray-500 mt-0.5">{msg.altar}, {msg.region}</p>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {userDetails ? (
          <div className="p-3 border-t flex items-center">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isChatEnabled ? "Type your message..." : "Chat is currently disabled"}
              className="flex-1 resize-none h-10 pr-2"
              disabled={!isChatEnabled}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" className="ml-2 h-10 w-10" onClick={handleSendMessage} disabled={!isChatEnabled}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="p-3 border-t text-center text-sm text-gray-500">
            <Button variant="link" onClick={() => setIsFormOpen(true)}>
              Provide your details to join the chat
            </Button>
          </div>
        )}
      </div>

      <ChatUserDetailsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveUserDetails} />
    </>
  );
};
