
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import OrderCard from "@/components/OrderCard";
import { getOrdersByUserId } from "@/data/mockData";
import { Order } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PackageOpen, ShoppingBag } from "lucide-react";

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const userOrders = getOrdersByUserId(user.id);
    setOrders(userOrders);
  }, [user, navigate]);
  
  const activeOrders = orders.filter(
    order => order.status === "pending" || order.status === "preparing" || order.status === "ready"
  );
  
  const pastOrders = orders.filter(
    order => order.status === "completed" || order.status === "cancelled"
  );
  
  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'active'
                  ? 'text-canteen-primary border-b-2 border-canteen-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active Orders
              {activeOrders.length > 0 && (
                <span className="ml-2 bg-canteen-primary text-white rounded-full px-2 py-0.5 text-xs">
                  {activeOrders.length}
                </span>
              )}
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'past'
                  ? 'text-canteen-primary border-b-2 border-canteen-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Order History
            </button>
          </div>
          
          <div className="p-6">
            {displayOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                {activeTab === 'active' ? (
                  <>
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No active orders</h3>
                    <p className="mt-1 text-gray-500">
                      You don't have any active orders at the moment
                    </p>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No past orders</h3>
                    <p className="mt-1 text-gray-500">
                      Your order history will appear here
                    </p>
                  </>
                )}
                <Button 
                  className="mt-4 bg-canteen-primary hover:bg-green-600" 
                  onClick={() => navigate("/menu")}
                >
                  Place an Order
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
