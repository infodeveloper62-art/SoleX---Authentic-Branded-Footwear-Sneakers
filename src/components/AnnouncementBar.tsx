import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      id: 1,
      badge: 'bg-emerald-400',
      text: 'Free shipping on all orders over $100',
      secondary: 'Easy 30-day returns',
    },
    {
      id: 2,
      badge: 'bg-amber-400',
      text: 'Summer Sale: Up to 40% OFF with code SOLEX40',
      secondary: 'Limited time offers',
    },
    {
      id: 3,
      badge: 'bg-cyan-400',
      text: '100% Authentic Branded Sneakers Guaranteed',
      secondary: 'Verified by SoleX specialists',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#0c0c0c] text-[#f5f5f5] text-xs py-2.5 px-4 border-b border-neutral-900 tracking-wide font-normal relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="text-neutral-500 hover:text-white p-0.5 transition-colors cursor-pointer"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-center gap-3 text-center transition-all duration-300">
          <span className="flex items-center gap-1.5 font-medium">
            <span className={`w-2 h-2 rounded-full ${current.badge} inline-block animate-pulse`}></span>
            <span>{current.text}</span>
          </span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-400 hidden sm:inline">{current.secondary}</span>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
          className="text-neutral-500 hover:text-white p-0.5 transition-colors cursor-pointer"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
