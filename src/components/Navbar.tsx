import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { SoleXLogo } from './BrandLogos';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'Home', label: 'Home' },
    { id: 'Shop', label: 'Shop' },
    { id: 'Men', label: 'Men' },
    { id: 'Women', label: 'Women' },
    { id: 'Kids', label: 'Kids' },
    { id: 'Brands', label: 'Brands' },
    { id: 'Sale', label: 'Sale', isSpecial: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => setActiveTab('Home')}
              className="focus:outline-none flex items-center cursor-pointer transition-transform active:scale-95"
            >
              <SoleXLogo />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`relative py-2.5 transition-colors cursor-pointer ${
                      link.isSpecial
                        ? 'text-red-500 font-semibold hover:text-red-600'
                        : isActive
                        ? 'text-neutral-900 font-semibold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full transition-all duration-200" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-5 text-neutral-700">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search shoes"
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800 hover:text-black cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800 hover:text-black cursor-pointer"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with count badge (showing 2 initially as in screenshot) */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800 hover:text-black cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button
              onClick={onOpenAccount}
              aria-label="My Account"
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800 hover:text-black cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                link.isSpecial
                  ? 'text-red-500 font-semibold'
                  : activeTab === link.id
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span>{link.label}</span>
              {activeTab === link.id && <span className="w-2 h-2 rounded-full bg-neutral-900" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
