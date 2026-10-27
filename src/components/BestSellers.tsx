import React from 'react';
import { Shoe } from '../types';
import { ShoeCard } from './ShoeCard';

interface BestSellersProps {
  shoes: Shoe[];
  wishlistIds: string[];
  onToggleWishlist: (shoe: Shoe) => void;
  onSelectShoe: (shoe: Shoe) => void;
  onQuickAddToCart: (shoe: Shoe, e: React.MouseEvent) => void;
  onViewAll: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  shoes,
  wishlistIds,
  onToggleWishlist,
  onSelectShoe,
  onQuickAddToCart,
  onViewAll,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold tracking-[0.15em] text-neutral-800 uppercase">
          BEST SELLERS
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs text-neutral-500 hover:text-neutral-900 font-medium transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {shoes.map((shoe) => (
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
    </section>
  );
};
