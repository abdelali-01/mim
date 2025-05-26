'use client';
import { useState, useEffect } from 'react';
import { Product, products } from '../../../public/data';

interface Filter {
  category: string[];
  price: {
    min: number;
    max: number;
  };
  sort: 'newest' | 'price-low' | 'price-high' | 'popular';
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: Filter;
  onFilterChange: (filters: Filter) => void;
  isOpen: boolean;
}

export default function FilterSidebar({ filters, onFilterChange, isOpen }: FilterSidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);

  // Get unique categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map((p: Product) => p.category)));
    setCategories(uniqueCategories);
  }, []);

  return (
    <div className={`lg:w-64 ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.category, category]
                      : filters.category.filter(c => c !== category);
                    onFilterChange({ ...filters, category: newCategories });
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.price.min}
                onChange={(e) => onFilterChange({
                  ...filters,
                  price: { ...filters.price, min: Number(e.target.value) }
                })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filters.price.max}
                onChange={(e) => onFilterChange({
                  ...filters,
                  price: { ...filters.price, max: Number(e.target.value) }
                })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Stock Status</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">In Stock</span>
            </label>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFilterChange({
            category: [],
            price: { min: 0, max: 1000 },
            sort: 'newest',
            inStock: false
          })}
          className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
} 