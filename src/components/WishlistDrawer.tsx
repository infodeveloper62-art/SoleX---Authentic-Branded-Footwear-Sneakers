import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Shoe } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistShoes: Shoe[];
  onRemoveFromWishlist: (shoeId: string) => void;
  onAddToCart: (shoe: Shoe, size: number | string, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistShoes,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-base font-bold text-neutral-900">Your Wishlist</h2>
              <span className="text-xs bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full">
                {wishlistShoes.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistShoes.length === 0 ? (
              <div className="py-20 text-center text-neutral-400">
                <Heart className="w-12 h-12 mx-auto stroke-1 mb-3 text-neutral-300" />
                <p className="text-neutral-800 font-semibold text-sm">Your wishlist is empty</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Click the heart icon on any shoe to save it for later.
                </p>
              </div>
            ) : (
              wishlistShoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-neutral-100 hover:border-neutral-200 bg-white transition-all shadow-xs"
                >
                  <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-100">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                          {shoe.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(shoe.id)}
                          aria-label="Remove from wishlist"
                          className="text-neutral-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{shoe.gender}</p>
                      <p className="text-xs font-bold text-neutral-950 mt-1">
                        ${shoe.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          const defaultSize = shoe.sizes[0] || 9;
                          const defaultColor = shoe.colors?.[0] || 'Default';
                          onAddToCart(shoe, defaultSize, defaultColor);
                        }}
                        className="flex-1 bg-neutral-900 hover:bg-black text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
