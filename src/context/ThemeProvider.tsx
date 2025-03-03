
import React, { createContext, useContext, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "menstrumate-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // First try to get theme from Telegram if available
    try {
      // Check if WebApp is initialized by checking a known property
      if (typeof WebApp !== 'undefined' && WebApp !== null && WebApp.colorScheme) {
        return WebApp.colorScheme as Theme;
      }
    } catch (e) {
      console.log("Telegram WebApp not initialized");
    }
    
    // Fall back to localStorage or default
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // In Telegram, try to get system theme from WebApp
      try {
        if (typeof WebApp !== 'undefined' && WebApp !== null && WebApp.colorScheme) {
          const telegramTheme = WebApp.colorScheme;
          root.classList.add(telegramTheme);
          return;
        }
      } catch (e) {
        console.log("Telegram WebApp not initialized");
      }
      
      // Fall back to browser preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Listen for Telegram theme changes
  useEffect(() => {
    try {
      if (typeof WebApp !== 'undefined' && WebApp !== null && typeof WebApp.onEvent === 'function') {
        const handleThemeChange = () => {
          if (WebApp.colorScheme) {
            const telegramTheme = WebApp.colorScheme as Theme;
            setTheme(telegramTheme);
          }
        };
        
        WebApp.onEvent("themeChanged", handleThemeChange);
        
        return () => {
          if (typeof WebApp.offEvent === 'function') {
            WebApp.offEvent("themeChanged", handleThemeChange);
          }
        };
      }
    } catch (e) {
      console.log("Telegram WebApp not initialized");
    }
  }, []);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
