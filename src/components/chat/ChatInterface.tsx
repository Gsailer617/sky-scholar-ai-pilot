
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: Array<{
    title: string;
    reference: string;
  }>;
  feedbackGiven?: 'positive' | 'negative' | null;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Hello! Welcome to Sky Scholar. How can I help with your aviation studies today?',
      sender: 'ai',
      timestamp: new Date(),
      sources: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const responseId = (Date.now() + 1).toString();
      
      // Generate a response based on the user's message
      let responseContent = '';
      let responseSources = [];
      
      if (inputValue.toLowerCase().includes('vfr')) {
        responseContent = "VFR (Visual Flight Rules) weather minimums vary by airspace. In Class G airspace below 1,200 feet AGL, you need 1 mile visibility and clear of clouds during the day. In Class E airspace below 10,000 feet MSL, you need 3 miles visibility, 1,000 feet above, 500 feet below, and 2,000 feet horizontal from clouds.";
        responseSources = [
          { 
            title: "FAR 91.155", 
            reference: "Basic VFR Weather Minimums" 
          }
        ];
      } else if (inputValue.toLowerCase().includes('engine') || inputValue.toLowerCase().includes('magneto')) {
        responseContent = "Aircraft magnetos are self-contained generators that provide electricity to spark plugs. They're critical because they operate independently of the aircraft's main electrical system, providing ignition even if the entire electrical system fails. During your engine runup, you check each magneto individually by switching from BOTH to LEFT and RIGHT to ensure each is working properly.";
        responseSources = [
          { 
            title: "Aircraft Systems for Pilots", 
            reference: "Chapter 6: Ignition Systems" 
          }
        ];
      } else {
        responseContent = "I'd be happy to help with that aviation topic. Could you provide more specific details about what you'd like to learn? I can explain concepts related to flight operations, regulations, aerodynamics, aircraft systems, or help you prepare for FAA knowledge tests.";
      }

      const aiResponse: MessageType = {
        id: responseId,
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
        sources: responseSources
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { 
              ...message, 
              feedbackGiven: isPositive ? 'positive' : 'negative' 
            }
          : message
      )
    );
    
    toast({
      title: "Feedback received",
      description: `Thank you for your feedback!`,
    });
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/20 text-sm">
                    <p className="font-semibold">Sources:</p>
                    <ul className="list-disc pl-5">
                      {message.sources.map((source, index) => (
                        <li key={index}>
                          <span className="font-medium">{source.title}</span>
                          {source.reference && ` - ${source.reference}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {message.sender === 'ai' && (
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-8 w-8 p-0 rounded-full ${message.feedbackGiven === 'positive' ? 'bg-green-100' : ''}`}
                      onClick={() => handleFeedback(message.id, true)}
                      disabled={message.feedbackGiven !== undefined}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-8 w-8 p-0 rounded-full ${message.feedbackGiven === 'negative' ? 'bg-red-100' : ''}`}
                      onClick={() => handleFeedback(message.id, false)}
                      disabled={message.feedbackGiven !== undefined}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="chat-bubble-ai">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle" />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about aviation topics..."
            disabled={isTyping}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-3"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
