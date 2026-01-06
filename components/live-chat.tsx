"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
}

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Brother John",
      text: "Amen! What a powerful message this morning.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      user: "Sister Mary",
      text: "The prayer session is truly uplifting. Praise God!",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      user: "Listener",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[400px] w-full rounded-3xl bg-background/50 border border-primary/10 shadow-sm overflow-hidden mt-8">
      <div className="p-4 border-b border-primary/5 bg-primary/5">
        <h3 className="font-serif font-bold text-primary flex items-center gap-2">Live Fellowship & Feedback</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 items-start">
              <Avatar className="h-8 w-8 border border-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {msg.user.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{msg.user}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground bg-secondary/30 p-2 rounded-lg rounded-tl-none">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-primary/5 bg-background/80 backdrop-blur-sm flex gap-2"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share your testimony or feedback..."
          className="flex-1 bg-secondary/50 border-primary/10 focus-visible:ring-primary"
        />
        <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
