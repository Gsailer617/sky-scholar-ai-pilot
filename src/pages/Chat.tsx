
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <div className="container max-w-5xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">AI Aviation Assistant</h1>
      <div className="glass-card rounded-lg shadow-card overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
