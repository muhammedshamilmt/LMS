'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type NavigationStyle = 'topbar' | 'dock';

interface NavigationContextType {
  navStyle: NavigationStyle;
  setNavStyle: (style: NavigationStyle) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [navStyle, setNavStyle] = useState<NavigationStyle>('topbar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedStyle = localStorage.getItem('lms-nav-style') as NavigationStyle;
    if (savedStyle === 'topbar' || savedStyle === 'dock') {
      setNavStyle(savedStyle);
    }
  }, []);

  const handleSetNavStyle = (style: NavigationStyle) => {
    setNavStyle(style);
    localStorage.setItem('lms-nav-style', style);
  };

  // Only render children after mount to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NavigationContext.Provider value={{ navStyle, setNavStyle: handleSetNavStyle }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationStyle() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    return { navStyle: 'topbar' as NavigationStyle, setNavStyle: () => {} }; // Fallback
  }
  return context;
}
