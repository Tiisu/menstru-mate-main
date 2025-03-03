
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const { toast } = useToast();

  // Update active tab when location changes
  useEffect(() => {
    if (location.pathname) {
      setActiveTab(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tracker', icon: Calendar, label: 'Tracker' },
    { path: '/education', icon: BookOpen, label: 'Learn' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleNavigation = (path: string) => {
    setActiveTab(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-2 py-1 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground",
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <div className={cn(
                "relative flex items-center justify-center h-10 w-10 rounded-full",
                isActive && "after:absolute after:bottom-0 after:h-1 after:w-8 after:rounded-t-full after:bg-primary after:content-['']"
              )}>
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-xs mt-0.5 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
