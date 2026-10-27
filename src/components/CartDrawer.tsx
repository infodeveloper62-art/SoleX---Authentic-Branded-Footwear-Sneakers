import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check, Tag, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.shoe.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 100 || items.length === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyCode = (codeToApply: string) => {
    setPromoError('');
    setPromoSuccess('');
    const code = codeToApply.trim().toUpperCase();

    if (code === 'SOLEX40' || code === 'SUMMER40') {
      setDiscountPercent(40);
      setPromoSuccess('40% Summer Sale discount applied!');
      setPromoCode('SOLEX40');
    } else if (code === 'SAVE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP discount applied!');
      setPromoCode('SAVE10');
    } else {
      setPromoError('Invalid code. Try "SOLEX40" for 40% off!');
    }
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyCode(promoCode);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        onClearCart();
      }, 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-bold text-neutral-900">Your Cart</h2>
              <span className="text-xs bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#f8f9fa] px-5 py-3 border-b border-neutral-100 text-xs">
            {subtotal >= 100 ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>You unlocked Free Standard Shipping!</span>
                </div>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 2-3 Days
                </span>
              </div>
            ) : (
              <div>
                <span className="text-neutral-700">
                  Add <strong className="text-neutral-950">${(100 - subtotal).toFixed(2)}</strong> more for free shipping!
                </span>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Order Confirmed!</h3>
                <p className="text-sm text-neutral-500 mt-2 max-w-xs mx-auto">
                  Thank you for your order #SLX-{Math.floor(100000 + Math.random() * 900000)}. We have sent a confirmation email to your account.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      onClose();
                    }}
                    className="bg-neutral-950 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-neutral-300" />
                <p className="text-neutral-800 font-semibold text-sm">Your cart is empty</p>
                <p className="text-xs text-neutral-500 mt-1">Discover your next favorite pair from our collection.</p>
                <button
                  onClick={onClose}
                  className="mt-5 bg-neutral-950 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Explore Shoes
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl border border-neutral-100 hover:border-neutral-200 bg-white transition-all shadow-xs"
                >
                  <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-100">
                    <img
                      src={item.shoe.image}
                      alt={item.shoe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                          {item.shoe.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-neutral-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-2">
                        <span>Size: <strong className="text-neutral-800">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-neutral-600 hover:text-neutral-900 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-neutral-950">
                        ${(item.shoe.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {!orderComplete && items.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
              {/* Promo Code Form & Quick Chips */}
              <div>
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 uppercase font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Quick Coupon Chips */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => applyCode('SOLEX40')}
                    className="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Tag className="w-2.5 h-2.5" /> SOLEX40 (40% OFF)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCode('SAVE10')}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Tag className="w-2.5 h-2.5" /> SAVE10 (10% OFF)
                  </button>
                </div>

                {promoSuccess && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">{promoSuccess}</p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 font-medium mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span className="text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & Guaranteed Authentic</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
