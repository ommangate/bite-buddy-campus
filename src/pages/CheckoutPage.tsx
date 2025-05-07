
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { paymentMethods } from "@/data/mockData";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { toast } from "@/components/ui/sonner";

const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!address) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsProcessing(true);

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a unique order ID
    const orderId = `order-${Date.now().toString(36)}`;
    
    // In a real app, you would send order data to the backend here
    
    clearCart();
    setIsProcessing(false);
    toast.success("Order placed successfully!");
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
                <form>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={user.name}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        value={user.email}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Your Full Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      paymentMethod={method}
                      selected={selectedPaymentMethod === method.id}
                      onSelect={() => setSelectedPaymentMethod(method.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Order Review</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">×{item.quantity}</span>
                      </div>
                      <div>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Items ({totalItems})</span>
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
              </div>
              
              <Button
                className="w-full mt-6 bg-canteen-primary hover:bg-green-600"
                disabled={isProcessing || !selectedPaymentMethod || !address || !phone}
                onClick={handleSubmitOrder}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
              
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => navigate("/cart")}
                disabled={isProcessing}
              >
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
