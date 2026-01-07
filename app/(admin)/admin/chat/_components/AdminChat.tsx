"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/lib/context/ChatContext';
import { cn } from '@/lib/utils';
import { Send, Power } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AdminChat() {
  const { messages, addMessage, isChatEnabled, toggleChatStatus } = useChat();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleAdminSendMessage = () => {
    if (message.trim() === '') return;

    addMessage({
      sender: 'Admin',
      message: message.trim(),
      role: 'admin',
    });

    setMessage('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Listener Live Chat</h1>
          <p className="text-muted-foreground">View and respond to messages from listeners in real-time.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="chat-status"
            checked={isChatEnabled}
            onCheckedChange={toggleChatStatus}
          />
          <Label htmlFor="chat-status" className={cn(isChatEnabled ? "text-green-600" : "text-red-600")}>
            {isChatEnabled ? 'Chat Enabled' : 'Chat Disabled'}
          </Label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Chat Feed</CardTitle>
          <CardDescription>
            {messages.length} messages in the conversation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[60vh] bg-muted/50 rounded-md flex flex-col">
            {/* Messages Display */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No messages yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={cn("mb-4 flex items-start gap-3", msg.role === 'admin' && 'flex-row-reverse')}>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={cn(
                        "text-sm font-bold",
                        msg.role === 'admin' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                      )}>
                        {msg.sender.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("flex-1 p-3 rounded-lg max-w-md", msg.role === 'admin' ? 'bg-green-100 dark:bg-green-900/60' : 'bg-background')}>
                      <div className="flex items-baseline justify-between text-xs text-muted-foreground">
                        <span className="font-semibold">{msg.sender}</span>
                        <span className="ml-2">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{msg.message}</p>
                      {msg.role === 'user' && <p className="text-xs text-muted-foreground mt-1">{msg.altar}, {msg.region}</p>}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Admin Message Input */}
            <div className="p-4 border-t flex items-center">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your reply as Admin..."
                className="flex-1 resize-none pr-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAdminSendMessage();
                  }
                }}
              />
              <Button size="icon" className="ml-2" onClick={handleAdminSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
