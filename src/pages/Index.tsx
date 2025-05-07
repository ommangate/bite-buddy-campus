
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-canteen-primary flex items-center justify-center">
                <span className="text-white font-bold">BB</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">BitesBuddy</span>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <section className="bg-gradient-to-br from-canteen-primary to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Campus Canteen Management System
              </h1>
              <p className="text-xl mb-8">
                Skip long queues and order your campus food online. Pick up when ready!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/login">
                  <Button className="text-lg px-8 py-6 bg-white text-canteen-primary hover:bg-gray-100">
                    <ShoppingBag size={20} className="mr-2" />
                    Order Food
                  </Button>
                </Link>
                <Link to="/admin/login">
                  <Button 
                    variant="outline" 
                    className="text-lg px-8 py-6 bg-white/20 border-white text-white hover:bg-white hover:text-canteen-primary"
                  >
                    <Settings size={20} className="mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 rounded-full bg-canteen-primary text-white flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Order Online</h3>
                  <p className="text-gray-600">Browse menu, add to cart, and place your order online</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 rounded-full bg-canteen-secondary text-white flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
                  <p className="text-gray-600">Receive updates when your food is being prepared and ready</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 rounded-full bg-canteen-accent text-white flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quick Pickup</h3>
                  <p className="text-gray-600">Skip the line and show your QR code for fast pickup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Use BitesBuddy?</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                  <h3 className="text-xl font-semibold mb-2 text-canteen-primary">No More Waiting</h3>
                  <p className="text-gray-600">Skip long queues and save your valuable time between classes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                  <h3 className="text-xl font-semibold mb-2 text-canteen-primary">Easy Ordering</h3>
                  <p className="text-gray-600">Browse full menu, customize your order, and pay online</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                  <h3 className="text-xl font-semibold mb-2 text-canteen-primary">Real-time Updates</h3>
                  <p className="text-gray-600">Get notified when your order is confirmed, prepared and ready</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-left">
                  <h3 className="text-xl font-semibold mb-2 text-canteen-primary">Order History</h3>
                  <p className="text-gray-600">Keep track of your past orders and reorder your favorites</p>
                </div>
              </div>
              <div className="mt-12">
                <Link to="/menu">
                  <Button className="text-lg px-8 py-6 bg-canteen-primary hover:bg-green-600">
                    Explore Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-canteen-primary font-bold text-sm">BB</span>
              </div>
              <span className="ml-2 text-lg font-bold">BitesBuddy</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BitesBuddy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
