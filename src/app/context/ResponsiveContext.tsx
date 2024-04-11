// This file helps in checking whether the web app is being displayed on a mobile device or a larger device
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ResponsiveContextType {
  isMobile: boolean;
}

const defaultContext: ResponsiveContextType = {
  isMobile: false,
};

const ResponsiveContext = createContext<ResponsiveContextType>(defaultContext);

interface ResponsiveProviderProps {
  children: ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    let mediaQueryList = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQueryList.matches);

    const updateIsMobile = () => {
      setIsMobile(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", updateIsMobile);

    return () => {
      mediaQueryList.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveContext;
