import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Truck, RotateCcw, Plus, Minus, Zap, CheckCircle2 } from 'lucide-react';
import { Shoe } from '../types';

interface ProductModalProps {
  shoe: Shoe | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe, size: number | string, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
  onBuyNow?: (shoe: Shoe, size: number | string, color: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  shoe,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
  onBuyNow,
}) => {
  if (!isOpen || !shoe) return null;

  const [selectedSize, setSelectedSize] = useState<number | string>(shoe.sizes[2] || shoe.sizes[0] || 9);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors?.[0] || 'Original');
  const [activeImage, setActiveImage] = useState<string>(shoe.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  const imagesList = shoe.additionalImages && shoe.additionalImages.length > 0
    ? [shoe.image, ...shoe.additionalImages]
    : [shoe.image];

  const handleAddToCart = () => {
    onAddToCart(shoe, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 700);
  };

  const handleDirectBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(shoe, selectedSize, selectedColor, quantity);
    } else {
      handleAddToCart();
    }
  };

  const reviews = [
    {
      author: 'Marcus K.',
      rating: 5,
      date: '2 days ago',
      comment: 'Authenticity tag verified right away! Shape and leather quality are immaculate.',
    },
    {
      author: 'Sophia R.',
      rating: 5,
      date: '1 week ago',
      comment: 'Shipped in double-box packaging. Arrived in 2 business days in pristine condition.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden text-left relative z-10 animate-in zoom-in-95 duration-200 border border-neutral-100">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-[#f5f6f8] flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs flex items-center justify-center p-4">
                <img
                  src={activeImage}
                  alt={shoe.name}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
                {shoe.isSale && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Summer Sale
                  </span>
                )}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>In Stock • Ships in 24h</span>
                </div>
              </div>

              {/* Thumbnail strip */}
              {imagesList.length > 1 && (
                <div className="flex gap-2.5 mt-4 justify-center">
                  {imagesList.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition-all cursor-pointer ${
                        activeImage === imgUrl ? 'border-neutral-900 shadow-xs scale-105' : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Authenticity Guarantee Card */}
              <div className="mt-4 bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-neutral-200/80 flex items-center gap-3 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-neutral-900">100% SoleX Verified Authentic</p>
                  <p className="text-neutral-500">Every shoe undergoes physical inspection with tamper-proof seal.</p>
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
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
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

                {/* Tabs: Details vs Reviews */}
                <div className="flex gap-4 border-b border-neutral-100 mt-4 pb-1 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'details' ? 'border-b-2 border-neutral-950 text-neutral-950' : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Product Story
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'reviews' ? 'border-b-2 border-neutral-950 text-neutral-950' : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Verified Reviews ({reviews.length})
                  </button>
                </div>

                {activeTab === 'details' ? (
                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {shoe.description}
                  </p>
                ) : (
                  <div className="mt-3 space-y-2 text-xs">
                    {reviews.map((rev, idx) => (
                      <div key={idx} className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-neutral-900">{rev.author}</span>
                          <span className="text-neutral-400">{rev.date}</span>
                        </div>
                        <p className="text-neutral-600 mt-1">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

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
              <div className="mt-7 pt-4 border-t border-neutral-100 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="w-full bg-white hover:bg-neutral-50 text-neutral-950 border border-neutral-300 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>

                  <button
                    onClick={handleDirectBuyNow}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now</span>
                  </button>
                </div>

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
