
import React from "react";
import { MenuItem } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { isFavorite, toggleFavorite } from "@/data/mockData";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const { addToCart } = useCart();
  const [favorite, setFavorite] = React.useState(() => isFavorite(item.id));

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(item.id);
    setFavorite(!favorite);
    
    if (!favorite) {
      toast.success(`${item.name} added to favorites`);
    } else {
      toast.info(`${item.name} removed from favorites`);
    }
  };

  return (
    <div className="menu-card group">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <Heart 
            size={18} 
            className={`${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </button>
      </div>
      <div className="menu-card-content">
        <div className="flex justify-between items-start">
          <h3 className="menu-card-title">{item.name}</h3>
          <div className="menu-card-price">${item.price.toFixed(2)}</div>
        </div>
        <p className="menu-card-description line-clamp-2">{item.description}</p>
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-canteen-primary hover:bg-green-600 text-white"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
