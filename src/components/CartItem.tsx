
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem = ({ id, name, price, quantity, image }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">{name}</h3>
        <p className="text-canteen-secondary font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleDecrement}
        >
          <Minus size={14} />
        </Button>
        
        <span className="w-6 text-center font-medium">{quantity}</span>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleIncrement}
        >
          <Plus size={14} />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-red-500"
        onClick={() => removeFromCart(id)}
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
