let ws: WebSocket;

export function initializeWebSocket() {
  try {
    ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/socket`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'message':
            // Emit event for new message
            window.dispatchEvent(new CustomEvent('newMessage', { detail: message }));
            break;
          case 'welcome':
            console.log('Received welcome message:', message.text);
            break;
          case 'typing':
            // Handle typing indicator
            window.dispatchEvent(new CustomEvent('userTyping', { detail: message }));
            break;
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after a delay
      setTimeout(initializeWebSocket, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  } catch (error) {
    console.error('Error initializing WebSocket:', error);
  }
}

// Function to send messages
export function sendMessage(message: {
  type: 'message' | 'typing';
  text?: string;
  userId: string;
  userName: string;
  roomId: string;
}) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected');
  }
}


export function disconnectWebSocket() {
  if (ws) {
    ws.close();
  }
}


export function getWebSocket() {
  return ws;
}


