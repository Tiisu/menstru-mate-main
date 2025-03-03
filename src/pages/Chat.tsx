
import ChatBot from '@/components/ChatBot';

const Chat = () => {
  return (
    <div className="pt-4 pb-20 px-4 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ask MenstruMate</h1>
        <p className="text-muted-foreground">Get answers to your questions privately</p>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Chat;
