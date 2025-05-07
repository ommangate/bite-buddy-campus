
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { getOrderById } from "@/data/mockData";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Clock, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchedOrder = getOrderById(orderId);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      } else {
        navigate("/orders");
      }
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavbar />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-16">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Loading order details...</h3>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/orders")} 
            className="flex items-center mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
          </Button>
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-5)}</h1>
              <p className="text-gray-600 mt-1">
                {format(new Date(order.createdAt), "PPP 'at' p")}
              </p>
            </div>
            
            <OrderStatusBadge status={order.status} className="px-4 py-2 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              
              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div key={index} className="py-4 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {order.status === 'ready' && order.qrCode && (
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Pickup Information</h2>
                
                <div className="flex flex-col items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-3 bg-canteen-primary hover:bg-green-600">
                        <QrCode size={16} className="mr-2" />
                        Show QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Pickup QR Code</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center p-4">
                        <img src={order.qrCode} alt="QR Code" className="w-64 h-64" />
                      </div>
                      <p className="text-center text-sm text-gray-500">
                        Show this QR code at the counter to pick up your order
                      </p>
                    </DialogContent>
                  </Dialog>
                  
                  <p className="text-gray-600 text-sm text-center">
                    Your order is ready for pickup. Please show the QR code at the counter.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
                </div>
                {order.totalAmount >= 20 ? (
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
                        order.totalAmount + 
                        order.totalAmount * 0.1 + 
                        (order.totalAmount >= 20 ? 0 : 2)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {order.status === "pending" && (
                <div className="mt-6">
                  <Button variant="destructive" className="w-full">
                    Cancel Order
                  </Button>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Order Status</h3>
                <div className="space-y-2">
                  {["pending", "preparing", "ready", "completed"].map((status, index) => {
                    const isActive = 
                      (status === "pending" && ["pending", "preparing", "ready", "completed"].includes(order.status)) ||
                      (status === "preparing" && ["preparing", "ready", "completed"].includes(order.status)) ||
                      (status === "ready" && ["ready", "completed"].includes(order.status)) ||
                      (status === "completed" && order.status === "completed");
                    
                    const isCurrentStep = order.status === status;
                    
                    return (
                      <div key={status} className="flex items-center">
                        <div 
                          className={`h-4 w-4 rounded-full mr-2 ${
                            isActive 
                              ? isCurrentStep 
                                ? "bg-green-500 animate-pulse" 
                                : "bg-green-500" 
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className={`capitalize ${isCurrentStep ? "font-medium" : ""}`}>
                            {status}
                          </p>
                          {isCurrentStep && status === "preparing" && (
                            <p className="text-xs text-gray-500">Estimated time: 15-20 minutes</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
