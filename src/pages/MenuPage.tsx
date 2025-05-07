
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import MenuCard from "@/components/MenuCard";
import { categories, getMenuItemsByCategory, getPopularItems } from "@/data/mockData";
import { MenuItem } from "@/types";

const MenuPage = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (categoryId) {
      setMenuItems(getMenuItemsByCategory(categoryId));
    } else {
      // Show all items when no category is selected
      const allItems: MenuItem[] = [];
      categories.forEach(category => {
        const items = getMenuItemsByCategory(category.id);
        allItems.push(...items);
      });
      setMenuItems(allItems);
    }
  }, [categoryId]);

  const getCurrentCategoryName = () => {
    if (!categoryId) return "All Menu";
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Menu";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{getCurrentCategoryName()}</h1>
          <p className="text-gray-600 mt-1">Explore our delicious food items</p>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>

        <CategoryFilter />

        {!categoryId && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getPopularItems().map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {categoryId ? "Menu Items" : "All Items"}
          </h2>
          
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {menuItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No items available in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
