
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, MessageCircle, Bell } from 'lucide-react';
import CycleTracker from '@/components/CycleTracker';
import PrivacySwitch from '@/components/PrivacySwitch';
import { cn } from '@/lib/utils';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const quickActions = [
    { 
      icon: Calendar, 
      title: 'Track Cycle', 
      description: 'Record symptoms and flow',
      path: '/tracker',
      color: 'bg-mate-50 text-mate-500 border-mate-200' 
    },
    { 
      icon: BookOpen, 
      title: 'Learn', 
      description: 'Explore educational content',
      path: '/education',
      color: 'bg-blue-50 text-blue-500 border-blue-200' 
    },
    { 
      icon: MessageCircle, 
      title: 'Ask AI', 
      description: 'Get answers privately',
      path: '/chat',
      color: 'bg-violet-50 text-violet-500 border-violet-200' 
    },
    { 
      icon: Bell, 
      title: 'Reminders', 
      description: 'Set up notifications',
      path: '/profile',
      color: 'bg-amber-50 text-amber-500 border-amber-200' 
    },
  ];

  return (
    <div className="pt-4 pb-20 px-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            MenstruMate
          </h1>
          <p className="text-muted-foreground animate-fade-in delay-100">
            Your cycle companion
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-scale-in">
          <span className="text-primary text-lg font-semibold">JD</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <CycleTracker />
        
        <div className="glass-card rounded-3xl p-5 animate-scale-in delay-100">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link 
                key={action.title}
                to={action.path}
                className="block"
              >
                <div className={cn(
                  "rounded-2xl p-4 border transition-transform duration-300 hover:scale-[1.02]",
                  action.color
                )}>
                  <action.icon size={22} className="mb-2" />
                  <h3 className="font-medium text-foreground">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="glass-card rounded-3xl p-5 animate-scale-in delay-200">
          <h2 className="text-lg font-semibold mb-4">Privacy</h2>
          <PrivacySwitch />
        </div>
      </div>
    </div>
  );
};

export default Index;
