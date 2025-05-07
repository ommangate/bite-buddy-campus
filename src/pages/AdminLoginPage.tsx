
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (email === "admin@canteen.com" && password === "admin123") {
        await login(email, password);
        navigate("/admin");
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Admin login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-canteen-secondary flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">BB</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-400">
            Canteen Management System
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-email" className="text-white">Email</Label>
              <div className="relative mt-1">
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="text-xs text-gray-400 mt-1">For demo: admin@canteen.com</div>
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-white">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <div className="text-xs text-gray-400 mt-1">For demo: admin123</div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-canteen-secondary hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login to Admin Panel"}
            </Button>
          </div>
          
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-white">
              Return to Customer Portal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
