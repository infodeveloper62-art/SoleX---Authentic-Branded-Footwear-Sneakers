import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#0c0c0c] text-[#f5f5f5] text-xs py-2 px-4 border-b border-neutral-900 tracking-wide font-normal">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-sm"></span>
          <span>Free shipping on all orders over $100</span>
        </span>
        <span className="text-neutral-500">|</span>
        <span className="text-neutral-300">Easy 30-day returns</span>
      </div>
    </div>
  );
};
