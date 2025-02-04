'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { initializeWebSocket, getWebSocket, disconnectWebSocket } from '@/lib/websocket';

interface Message {
  type: 'message' | 'typing' | 'welcome';
  text: string;
  isUser: boolean;
  userName?: string;
  timestamp: string;
}

export default function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { data: session } : any = useSession();

  useEffect(() => {
    if (isOpen && session?.user) {
      const setupWebSocket = async () => {
       /*  const ws = initializeWebSocket();
        if (ws) {
          setIsConnected(true);
          setConnectionError(null);

          ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'typing') {
              setIsTyping(true);
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
            } else {
              setChatMessages(prev => [...prev, {
                ...data,
                isUser: data.userId === session.user.id
              }]);
              scrollToBottom();
            }
          };

          ws.onclose = () => {
            setIsConnected(false);
            setConnectionError('Disconnected from chat server');
          };

          ws.onerror = () => {
            setConnectionError('Failed to connect to chat server');
            setIsConnected(false);
          };
        } else {
          setConnectionError('Failed to initialize chat');
          setIsConnected(false);
        } */
      };

      setupWebSocket();

      return () => {
        disconnectWebSocket();
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }
  }, [isOpen, session]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !session?.user) return;

    const ws = getWebSocket();
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageData = {
        type: 'message',
        text: message.trim(),
        userId: session.user.id,
        userName: session.user.name,
        timestamp: new Date().toISOString()
      };

      ws.send(JSON.stringify(messageData));
      
      // Add message to local chat immediately
      setChatMessages((prev: any[]) => [...prev, {
        ...messageData,
        isUser: true
      }]);

      setMessage('');
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    const ws = getWebSocket();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'typing',
        userId: session?.user?.id,
        userName: session?.user?.name
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload (implement your file upload logic here)
      console.log('File selected:', file);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-600 transition-colors duration-200"
      >
        <FiMessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FiMessageCircle className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-medium">Live Chat Support</h3>
                  {connectionError ? (
                    <p className="text-xs text-red-200">{connectionError}</p>
                  ) : (
                    <p className="text-xs text-white opacity-75">
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  disconnectWebSocket();
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col">
                    {!msg.isUser && msg.userName && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-1">
                        {msg.userName}
                      </span>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Someone is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 pr-24 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <FiPaperclip className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || !isConnected}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
