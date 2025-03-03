
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm MenstruMate's AI assistant. Ask me anything about menstrual health, and I'll do my best to help!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample responses for the demo
  const sampleResponses = [
    "It's completely normal for periods to be irregular, especially when you're young or approaching menopause. Stress, diet, exercise, and weight changes can all affect your cycle.",
    "PMS symptoms typically appear 1-2 weeks before your period starts. Common symptoms include bloating, fatigue, mood changes, and breast tenderness.",
    "Using a menstrual cup can be a great eco-friendly alternative to pads and tampons. It might take a few tries to get used to inserting it properly, but many find it comfortable and convenient once they do.",
    "Ovulation typically occurs about 14 days before your next period starts. During this time, you might notice changes in your vaginal discharge or a slight increase in body temperature.",
    "Period pain (dysmenorrhea) is caused by contractions in your uterus. Over-the-counter pain relievers, heat therapy, and gentle exercise can often help manage the discomfort."
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      
      // Simulate bot response after a delay
      setTimeout(() => {
        try {
          const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          console.error("Error generating bot response:", error);
          toast({
            title: "Error",
            description: "Failed to generate response. Please try again.",
          });
        } finally {
          setIsTyping(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="glass-card rounded-3xl p-4 w-full max-w-md mx-auto h-[70vh] flex flex-col animate-scale-in">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
        <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
          Private & Anonymous
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none pr-2">
        <div className="space-y-4 pb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%]",
                message.sender === 'user' ? "ml-auto" : ""
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-3",
                  message.sender === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'user' ? (
                    <User size={14} className="text-primary-foreground" />
                  ) : (
                    <Bot size={14} className="text-secondary-foreground" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'You' : 'MenstruMate'}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex w-max max-w-[80%]">
              <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={14} className="text-secondary-foreground" />
                  <span className="text-xs font-medium">MenstruMate</span>
                </div>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-2 border-t border-border mt-3">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything about your body..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-full px-4"
          />
          <Button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isTyping}
            size="icon"
            className="rounded-full"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
