
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';



// Polyfill for WebApp in development mode
if (process.env.NODE_ENV === 'development') {
  try {
    // This is just to prevent errors during development when WebApp is not available
    if (!window.Telegram && !window.Telegram?.WebApp) {
      window.Telegram = {
        WebApp: {
          ready: () => console.log('WebApp ready called'),
          expand: () => console.log('WebApp expand called'),
          close: () => console.log('WebApp close called'),
          openLink: (url: string) => window.open(url, '_blank'),
          colorScheme: 'light',
          onEvent: () => {},
          offEvent: () => {},
        }
      };
    }
  } catch (e) {
    console.warn('Failed to set up Telegram WebApp polyfill', e);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
