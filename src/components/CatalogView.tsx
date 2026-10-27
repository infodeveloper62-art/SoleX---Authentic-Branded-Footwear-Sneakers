import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Shoe } from '../types';
import { ShoeCard } from './ShoeCard';

interface CatalogViewProps {
  title: string;
  subtitle?: string;
  shoes: Shoe[];
  selectedBrand: string | null;
  selectedCategory: string | null;
  onSelectBrand: (brand: Shoe['brand'] | null) => void;
  onSelectCategory: (category: Shoe['category'] | null) => void;
  wishlistIds: string[];
  onToggleWishlist: (shoe: Shoe) => void;
  onSelectShoe: (shoe: Shoe) => void;
  onQuickAddToCart: (shoe: Shoe, e: React.MouseEvent) => void;
  onBackToHome: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  title,
  subtitle,
  shoes,
  selectedBrand,
  selectedCategory,
  onSelectBrand,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onSelectShoe,
  onQuickAddToCart,
  onBackToHome,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceRange, setPriceRange] = useState<number>(300);

  const brands: Shoe['brand'][] = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse', 'Vans'];
  const categories: Shoe['category'][] = ['Running', 'Lifestyle', 'Basketball', 'Training', 'Sneakers', 'Slides', 'Boots'];

  const filteredShoes = useMemo(() => {
    let list = [...shoes];

    if (selectedBrand) {
      list = list.filter((s) => s.brand === selectedBrand);
    }

    if (selectedCategory) {
      list = list.filter((s) => s.category === selectedCategory);
    }

    list = list.filter((s) => s.price <= priceRange);

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [shoes, selectedBrand, selectedCategory, priceRange, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Bar with back button and active title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black font-semibold mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Featured
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
        </div>

        {/* Sorting and Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500 font-medium">
            {filteredShoes.length} {filteredShoes.length === 1 ? 'item' : 'items'}
          </span>

          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-1.5 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Active Filters Pill Bar */}
          {(selectedBrand || selectedCategory) && (
            <div className="bg-[#f5f6f8] p-3 rounded-2xl">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-neutral-800">Active Filters:</span>
                <button
                  onClick={() => {
                    onSelectBrand(null);
                    onSelectCategory(null);
                  }}
                  className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 bg-white text-neutral-900 border border-neutral-200 text-xs px-2.5 py-1 rounded-full font-medium">
                    {selectedBrand}
                    <button onClick={() => onSelectBrand(null)} className="hover:text-red-500 ml-1">×</button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-white text-neutral-900 border border-neutral-200 text-xs px-2.5 py-1 rounded-full font-medium">
                    {selectedCategory}
                    <button onClick={() => onSelectCategory(null)} className="hover:text-red-500 ml-1">×</button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Brands Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Brands
            </h3>
            <div className="space-y-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => onSelectBrand(selectedBrand === brand ? null : brand)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-neutral-900 text-white font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{brand}</span>
                  {selectedBrand === brand && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Category
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-900 mb-2">
              <span>Max Price</span>
              <span>${priceRange}</span>
            </div>
            <input
              type="range"
              min="40"
              max="250"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-neutral-950 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>$40</span>
              <span>$250+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {filteredShoes.length === 0 ? (
            <div className="py-24 text-center bg-white rounded-3xl border border-neutral-100 p-8">
              <p className="text-neutral-800 font-bold text-base">No shoes match your criteria</p>
              <p className="text-xs text-neutral-500 mt-1">Try resetting the brand or category filters.</p>
              <button
                onClick={() => {
                  onSelectBrand(null);
                  onSelectCategory(null);
                  setPriceRange(300);
                }}
                className="mt-4 bg-neutral-950 text-white text-xs px-5 py-2.5 rounded-full font-semibold hover:bg-neutral-800 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {filteredShoes.map((shoe) => (
                <ShoeCard
                  key={shoe.id}
                  shoe={shoe}
                  isWishlisted={wishlistIds.includes(shoe.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectShoe={onSelectShoe}
                  onQuickAddToCart={onQuickAddToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};
