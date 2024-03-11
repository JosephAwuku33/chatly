"use client";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "firebase/auth";
import { useAuthentication } from "@/app/hooks/useAuthentication";

// Define the shape of your authentication context
interface AuthContextType {
  user: User | null | undefined;
  //loading: boolean;
  isAuthenticated: boolean;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
});

// Create a custom hook to consume the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthentication();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    let storedIsAuth;
    if (typeof window !== "undefined") {
      storedIsAuth = localStorage.getItem("isAuthenticated");
    }
    return !!storedIsAuth && JSON.parse(storedIsAuth);
  });

 

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};



