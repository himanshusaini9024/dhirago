"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import ProductItem from "../../product-item";
import FilterDropdown, {
  CheckboxItem,
} from "../../../components/ui/filterdropdown";

export default function ProductList() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    size: "",
    color: "",
    maxPrice: 10000,
  });

  // ✅ Fetch Products
  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/category/${slug}`
        );
        const data = await res.json();
        setProducts(data.category || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  // ✅ Sync URL → State
  useEffect(() => {
    const size = searchParams.get("size") || "";
    const color = searchParams.get("color") || "";
    const sortParam = searchParams.get("sort") || "popular";

    setFilters((prev) => ({
      ...prev,
      size,
      color,
    }));

    setSort(sortParam);
  }, []);

  // ✅ Update URL
  const updateURL = (newFilters, newSort = sort) => {
    const params = new URLSearchParams();

    if (newFilters.size) params.set("size", newFilters.size);
    if (newFilters.color) params.set("color", newFilters.color);
    if (newSort) params.set("sort", newSort);

    router.push(`/collections/${slug}?${params.toString()}`);
  };

  // ✅ Dynamic filter options
  const sizes = [
    ...new Set(
      products.flatMap((p) =>
        p.size ? p.size.split(",") : []
      )
    ),
  ];

  const colors = [
    ...new Set(products.map((p) => p.color).filter(Boolean)),
  ];

  // ✅ Apply filters + sorting
  const filteredProducts = products
    .filter((product) => {
      return (
        (!filters.size ||
          product.size?.includes(filters.size)) &&
        (!filters.color ||
          product.color === filters.color) &&
        product.currentPrice <= filters.maxPrice
      );
    })
    .sort((a, b) => {
      if (sort === "low")
        return a.currentPrice - b.currentPrice;
      if (sort === "high")
        return b.currentPrice - a.currentPrice;
      return 0;
    });

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="text-center pt-12 pb-6 px-4">
        <h1 className="text-[28px] tracking-[2px] font-semibold uppercase">
          {slug?.replace("-", " ")}
        </h1>

        <p className="text-[11px] text-gray-400 mt-4 tracking-[3px]">
          SELECT YOUR SIZE
        </p>

        <div className="flex justify-center flex-wrap gap-3 mt-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const updated = {
                  ...filters,
                  size:
                    filters.size === size ? "" : size,
                };
                setFilters(updated);
                updateURL(updated);
              }}
              className={`px-3 py-[4px] border text-xs ${
                filters.size === size
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE BAR */}
      <div className="md:hidden px-4 py-3 border-b flex justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm font-medium"
        >
          Filters
        </button>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            updateURL(filters, e.target.value);
          }}
          className="text-sm bg-transparent"
        >
          <option value="popular">Popular</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* MOBILE FILTERS */}
      {showFilters && (
        <div className="md:hidden px-4 py-4 space-y-4 border-b">
          <div>
            <p className="text-xs mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const updated = {
                      ...filters,
                      size:
                        filters.size === size
                          ? ""
                          : size,
                    };
                    setFilters(updated);
                    updateURL(updated);
                  }}
                  className={`px-3 py-1 border text-xs ${
                    filters.size === size
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP FILTER BAR */}
      <div className="hidden md:block border-y bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-[56px]">
          <div className="flex gap-8 text-sm">
            <FilterDropdown label="Size">
              {sizes.map((size) => (
                <CheckboxItem
                  key={size}
                  label={size}
                  checked={filters.size === size}
                  onChange={() => {
                    const updated = {
                      ...filters,
                      size:
                        filters.size === size
                          ? ""
                          : size,
                    };
                    setFilters(updated);
                    updateURL(updated);
                  }}
                />
              ))}
            </FilterDropdown>

            <FilterDropdown label="Color">
              {colors.map((color) => (
                <CheckboxItem
                  key={color}
                  label={color}
                  checked={filters.color === color}
                  onChange={() => {
                    const updated = {
                      ...filters,
                      color:
                        filters.color === color
                          ? ""
                          : color,
                    };
                    setFilters(updated);
                    updateURL(updated);
                  }}
                />
              ))}
            </FilterDropdown>

            <FilterDropdown label="Price">
              <div className="w-[180px]">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.maxPrice}
                  onChange={(e) => {
                    const updated = {
                      ...filters,
                      maxPrice: Number(
                        e.target.value
                      ),
                    };
                    setFilters(updated);
                    updateURL(updated);
                  }}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Up to ₹{filters.maxPrice}
                </p>
              </div>
            </FilterDropdown>
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-gray-400">
              Sort By
            </span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                updateURL(filters, e.target.value);
              }}
              className="bg-transparent font-medium"
            >
              <option value="popular">
                Popular
              </option>
              <option value="low">
                Price: Low → High
              </option>
              <option value="high">
                Price: High → Low
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              slug={item.slug}
              name={item.name}
              currentPrice={item.currentPrice}
              images={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}