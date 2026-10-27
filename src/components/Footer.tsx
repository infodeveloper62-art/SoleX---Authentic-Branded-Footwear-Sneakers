import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, Check } from 'lucide-react';
import { SoleXLogo } from './BrandLogos';

interface FooterProps {
  onSelectCategory: (category: any) => void;
  onOpenSizeGuide: () => void;
  onShowNotice: (title: string, msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeGuide,
  onShowNotice,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowNotice('Invalid Email', 'Please provide a valid email address.');
      return;
    }
    setSubscribed(true);
    onShowNotice('Subscribed!', 'Thank you for subscribing to the SoleX newsletter. Enjoy 10% off your next order!');
  };

  return (
    <footer className="bg-[#09090b] text-[#a1a1aa] text-sm pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/80">
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <SoleXLogo inverted />
            <p className="mt-4 text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Your destination for authentic branded shoes. Quality, style, and comfort — all in one place.
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-3 mt-6">
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onShowNotice('Instagram', 'Follow @SoleXOfficial on Instagram!');
                }}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  onShowNotice('Facebook', 'Connect with SoleX on Facebook!');
                }}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => {
                  e.preventDefault();
                  onShowNotice('Twitter', 'Follow @SoleX_Sneakers on X / Twitter!');
                }}
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => {
                  e.preventDefault();
                  onShowNotice('TikTok', 'Watch shoe unboxings on TikTok @SoleX_Sneakers!');
                }}
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors text-xs font-bold"
              >
                ♪
              </a>
            </div>
          </div>

          {/* SHOP (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onSelectCategory(null)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lifestyle')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Running')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kids
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sale')}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onShowNotice('Contact Support', 'Email us at support@solex.com or call 1-800-555-SOLEX. Available 24/7.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('Shipping Info', 'Standard delivery: 2-4 business days. Free shipping on all orders over $100.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('Returns & Exchanges', 'Hassle-free 30-day returns on unworn shoes in original packaging.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('FAQ', 'Browse our frequently asked questions about authentication, sizing, and shipping.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors font-medium text-orange-400 cursor-pointer"
                >
                  Size Guide
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onShowNotice('About SoleX', 'SoleX is the premier footwear boutique offering 100% verified authentic branded sneakers.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('Careers', 'We are actively hiring retail stylists and footwear curators. Send your CV to careers@solex.com.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('Sustainability', 'We partner with brands dedicated to recycled materials and circular fashion initiatives.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('SoleX Blog', 'Read the latest drops, sneaker history, and styling guides on our blog.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowNotice('Store Locator', 'Find SoleX flagship stores in New York, Los Angeles, London, and Tokyo.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              NEWSLETTER
            </h4>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Get updates on new arrivals, exclusive offers and more.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 pr-10"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2024 SoleX. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onShowNotice('Terms & Conditions', 'SoleX terms of service, warranty rules, and guarantee details.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onShowNotice('Privacy Policy', 'Your privacy is paramount. SoleX never sells your personal payment or browsing data.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
