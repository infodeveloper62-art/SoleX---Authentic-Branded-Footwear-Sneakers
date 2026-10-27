import React from 'react';

export const SoleXLogo: React.FC<{ className?: string; inverted?: boolean }> = ({ className = 'h-6', inverted = false }) => {
  return (
    <div className={`flex items-center select-none font-extrabold tracking-tight text-2xl ${className}`}>
      <span className={inverted ? 'text-white' : 'text-neutral-950'}>SOLE</span>
      <span className="relative text-orange-500 font-black ml-0.5 inline-block">
        X
        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-75"></span>
      </span>
    </div>
  );
};

export const BrandIcons = {
  Nike: () => (
    <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
      <path d="M21.707 5.293c-.27-.27-.678-.344-1.026-.187L2.43 13.33a.75.75 0 0 0 .152 1.411c4.544 1.157 8.358.558 11.666-1.83 2.128-1.536 4.398-4.225 7.459-7.618z" />
    </svg>
  ),
  Adidas: () => (
    <div className="flex flex-col items-center justify-center">
      <svg className="h-6 w-auto fill-current" viewBox="0 0 50 30">
        <path d="M12 25 L18 25 L10 13 L4 25 Z" />
        <path d="M24 25 L30 25 L18 7 L12 19 Z" />
        <path d="M36 25 L42 25 L26 1 L20 13 Z" />
      </svg>
      <span className="text-[9px] font-bold tracking-widest mt-0.5">ADIDAS</span>
    </div>
  ),
  Puma: () => (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-black tracking-widest">PUMA</span>
      <svg className="h-5 w-auto fill-current" viewBox="0 0 100 60">
        <path d="M85,15 C82,10 75,5 68,7 C62,9 58,15 52,18 C46,21 38,20 32,15 C26,10 22,12 15,18 C10,23 5,30 2,38 C-1,46 3,52 8,50 C14,48 18,41 23,37 C28,33 34,32 40,36 C46,40 54,42 62,38 C70,34 78,28 85,15 Z" />
      </svg>
    </div>
  ),
  NewBalance: () => (
    <div className="flex items-center gap-1 font-black italic tracking-tighter">
      <span className="text-base font-black italic">NB</span>
      <span className="text-[10px] not-italic tracking-normal font-bold">NEW BALANCE</span>
    </div>
  ),
  Converse: () => (
    <div className="flex items-center gap-1 font-bold tracking-wider">
      <span className="text-sm">★</span>
      <span className="text-xs font-extrabold tracking-widest">CONVERSE</span>
    </div>
  ),
  Vans: () => (
    <div className="flex flex-col items-center">
      <div className="text-xs font-black tracking-tighter border-b-2 border-current pb-0.5 leading-none">
        VANS
      </div>
      <span className="text-[7px] font-semibold tracking-wider mt-0.5">"OFF THE WALL"</span>
    </div>
  ),
};
