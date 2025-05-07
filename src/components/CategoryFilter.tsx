
import React from "react";
import { Link, useParams } from "react-router-dom";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CategoryFilter = () => {
  const { categoryId } = useParams();
  
  return (
    <div className="py-4">
      <ScrollArea className="whitespace-nowrap">
        <div className="flex space-x-2 px-4">
          <Link
            to="/menu"
            className={`px-4 py-2 rounded-full transition-colors ${
              !categoryId
                ? "bg-canteen-primary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            All
          </Link>
          
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/menu/${category.id}`}
              className={`px-4 py-2 rounded-full transition-colors ${
                categoryId === category.id
                  ? "bg-canteen-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
