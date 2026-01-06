"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Assuming shadcn/ui Avatar is available
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MessageSquare, Send, X } from 'lucide-react';
import Image from 'next/image'; // Import Image component
import React, { useEffect, useRef, useState } from 'react';
import { ChatUserDetailsForm } from './ChatUserDetailsForm';

interface UserDetails {
  fullName: string;
  altar: string;
  region: string;
  bishop?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  altar: string;
  region: string;
}

const LOCAL_STORAGE_KEY = 'chatUserDetails';

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    } else {
      setIsFormOpen(true); // Open form if no details found
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSaveUserDetails = (data: UserDetails) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    setUserDetails(data);
    setIsFormOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || !userDetails) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: userDetails.fullName,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString(),
      altar: userDetails.altar,
      region: userDetails.region,
    };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !userDetails) {
      setIsFormOpen(true); // Open form if opening chat and no details
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-40 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "rotate-90 bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        )}
        onClick={toggleChat}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Floating Chat Window */}
      <div
        className={cn(
          "fixed bottom-36 right-4 z-50 w-80 h-[400px] bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="rounded-full" />
            <h3 className="font-semibold">Live Chat</h3>
          </div>
          <span className="text-sm opacity-80">123 Listeners</span> {/* Placeholder for listeners */}
        </div>

        {/* Messages Display */}
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          {chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Start the conversation!
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div key={msg.id} className="mb-3 flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-200 text-blue-800 text-sm font-bold">
                    {msg.sender.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline justify-between text-xs text-gray-600">
                    <span className="font-semibold">{msg.sender}</span>
                    <span className="ml-2">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{msg.altar}, {msg.region}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {userDetails ? (
          <div className="p-3 border-t flex items-center">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 resize-none h-10 pr-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" className="ml-2 h-10 w-10" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="p-3 border-t text-center text-sm text-gray-500">
            Please provide your details to chat.
            <Button variant="link" onClick={() => setIsFormOpen(true)}>
              Provide Details
            </Button>
          </div>
        )}
      </div>

      {/* User Details Form Dialog */}
      <ChatUserDetailsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveUserDetails} />
    </>
  );
};
