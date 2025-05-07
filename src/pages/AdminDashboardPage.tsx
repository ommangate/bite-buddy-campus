
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getPendingOrders, updateOrderStatus, orders } from "@/data/mockData";
import { Order } from "@/types";
import { Clock, Check, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"new" | "preparing">("new");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    
    const orders = getPendingOrders();
    setPendingOrders(orders);
  }, [user, navigate]);

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order #${orderId.slice(-5)} marked as ${newStatus}`);
    
    // Update the state to reflect the change
    setPendingOrders(pendingOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const newOrders = pendingOrders.filter(order => order.status === "pending");
  const preparingOrders = pendingOrders.filter(order => order.status === "preparing");

  // Stats for the order metrics
  const orderStats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(order => order.status === "completed").length,
    cancelledOrders: orders.filter(order => order.status === "cancelled").length,
    revenue: orders
      .filter(order => order.status === "completed")
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage orders and menu items</p>
          </div>
          
          <div className="flex space-x-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin/menu-management")}
            >
              Manage Menu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Orders</CardTitle>
              <CardDescription>All-time orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orderStats.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed</CardTitle>
              <CardDescription>Successfully delivered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{orderStats.completedOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending</CardTitle>
              <CardDescription>Orders in queue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
              <CardDescription>Total earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">${orderStats.revenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>Track and update incoming orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="new" value={activeTab} onValueChange={(value) => setActiveTab(value as "new" | "preparing")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">
                  New Orders
                  {newOrders.length > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {newOrders.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="preparing">
                  Preparing
                  {preparingOrders.length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {preparingOrders.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new">
                {newOrders.length > 0 ? (
                  <div className="divide-y">
                    {newOrders.map((order) => (
                      <div key={order.id} className="py-4">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <div>
                            <span className="font-semibold">Order #{order.id.slice(-5)}</span>
                            <OrderStatusBadge status={order.status} className="ml-2" />
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between mb-1">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                            <span>Total:</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          >
                            <X size={16} className="mr-1" />
                            Cancel
                          </Button>
                          <Button 
                            className="bg-blue-500 hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "preparing")}
                          >
                            <Clock size={16} className="mr-1" />
                            Start Preparing
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No new orders</h3>
                    <p className="text-gray-500">New orders will appear here</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preparing">
                {preparingOrders.length > 0 ? (
                  <div className="divide-y">
                    {preparingOrders.map((order) => (
                      <div key={order.id} className="py-4">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <div>
                            <span className="font-semibold">Order #{order.id.slice(-5)}</span>
                            <OrderStatusBadge status={order.status} className="ml-2" />
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between mb-1">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                            <span>Total:</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button 
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "ready")}
                          >
                            <Check size={16} className="mr-1" />
                            Mark as Ready
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders in preparation</h3>
                    <p className="text-gray-500">Orders being prepared will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
