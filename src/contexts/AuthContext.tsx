
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin login check
      if (email === "admin@canteen.com" && password === "admin123") {
        setUser({
          id: "admin-1",
          name: "Admin User",
          email: "admin@canteen.com",
          role: "admin"
        });
        toast.success("Admin login successful!");
      } 
      // Regular user login check
      else if (email === "user@example.com" && password === "password") {
        setUser({
          id: "user-1",
          name: "John Doe",
          email: "user@example.com",
          role: "user"
        });
        toast.success("Login successful!");
      }
      else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: Invalid email or password");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Google login function
  const googleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: "google-user-1",
        name: "Google User",
        email: "google.user@gmail.com",
        role: "user"
      });
      
      toast.success("Google login successful!");
    } catch (error) {
      toast.error("Google login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user"
      });
      
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, googleLogin, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
