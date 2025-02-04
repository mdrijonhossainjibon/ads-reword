import { createServer, Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextResponse } from 'next/server';
import {   WebSocketServer } from 'ws';
import { connectToDatabase } from '@/lib/mongoose';
import { Message } from '@/models/Message';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface ChatMessage {
  type: 'message' | 'typing' | 'welcome';
  text?: string;
  userId?: string;
  userName?: string;
  timestamp: string;
}

interface StoredMessage {
  success: boolean;
  message?: any;
  error?: string;
}

declare global {
  var wss: WebSocketServer | undefined;
}
 
 
async function storeMessage(
  roomId: string, 
  userId: string, 
  message: string
): Promise<StoredMessage> {
  // Input validation
  if (!roomId?.trim() || !userId?.trim() || !message?.trim()) {
    console.error('Invalid message data:', { roomId, userId, message });
    return {
      success: false,
      error: 'All fields (roomId, userId, message) are required'
    };
  }

  try {
    await connectToDatabase();
    
    const storedMessage = await Message.create({
      roomId: roomId.trim(),
      userId: userId.trim(),
      message: message.trim(),
      timestamp: new Date()
    });

    console.log('Message stored successfully:', {
      id: storedMessage._id,
      roomId,
      userId,
      timestamp: storedMessage.timestamp
    });

    return {
      success: true,
      message: storedMessage
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error storing message:', {
      error: errorMessage,
      roomId,
      userId,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

async function getChatHistory(roomId: string, limit: number = 50): Promise<any[]> {
  try {
    await connectToDatabase();
    const messages = await Message.find({ roomId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    
    return messages.map(msg => ({
      type: 'message',
      text: msg.message,
      userId: msg.userId,
      timestamp: msg.timestamp.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

 let wss: WebSocketServer;
 
 export async function GET(req: Request) {
   if (!global.wss) {
     global.wss = new WebSocketServer({ noServer: true });
     
     global.wss.on('connection', async (ws) => {
       // Send welcome message
       const welcomeMessage: ChatMessage = {
         type: 'welcome',
         timestamp: new Date().toISOString(),
         text: 'Welcome to the chat!'
       };
       ws.send(JSON.stringify(welcomeMessage));
 
       // Handle incoming messages
       ws.on('message', async (data: string) => {
         try {
           const parsedData = JSON.parse(data);
           const { type, text, userId, userName, roomId } = parsedData;
 
           if (type === 'message' && text && userId && roomId) {
             // Store message in database
             const stored = await storeMessage(roomId, userId, text);
             
             if (stored.success) {
               const messageToSend: ChatMessage = {
                 type: 'message',
                 text,
                 userId,
                 userName,
                 timestamp: new Date().toISOString()
               };
 
               // Broadcast to all clients
               global.wss?.clients.forEach((client) => {
                 if (client.readyState === WebSocket.OPEN) {
                   client.send(JSON.stringify(messageToSend));
                 }
               });
             }
           }
         } catch (error) {
           console.error('Error processing message:', error);
         }
       });
     });
   }
 
   return new NextResponse('WebSocket server is running', { status: 200 });
 }