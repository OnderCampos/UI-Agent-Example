"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/support";

interface ChatWidgetProps {
  className?: string;
}

/**
 * Chat Widget Component
 * 
 * This is a placeholder/mock implementation.
 * In production, integrate with your chat service (Intercom, Zendesk, etc.)
 */
export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hi there! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
      isRead: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message! A customer service representative will be with you shortly. In the meantime, you can check our FAQ or Help Center for quick answers.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50",
          className
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 transition-all",
        isMinimized ? "h-14" : "h-[500px]",
        className
      )}
    >
      {/* Header */}
      <div className="bg-[#0052a1] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Chat Support</h3>
            <p className="text-xs text-white/70">We typically reply within minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMinimized ? "Expand" : "Minimize"}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[360px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    message.sender === "user"
                      ? "bg-[#0052a1] text-white rounded-br-sm"
                      : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      message.sender === "user" ? "text-white/60" : "text-gray-400"
                    )}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0052a1] text-sm"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-[#0052a1] hover:bg-[#003d7a]"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Chat launcher button (for pages that want just the launcher)
 */
export function ChatLauncher({ className }: { className?: string }) {
  const [showWidget, setShowWidget] = useState(false);

  if (showWidget) {
    return <ChatWidget className={className} />;
  }

  return (
    <button
      onClick={() => setShowWidget(true)}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-[#0052a1] hover:bg-[#003d7a] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50",
        className
      )}
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
