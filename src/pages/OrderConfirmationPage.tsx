
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clipboard, Clock, Home } from "lucide-react";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    // Generate a QR code - in a real app, this would come from the backend
    const dummyQrCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOSSURBVO3BQY4cSRIEQdNA/f/Lup4G9xQCmaruHRG2+YP1KIv1OIv1OIv1OIv1OIv1OIv1OIv1uIuHl6r4k5pMVdxUTKrIVJGpmKqYKjJVTCq+qeKbKn5SxZuXsViPs1iPs1iPu/gyVfGmikyVVDGpyFSRqZgqTlVkqjJVZCpuKt5U8U1VfNNiPc5iPc5iPe7iw1R8k1SRqZKKTEWmIlORqTipyFRJFZmKqUqqmCpuKr5JxW9arMdZrMdZrMdd/LKKTJVUkalSxZuKqeJNRaYiU5GpOFVkqshUZCpOFb9psR5nsR5nsR538WWq+BepIlORqZgqMhVTxaQiU5GpOKmYKjIVmYpTxb/JYj3OYj3OYj3u4sNU/KaKk4pJRabipCJTcVPxpiJTJVVMKv6fLdbjLNbjLNbjLh5eqiJTJVVMKt5UTBWZikzFpOJUMamYVGQqpopMRaYiUzFVZCpuKjIVX6ZissV6nMV6nMV6mD9Yj7JYj7NYj7NYj7NYj7NYj7NYj/ALl5Q+Z1hSAQAAAABJRU5ErkJggg==";
    setQrCode(dummyQrCode);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-green-500 p-6 text-center">
            <CheckCircle size={64} className="mx-auto text-white mb-4" />
            <h1 className="text-2xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-green-100 mt-1">Your order has been placed successfully</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600">Order ID:</p>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold mr-2">#{orderId}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400"
                  onClick={() => {
                    navigator.clipboard.writeText(orderId || "");
                  }}
                >
                  <Clipboard size={14} />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-green-600 font-medium">
                <Clock size={16} className="mr-2" />
                <span>Estimated delivery time: 25-40 minutes</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Present this QR code at pickup</h3>
              <div className="flex justify-center">
                <div className="p-4 border border-gray-200 rounded-lg">
                  {qrCode && (
                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-gray-600 mb-1">Estimated Preparation Status:</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Order received</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Preparing your order</span>
                  <span className="text-yellow-500">In progress</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Ready for pickup</span>
                  <span>Pending</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link to="/orders" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Clock size={16} className="mr-2" />
                  View Order Status
                </Button>
              </Link>
              <Link to="/menu" className="flex-1">
                <Button className="w-full bg-canteen-primary hover:bg-green-600">
                  <Home size={16} className="mr-2" />
                  Back to Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
