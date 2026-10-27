import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { Shoe } from '../types';

interface ProductModalProps {
  shoe: Shoe | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe, size: number | string, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  shoe,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !shoe) return null;

  const [selectedSize, setSelectedSize] = useState<number | string>(shoe.sizes[2] || shoe.sizes[0] || 9);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors?.[0] || 'Original');
  const [activeImage, setActiveImage] = useState<string>(shoe.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const imagesList = shoe.additionalImages && shoe.additionalImages.length > 0
    ? [shoe.image, ...shoe.additionalImages]
    : [shoe.image];

  const handleAddToCart = () => {
    onAddToCart(shoe, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden text-left relative z-10 animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-[#f5f6f8] flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-4">
                <img
                  src={activeImage}
                  alt={shoe.name}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
                {shoe.isSale && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Summer Sale
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {imagesList.length > 1 && (
                <div className="flex gap-2.5 mt-4 justify-center">
                  {imagesList.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition-all cursor-pointer ${
                        activeImage === imgUrl ? 'border-neutral-900 shadow-xs' : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Authenticity Guarantee Card */}
              <div className="mt-4 bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-neutral-200/80 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-neutral-900">100% SoleX Verified Authentic</p>
                  <p className="text-neutral-500">Inspected by our footwear verification specialists.</p>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Brand & Subtitle */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    {shoe.brand} • {shoe.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(shoe)}
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Wishlist toggle"
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 mt-1">
                  {shoe.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold text-xs ml-1 text-neutral-800">{shoe.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs text-neutral-500">{shoe.reviewsCount} verified reviews</span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-neutral-950">
                    ${shoe.price.toFixed(2)}
                  </span>
                  {shoe.originalPrice && (
                    <span className="text-base text-neutral-400 line-through">
                      ${shoe.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {shoe.isSale && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Save ${(shoe.originalPrice! - shoe.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  {shoe.description}
                </p>

                {/* Color choices if present */}
                {shoe.colors && shoe.colors.length > 0 && (
                  <div className="mt-5">
                    <span className="text-xs font-bold text-neutral-800 block mb-2">
                      Colorway: <span className="font-normal text-neutral-600">{selectedColor}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {shoe.colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                            selectedColor === col
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-800">Select Size (US)</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-xs text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {shoe.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-800">Quantity:</span>
                  <div className="flex items-center border border-neutral-200 rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-neutral-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 pt-4 border-t border-neutral-100 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <span>Add to Cart • ${(shoe.price * quantity).toFixed(2)}</span>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Free shipping over $100</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Free 30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
