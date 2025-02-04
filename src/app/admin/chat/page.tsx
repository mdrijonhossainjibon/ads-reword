'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FiMessageCircle, FiUser, FiClock, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { initializeWebSocket, getWebSocket } from '@/lib/websocket';

interface ChatRoom {
  roomId: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface Message {
  type: 'message' | 'typing' | 'welcome';
  text: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export default function AdminChatPage() {
  const [activeChats, setActiveChats] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchActiveChats = async () => {
      try {
        const response = await fetch('/api/admin/chats');
        const data = await response.json();
        setActiveChats(Array.isArray(data) ? data : []); // Ensure we always set an array
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch active chats:', error);
        setActiveChats([]); // Set empty array on error
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchActiveChats();
      setupWebSocket();
    }
  }, [session]);

  const setupWebSocket = async () => {
    const ws = await initializeWebSocket();
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          // Update messages if it's for the selected room
          if (data.roomId === selectedRoom) {
            setMessages(prev => [...prev, data]);
          }
          // Update active chats list
          updateActiveChatsList(data);
        }
      };
    }
  };

  const updateActiveChatsList = (message: Message) => {
    setActiveChats(prev => prev.map(chat => 
      chat.roomId === message.userId ? {
        ...chat,
        lastMessage: message.text,
        timestamp: message.timestamp,
        unreadCount: selectedRoom === chat.roomId ? 0 : chat.unreadCount + 1
      } : chat
    ));
  };

  const handleRoomSelect = async (roomId: string) => {
    setSelectedRoom(roomId);
    try {
      const response = await fetch(`/api/admin/chats/${roomId}`);
      const data = await response.json();
      setMessages(data.messages);
      // Reset unread count for selected room
      setActiveChats(prev => prev.map(chat => 
        chat.roomId === roomId ? { ...chat, unreadCount: 0 } : chat
      ));
    } catch (error) {
      console.error('Failed to fetch room messages:', error);
    }
  };

 // Update the filtering logic
const filteredChats = activeChats?.length ? activeChats.filter(chat => 
  chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Chat List */}
      <div className="w-1/3 border-r dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Live Chats</h1>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              filteredChats.map((chat) => (
                <motion.div
                  key={chat.roomId}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleRoomSelect(chat.roomId)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedRoom === chat.roomId
                      ? 'bg-blue-50 dark:bg-blue-900'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                        <FiUser className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {chat.userName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <FiMessageCircle className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Chat with {activeChats.find(c => c.roomId === selectedRoom)?.userName}
                </h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.userId === session?.user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[70%]">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {msg.userName}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.userId === session?.user?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FiMessageCircle className="w-12 h-12 mx-auto mb-4" />
              <p>Select a chat to view the conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
