
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserNavbar from "@/components/UserNavbar";
import SearchBar from "@/components/SearchBar";
import MenuCard from "@/components/MenuCard";
import { searchMenuItems } from "@/data/mockData";
import { MenuItem } from "@/types";
import { Search } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchMenuItems(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-600 mt-1">
            {query ? `Results for "${query}"` : "Enter a search term"}
          </p>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>

        {query ? (
          results.length > 0 ? (
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-4">Found {results.length} items</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-gray-500">
                We couldn't find any items matching "{query}"
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Search for items</h3>
            <p className="mt-1 text-gray-500">
              Enter a search term to find items
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
