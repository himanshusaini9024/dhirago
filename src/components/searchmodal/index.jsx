"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchDrawer({ open, onClose }) {
  const [query, setQuery] = useState("");
  // const [results, setResults] = useState({
  //   products: [],
  //   categories: [],
  //   suggestions: [],
  // });
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // ✅ Autofocus
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // ✅ API Search
  useEffect(() => {
    if (!query) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}`,
        );
        const data = await res.json();
        setResults(data?.results || []);
        setSuggestions(data?.suggestions || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const getImage = (photo) => {
    try {
      if (!photo) return "/placeholder.png";

      const images = typeof photo === "string" ? JSON.parse(photo) : photo;

      return images?.[0]?.url
        ? `https://res.cloudinary.com/ds48lk80f/${images[0].url}`
        : "/placeholder.png";
    } catch {
      return "/placeholder.png";
    }
  };

  // ✅ ESC close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const products = results.filter((item) => item.type === "product");

  const categories = results.filter((item) => item.type === "category");
  return (
    <div
      className={`fixed inset-0 z-[999] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 border-b">
          <i className="icon-search text-gray-400 text-lg" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 outline-none text-base"
          />

          <button onClick={onClose} className="text-xl hover:text-red-500">
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="h-[calc(100%-60px)] overflow-y-auto p-5 space-y-6">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h3 className="text-xs text-gray-400 uppercase mb-3">
                Suggestions
              </h3>

              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setQuery(item)}
                  className="py-2 cursor-pointer hover:text-yellow-500 transition"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h3 className="text-xs text-gray-400 uppercase mb-3">
                Categories
              </h3>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded transition"
                  >
                    {cat.photo ? (
                      <Image
                        src={cat.photo}
                        alt={cat.name || "Product"}
                        width={15}
                        height={15}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                    <span className="text-sm">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div>
              <h3 className="text-xs text-gray-400 uppercase mb-3">Products</h3>

              <div className="space-y-2">
                {products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded transition"
                  >
                    {prod.photo ? (
                      <img
                        src={getImage(prod.photo)}
                        alt={prod.name || "Product"}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}

                    <span className="text-sm">{prod.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty */}
          {query && results.length === 0 && (
            <p className="text-gray-400 text-sm">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
