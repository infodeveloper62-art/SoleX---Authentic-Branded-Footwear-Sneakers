/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TopBrands } from './components/TopBrands';
import { CategoryGrid } from './components/CategoryGrid';
import { BestSellers } from './components/BestSellers';
import { SummerSaleBanner } from './components/SummerSaleBanner';
import { ValueProps } from './components/ValueProps';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';
import { CatalogView } from './components/CatalogView';
import { ToastNotice, ToastData } from './components/ToastNotice';
import { SHOES_DATA } from './data/shoesData';
import { Shoe, CartItem } from './types';

export default function App() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [selectedBrand, setSelectedBrand] = useState<Shoe['brand'] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Shoe['category'] | null>(null);

  // Cart state - initialized with 2 items to match the "2" badge in the screenshot!
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-cart-1',
      shoe: SHOES_DATA[0], // Nike Air Force 1 '07
      size: 9,
      color: 'Triple White',
      quantity: 1,
    },
    {
      id: 'initial-cart-2',
      shoe: SHOES_DATA[1], // Adidas Superstar
      size: 9.5,
      color: 'Cloud White / Core Black',
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['shoe-aj4']); // Pre-favorited Air Jordan 4

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const handleAddToCart = (
    shoe: Shoe,
    size: number | string = 9,
    color: string = 'Original',
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (it) => it.shoe.id === shoe.id && it.size === size && it.color === color
      );
      if (existing) {
        return prev.map((it) =>
          it.id === existing.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          id: `${shoe.id}-${size}-${color}-${Date.now()}`,
          shoe,
          size,
          color,
          quantity,
        },
      ];
    });
    showToast('Added to Cart', `${shoe.name} (Size: ${size}) added to your bag.`);
  };

  const handleQuickAddToCart = (shoe: Shoe, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = shoe.sizes[2] || shoe.sizes[0] || 9;
    const defaultColor = shoe.colors?.[0] || 'Default';
    handleAddToCart(shoe, defaultSize, defaultColor, 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Item Removed', 'The item was removed from your cart.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (shoe: Shoe) => {
    setWishlistIds((prev) => {
      if (prev.includes(shoe.id)) {
        showToast('Removed from Wishlist', `${shoe.name} was removed.`, 'info');
        return prev.filter((id) => id !== shoe.id);
      } else {
        showToast('Saved to Wishlist', `${shoe.name} added to your wishlist.`);
        return [...prev, shoe.id];
      }
    });
  };

  // Filtering actions
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'Home') {
      setSelectedBrand(null);
      setSelectedCategory(null);
    } else if (tab === 'Brands') {
      const el = document.getElementById('top-brands-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBrand = (brand: Shoe['brand'] | null) => {
    setSelectedBrand(brand);
    if (brand && activeTab === 'Home') {
      setActiveTab('Shop');
    }
  };

  const handleSelectCategory = (category: Shoe['category'] | null) => {
    setSelectedCategory(category);
    if (category && activeTab === 'Home') {
      setActiveTab('Shop');
    }
  };

  // Filter products according to active tab
  const getTabFilteredShoes = () => {
    let list = SHOES_DATA;
    if (activeTab === 'Men') {
      list = list.filter((s) => s.gender === "Men's Shoes" || s.gender === 'Unisex Shoes');
    } else if (activeTab === 'Women') {
      list = list.filter((s) => s.gender === "Women's Shoes" || s.gender === 'Unisex Shoes');
    } else if (activeTab === 'Kids') {
      list = list.filter((s) => s.gender === "Kids' Shoes" || s.category === 'Sneakers');
    } else if (activeTab === 'Sale') {
      list = list.filter((s) => s.isSale || s.originalPrice);
    }
    return list;
  };

  const bestSellerShoes = SHOES_DATA.filter((s) => s.isBestSeller).slice(0, 5);
  const wishlistShoes = SHOES_DATA.filter((s) => wishlistIds.includes(s.id));
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] flex flex-col font-sans">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'Home' && !selectedBrand && !selectedCategory ? (
          <>
            {/* 3. Hero Section matching screenshot */}
            <HeroSection
              onShopNow={() => {
                setActiveTab('Shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreBrands={() => {
                const el = document.getElementById('top-brands-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectShoe={(shoe) => setSelectedShoe(shoe as Shoe)}
            />

            {/* 4. Top Brands */}
            <TopBrands
              selectedBrand={selectedBrand}
              onSelectBrand={handleSelectBrand}
              onViewAll={() => setActiveTab('Shop')}
            />

            {/* 5. Shop By Category */}
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* 6. Best Sellers Grid (5 cards) */}
            <BestSellers
              shoes={bestSellerShoes}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectShoe={(shoe) => setSelectedShoe(shoe)}
              onQuickAddToCart={handleQuickAddToCart}
              onViewAll={() => setActiveTab('Shop')}
            />

            {/* 7. Summer Sale Banner (40% OFF) */}
            <SummerSaleBanner
              onShopSale={() => {
                setActiveTab('Sale');
                showToast('Summer Sale Activated', 'Use promo code SOLEX40 at checkout for an extra 40% off!');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 8. Trust Value Props Badges (4 cards) */}
            <ValueProps />
          </>
        ) : (
          /* Catalog / Filtered Views for Shop, Men, Women, Kids, Sale, Brands */
          <CatalogView
            title={
              activeTab === 'Sale'
                ? 'Summer Sale • Up to 40% Off'
                : selectedBrand
                ? `${selectedBrand} Footwear Collection`
                : selectedCategory
                ? `${selectedCategory} Collection`
                : `${activeTab} Shoes`
            }
            subtitle={
              activeTab === 'Sale'
                ? 'Limited time pricing on select authentic sneakers and athletic footwear.'
                : '100% verified authentic branded footwear with express shipping.'
            }
            shoes={getTabFilteredShoes()}
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
            onSelectBrand={setSelectedBrand}
            onSelectCategory={setSelectedCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectShoe={(shoe) => setSelectedShoe(shoe)}
            onQuickAddToCart={handleQuickAddToCart}
            onBackToHome={() => {
              setActiveTab('Home');
              setSelectedBrand(null);
              setSelectedCategory(null);
            }}
          />
        )}
      </main>

      {/* 9. Footer matching screenshot */}
      <Footer
        onSelectCategory={(category) => {
          if (category === 'Sale') {
            setActiveTab('Sale');
          } else if (category) {
            setActiveTab('Shop');
            setSelectedCategory(category);
          } else {
            setActiveTab('Shop');
            setSelectedBrand(null);
            setSelectedCategory(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onShowNotice={(title, msg) => showToast(title, msg, 'info')}
      />

      {/* Slide-over & Modal Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistShoes={wishlistShoes}
        onRemoveFromWishlist={(id) => {
          setWishlistIds((prev) => prev.filter((item) => item !== id));
          showToast('Removed from Wishlist', 'Item removed.', 'info');
        }}
        onAddToCart={(shoe, size, color) => {
          handleAddToCart(shoe, size, color, 1);
          setWishlistIds((prev) => prev.filter((id) => id !== shoe.id));
        }}
      />

      <ProductModal
        shoe={selectedShoe}
        isOpen={!!selectedShoe}
        onClose={() => setSelectedShoe(null)}
        isWishlisted={selectedShoe ? wishlistIds.includes(selectedShoe.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectShoe={(shoe) => setSelectedShoe(shoe)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onShowNotice={(title, msg) => showToast(title, msg, 'info')}
      />

      {/* Toast Feedback notifications */}
      <ToastNotice toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
