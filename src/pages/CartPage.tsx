
import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, ShoppingBag } from "lucide-react";
import { menuItems } from "@/data/mockData";

const CartPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getItemImage = (itemId: string) => {
    const item = menuItems.find(item => item.id === itemId);
    return item?.image || "";
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-1">Review your items before checkout</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Cart Items ({totalItems})</h2>
                  <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-700">
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={getItemImage(item.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  {totalPrice >= 20 ? (
                    <div className="flex justify-between text-canteen-primary">
                      <span>Delivery Fee</span>
                      <span>FREE</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>$2.00</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        ${(
                          totalPrice + 
                          totalPrice * 0.1 + 
                          (totalPrice >= 20 ? 0 : 2)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {totalPrice < 10 && (
                    <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800 mt-3">
                      Add ${(10 - totalPrice).toFixed(2)} more to reach minimum order amount of $10.
                    </div>
                  )}
                </div>
                
                <Button
                  className="w-full mt-6 bg-canteen-primary hover:bg-green-600"
                  disabled={totalPrice < 10}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => navigate("/menu")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">
              Looks like you haven't added any items to your cart yet
            </p>
            <Button 
              className="mt-4 bg-canteen-primary hover:bg-green-600" 
              onClick={() => navigate("/menu")}
            >
              <ShoppingBag size={16} className="mr-2" />
              Browse Menu
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
