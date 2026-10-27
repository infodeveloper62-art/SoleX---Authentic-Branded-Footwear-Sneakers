import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Shoe } from '../types';

interface ShoeCardProps {
  shoe: Shoe;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  onSelectShoe: (shoe: Shoe) => void;
  onQuickAddToCart: (shoe: Shoe, e: React.MouseEvent) => void;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({
  shoe,
  isWishlisted,
  onToggleWishlist,
  onSelectShoe,
  onQuickAddToCart,
}) => {
  return (
    <div
      onClick={() => onSelectShoe(shoe)}
      className="group flex flex-col bg-transparent cursor-pointer select-none"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl bg-[#f4f5f7] overflow-hidden flex items-center justify-center p-3 border border-neutral-100/80 transition-all duration-300 group-hover:shadow-md group-hover:border-neutral-200">
        <img
          src={shoe.image}
          alt={shoe.name}
          className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Heart Button at top right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(shoe);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer ${
            isWishlisted
              ? 'text-red-500 bg-white shadow-sm'
              : 'text-neutral-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-current text-red-500' : 'stroke-[1.75]'
            }`}
          />
        </button>

        {/* Sale Tag if applicable */}
        {shoe.isSale && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Sale
          </span>
        )}

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={(e) => onQuickAddToCart(shoe, e)}
            className="w-full py-2 bg-neutral-950/90 hover:bg-black text-white text-xs font-semibold rounded-xl backdrop-blur-md transition-colors shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Details matching screenshot */}
      <div className="pt-3.5 pb-1 flex flex-col">
        <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
          {shoe.name}
        </h3>
        
        <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 font-normal">
          {shoe.gender}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-neutral-950">
              ${shoe.price.toFixed(2)}
            </span>
            {shoe.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${shoe.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center text-[11px] sm:text-xs text-neutral-500 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span className="font-semibold text-neutral-800">{shoe.rating}</span>
            <span className="text-neutral-400 ml-1">({shoe.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
