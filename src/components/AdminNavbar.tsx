
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ClipboardList, Settings } from "lucide-react";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const adminNavLinks = [
    { title: "Dashboard", path: "/admin", icon: <ClipboardList size={16} /> },
    { title: "Settings", path: "/admin/settings", icon: <Settings size={16} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-canteen-secondary flex items-center justify-center">
                <span className="text-white font-bold">BB</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">BitesBuddy Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {adminNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  isActive(link.path)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                <span className="hidden md:inline">{link.title}</span>
              </Link>
            ))}

            {user && (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm font-medium text-gray-300">{user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
