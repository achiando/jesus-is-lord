"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/lib/context/ChatContext';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ChatUserDetailsForm } from './ChatUserDetailsForm'; // Assuming this is still needed for user details

interface UserDetails {
  fullName: string;
  altar: string;
  region: string;
  bishop?: string;
}

const LOCAL_STORAGE_KEY = 'chatUserDetails';

export const IntegratedChat: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const { messages, addMessage, isChatEnabled } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    } else {
      // If chat is enabled and no details, prompt user
      if (isChatEnabled) {
        setIsFormOpen(true);
      }
    }
  }, [isChatEnabled]);

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

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Live Chat</h3>
        <span className="text-sm opacity-80">Listeners Online: {messages.filter(m => m.role === 'user').length}</span>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
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
          ))
        )}
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

      <ChatUserDetailsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveUserDetails} />
    </div>
  );
};
