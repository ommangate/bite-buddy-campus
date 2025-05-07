
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X, LogOut, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { title: "Menu", path: "/menu" },
    { title: "Favorites", path: "/favorites" },
    { title: "Orders", path: "/orders" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-canteen-primary flex items-center justify-center">
                <span className="text-white font-bold">BB</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">BitesBuddy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(link.path)
                        ? "bg-canteen-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/favorites" className="hidden md:flex text-gray-700 hover:text-canteen-primary">
                  <Heart size={20} />
                </Link>

                <Link to="/cart" className="relative text-gray-700 hover:text-canteen-primary">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-canteen-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="outline" className="flex items-center">
                  <User size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full py-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-canteen-primary flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BB</span>
                      </div>
                      <span className="text-lg font-semibold">BitesBuddy</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-3 mt-6">
                    {user && (
                      <>
                        {navLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                              isActive(link.path)
                                ? "bg-canteen-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="mt-auto">
                    {user ? (
                      <div className="flex flex-col space-y-3">
                        <div className="px-3 py-2 text-sm text-gray-700">
                          Signed in as <strong>{user.name}</strong>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full">
                          <User size={16} className="mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
