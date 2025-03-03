
import { useState } from 'react';
import { 
  Bell, 
  Lock, 
  Settings, 
  Heart, 
  LogOut, 
  Moon, 
  Sun,
  BookHeart,
  Droplets,
  ChevronRight
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import PrivacySwitch from '@/components/PrivacySwitch';
import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import WebApp from '@twa-dev/sdk';

const ProfileSection = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  onClick
}: { 
  icon: any; 
  title: string; 
  description: string; 
  action: React.ReactNode;
  onClick?: () => void;
}) => (
  <div className={cn("flex items-center py-3", onClick && "cursor-pointer")} onClick={onClick}>
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border">
      <Icon className="h-5 w-5 text-foreground" />
    </div>
    
    <div className="ml-4 flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    
    {action}
  </div>
);

const SettingsButton = () => (
  <Button variant="ghost" size="icon" className="rounded-full">
    <ChevronRight size={18} />
  </Button>
);

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  const handleEducationContent = () => {
    navigate('/education');
  };
  
  const handlePeriodProducts = () => {
    toast({
      title: "Period Products",
      description: "Exploring eco-friendly period products.",
    });
  };
  
  const handleDonation = () => {
    try {
      // Check if WebApp.openLink exists before calling it
      const isWebAppAvailable = typeof WebApp !== 'undefined' && 
                                WebApp !== null && 
                                typeof WebApp.openLink === 'function';
      
      if (isWebAppAvailable) {
        WebApp.openLink('https://www.period.org/donate');
      } else {
        window.open('https://www.period.org/donate', '_blank');
      }
      
      toast({
        title: "Thank You!",
        description: "Thank you for supporting period poverty initiatives.",
      });
    } catch (e) {
      console.error("Failed to open link", e);
      window.open('https://www.period.org/donate', '_blank');
    }
  };
  
  const handlePrivacySecurity = () => {
    toast({
      title: "Privacy & Security",
      description: "Privacy settings will be available soon.",
    });
  };
  
  const handleAppSettings = () => {
    toast({
      title: "App Settings",
      description: "Additional app settings will be available in future updates.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of your account.",
    });
    
    try {
      // Check if WebApp.close exists before calling it
      const isWebAppAvailable = typeof WebApp !== 'undefined' && 
                                WebApp !== null && 
                                typeof WebApp.close === 'function';
      
      if (isWebAppAvailable) {
        WebApp.close();
      } else {
        navigate('/');
      }
    } catch (e) {
      console.error("Failed to close WebApp", e);
      navigate('/');
    }
  };
  
  return (
    <div className="pt-4 pb-20 px-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      <div className="glass-card rounded-3xl p-5 mb-6 animate-scale-in">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-primary text-xl font-semibold">JD</span>
          </div>
          
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Jane Doe</h2>
            <p className="text-muted-foreground">jane.doe@example.com</p>
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          Edit Profile
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="neo-card rounded-2xl p-5 animate-scale-in delay-100">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          
          <div className="space-y-1">
            <ProfileSection 
              icon={Bell}
              title="Notifications"
              description={notifications ? "Enabled" : "Disabled"}
              action={<Switch checked={notifications} onCheckedChange={setNotifications} />}
            />
            
            <Separator />
            
            <ProfileSection 
              icon={isDarkMode ? Moon : Sun}
              title="Dark Mode"
              description={isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
              action={<Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />}
            />
            
            <Separator />
            
            <PrivacySwitch />
          </div>
        </div>
        
        <div className="neo-card rounded-2xl p-5 animate-scale-in delay-200">
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          
          <div className="space-y-1">
            <ProfileSection 
              icon={BookHeart}
              title="Educational Content"
              description="Learn about menstrual health"
              action={<SettingsButton />}
              onClick={handleEducationContent}
            />
            
            <Separator />
            
            <ProfileSection 
              icon={Droplets}
              title="Period Products"
              description="Find eco-friendly products"
              action={<SettingsButton />}
              onClick={handlePeriodProducts}
            />
            
            <Separator />
            
            <ProfileSection 
              icon={Heart}
              title="Donation"
              description="Support period poverty initiatives"
              action={<SettingsButton />}
              onClick={handleDonation}
            />
          </div>
        </div>
        
        <div className="neo-card rounded-2xl p-5 animate-scale-in delay-300">
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          
          <div className="space-y-1">
            <ProfileSection 
              icon={Lock}
              title="Privacy & Security"
              description="Manage your data and privacy"
              action={<SettingsButton />}
              onClick={handlePrivacySecurity}
            />
            
            <Separator />
            
            <ProfileSection 
              icon={Settings}
              title="App Settings"
              description="Customize your experience"
              action={<SettingsButton />}
              onClick={handleAppSettings}
            />
            
            <Separator />
            
            <ProfileSection 
              icon={LogOut}
              title="Log Out"
              description="Sign out of your account"
              action={<SettingsButton />}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
