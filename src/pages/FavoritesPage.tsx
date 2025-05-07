
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import MenuCard from "@/components/MenuCard";
import { getFavorites } from "@/data/mockData";
import { menuItems } from "@/data/mockData";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const favoriteIds = getFavorites();
    const favoriteItems = menuItems.filter(item => favoriteIds.includes(item.id));
    setFavorites(favoriteItems);
  }, [user, navigate]);

  useEffect(() => {
    // Listen for changes to localStorage
    const handleStorageChange = () => {
      const favoriteIds = getFavorites();
      const favoriteItems = menuItems.filter(item => favoriteIds.includes(item.id));
      setFavorites(favoriteItems);
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Favorites</h1>
          <p className="text-gray-600 mt-1">Items you've marked as favorites</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No favorites yet</h3>
            <p className="mt-1 text-gray-500">
              You haven't added any items to your favorites yet
            </p>
            <Button 
              className="mt-4 bg-canteen-primary hover:bg-green-600" 
              onClick={() => navigate("/menu")}
            >
              Explore Menu
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
