import React from 'react';
import { CATEGORIES } from '../data/shoesData';
import { Shoe } from '../types';

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelectCategory: (category: Shoe['category'] | null) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold tracking-[0.15em] text-neutral-800 uppercase">
          SHOP BY CATEGORY
        </h2>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
          >
            Clear filter ({selectedCategory})
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div
                className={`w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 transition-all duration-300 relative border ${
                  isSelected
                    ? 'ring-2 ring-neutral-900 border-transparent shadow-md'
                    : 'border-neutral-200/70 hover:border-neutral-300 group-hover:shadow-md'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <span
                className={`mt-3 text-xs sm:text-sm font-medium transition-colors text-center ${
                  isSelected
                    ? 'text-neutral-950 font-bold underline decoration-neutral-900 underline-offset-4'
                    : 'text-neutral-800 group-hover:text-black'
                }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
