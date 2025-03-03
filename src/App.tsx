
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Education from "./pages/Education";
import Tracker from "./pages/Tracker";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Telegram WebApp
  useEffect(() => {
    try {
      // Check if WebApp is available and has the necessary methods
      if (typeof WebApp !== 'undefined' && WebApp !== null) {
        // Let Telegram know the WebApp is ready
        if (typeof WebApp.ready === 'function') {
          WebApp.ready();
        }
        
        // Set the theme based on Telegram's color scheme if available
        if (WebApp.colorScheme) {
          document.documentElement.classList.toggle("dark", WebApp.colorScheme === "dark");
        }
        
        // Expand the WebApp to fullscreen in Telegram if method exists
        if (typeof WebApp.expand === 'function') {
          WebApp.expand();
        }
      }
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/education" element={<Education />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navbar />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
