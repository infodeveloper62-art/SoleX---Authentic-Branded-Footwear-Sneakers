import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SummerSaleBannerProps {
  onShopSale: () => void;
}

export const SummerSaleBanner: React.FC<SummerSaleBannerProps> = ({ onShopSale }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-[28px] bg-gradient-to-r from-[#121316] via-[#16171b] to-[#0e0f11] overflow-hidden p-8 sm:p-12 lg:p-14 shadow-xl border border-neutral-800/80">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
              LIMITED TIME ONLY
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mt-2 leading-[1.08]">
              Summer Sale
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 mt-3 font-normal max-w-sm">
              Up to 40% off on selected items
            </p>

            <button
              onClick={onShopSale}
              className="mt-7 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm inline-flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-md group cursor-pointer"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Center Graphic: Floating Shoe with "AURA FLUX" branding */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative group cursor-pointer" onClick={onShopSale}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/80 backdrop-blur-sm max-w-xs sm:max-w-sm transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
                  alt="Aura Flux Sneaker"
                  className="w-full h-44 sm:h-52 object-cover object-center filter saturate-125"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[9px] font-bold text-cyan-300 tracking-widest uppercase">
                  AURA • FLUX
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-semibold block">ELEVATE YOUR RUN</span>
                    <span className="text-xs font-bold text-white">Unleash Your Energy</span>
                  </div>
                  <span className="text-xs font-extrabold text-orange-400">-40%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Giant 40% OFF Typography matching screenshot */}
          <div className="lg:col-span-3 flex lg:justify-end items-baseline">
            <div className="flex items-baseline select-none">
              <span className="text-7xl sm:text-8xl lg:text-[110px] font-black text-white/95 tracking-tighter leading-none italic">
                40
              </span>
              <div className="flex flex-col ml-1 sm:ml-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white/90 leading-tight">
                  %
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl font-black text-white/80 tracking-widest leading-none">
                  OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
