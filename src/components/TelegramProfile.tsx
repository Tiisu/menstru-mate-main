
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export default function TelegramProfile() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      // Check if WebApp is initialized by checking if initDataUnsafe exists
      if (WebApp && WebApp.initDataUnsafe) {
        setIsInitialized(true);
        if (WebApp.initDataUnsafe?.user) {
          setUser(WebApp.initDataUnsafe.user);
        }
      }
    } catch (e) {
      console.log("Telegram WebApp not initialized or no user data");
    }
  }, []);

  if (!isInitialized) {
    return null;
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Telegram User</CardTitle>
          <CardDescription>
            Connect your Telegram account to enhance your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No Telegram user data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram Profile</CardTitle>
        <CardDescription>Connected via Telegram Mini App</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {user.photo_url && <AvatarImage src={user.photo_url} alt={user.first_name} />}
          <AvatarFallback>
            {user.first_name.charAt(0)}
            {user.last_name ? user.last_name.charAt(0) : ''}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">
            {user.first_name} {user.last_name || ''}
          </h3>
          {user.username && <p className="text-muted-foreground">@{user.username}</p>}
          <p className="text-xs text-muted-foreground mt-1">ID: {user.id}</p>
        </div>
      </CardContent>
    </Card>
  );
}
