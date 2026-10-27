import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/shoesData';
import { Shoe } from '../types';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreBrands: () => void;
  onSelectShoe: (shoe: Partial<Shoe>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreBrands,
  onSelectShoe,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const slide = HERO_SLIDES[currentSlideIndex];

  // Auto-slide every 6 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[540px] rounded-[32px] overflow-hidden shadow-sm border border-neutral-200/60">
        {/* Left Col: Clean Light Grey Side */}
        <div className="lg:col-span-6 bg-[#f4f5f7] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-neutral-950 tracking-tight leading-[1.04]">
              Step Into <br />
              <span className="text-neutral-950">Greatness</span>
            </h1>

            <p className="mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-md font-normal">
              Discover authentic branded shoes for every step of your journey.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopNow}
                className="bg-neutral-950 hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full font-medium text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreBrands}
                className="border border-neutral-300 hover:border-neutral-400 bg-white/70 hover:bg-white text-neutral-800 px-7 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                Explore Brands
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Dark Angled Card Showcase */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 bg-[#161616] relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden min-h-[400px] lg:min-h-auto"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Perspective 3D Tilted Card Container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={() =>
              onSelectShoe({
                id: slide.id,
                name: slide.name,
                brand: slide.brand,
                price: slide.price,
                image: slide.image,
                category: 'Sneakers',
                gender: "Men's Shoes",
                rating: 4.9,
                reviewsCount: '3.8k',
                sizes: slide.sizes,
                description: slide.subtitle,
                colors: [slide.colorway],
              })
            }
            className="group relative cursor-pointer max-w-md w-full transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
            }}
          >
            {/* Tilted Photo Card */}
            <div className="relative transform -rotate-7 lg:-rotate-8 group-hover:-rotate-2 transition-transform duration-500 ease-out shadow-2xl rounded-2xl overflow-hidden border-4 border-white/10 bg-neutral-900">
              <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden relative">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover object-center filter saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating price badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white shadow-md">
                  ${slide.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Floating Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous slide"
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10 shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next slide"
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10 shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Right Badge Overlay exactly matching screenshot */}
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20">
            <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 rounded-xl px-4 py-2.5 shadow-xl text-right">
              <span className="block text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                {slide.tag}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5">
                {slide.name}
              </p>

              {/* Carousel Dots */}
              <div className="flex items-center justify-end gap-1.5 mt-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex
                        ? 'w-4 bg-white'
                        : 'w-1.5 bg-neutral-600 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
