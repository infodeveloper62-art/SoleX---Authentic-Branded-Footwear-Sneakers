import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { SHOES_DATA } from '../data/shoesData';
import { Shoe } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectShoe,
}) => {
  const [query, setQuery] = useState('');

  const quickPicks = ['Air Force 1', 'Jordan 4', 'Superstar', 'New Balance', 'Running', 'Sale'];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SHOES_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.gender.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="min-h-full flex items-start justify-center p-4 pt-16 sm:pt-24 text-center">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden text-left relative z-10 animate-in zoom-in-95 duration-200">
          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search by shoe name, brand (Nike, Adidas...), or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold text-neutral-500 hover:text-black px-2 py-1 rounded-md cursor-pointer"
            >
              Esc
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-5 py-3 bg-[#fafafa] border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-neutral-400 shrink-0 font-medium">Popular:</span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                onClick={() => setQuery(pick)}
                className="bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-700 px-3 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                {pick}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4">
            {query && results.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-xs">
                No matching shoes found for "{query}". Try checking the brand name or exploring our categories.
              </div>
            ) : query && results.length > 0 ? (
              <div className="space-y-2">
                {results.map((shoe) => (
                  <div
                    key={shoe.id}
                    onClick={() => {
                      onSelectShoe(shoe);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-neutral-100 overflow-hidden shrink-0">
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          {shoe.brand} • {shoe.category}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 group-hover:text-black">
                          {shoe.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                          <span className="font-bold text-neutral-900">${shoe.price.toFixed(2)}</span>
                          <span>•</span>
                          <span className="flex items-center text-amber-500">
                            <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                            {shoe.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-400">
                <p className="text-xs text-neutral-600 font-medium">Type to search over 50+ authentic branded footwear styles</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-left">
                  {SHOES_DATA.slice(0, 3).map((shoe) => (
                    <div
                      key={shoe.id}
                      onClick={() => {
                        onSelectShoe(shoe);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-all cursor-pointer"
                    >
                      <img src={shoe.image} alt={shoe.name} className="w-full h-24 object-cover rounded-lg" />
                      <p className="text-xs font-bold text-neutral-900 truncate mt-2">{shoe.name}</p>
                      <p className="text-xs font-semibold text-neutral-600">${shoe.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
