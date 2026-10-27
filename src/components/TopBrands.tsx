import React from 'react';
import { BrandIcons } from './BrandLogos';
import { Shoe } from '../types';

interface TopBrandsProps {
  selectedBrand: string | null;
  onSelectBrand: (brand: Shoe['brand'] | null) => void;
  onViewAll: () => void;
}

export const TopBrands: React.FC<TopBrandsProps> = ({
  selectedBrand,
  onSelectBrand,
  onViewAll,
}) => {
  const brands: { name: Shoe['brand']; component: React.ReactNode }[] = [
    { name: 'Nike', component: <BrandIcons.Nike /> },
    { name: 'Adidas', component: <BrandIcons.Adidas /> },
    { name: 'Puma', component: <BrandIcons.Puma /> },
    { name: 'New Balance', component: <BrandIcons.NewBalance /> },
    { name: 'Converse', component: <BrandIcons.Converse /> },
    { name: 'Vans', component: <BrandIcons.Vans /> },
  ];

  return (
    <section id="top-brands-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 border-b border-neutral-100">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Label */}
        <div className="shrink-0">
          <span className="text-xs font-bold tracking-[0.15em] text-neutral-800 uppercase">
            TOP BRANDS
          </span>
        </div>

        {/* Brands logos row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-14 text-neutral-700">
          {brands.map(({ name, component }) => {
            const isSelected = selectedBrand === name;
            return (
              <button
                key={name}
                onClick={() => onSelectBrand(isSelected ? null : name)}
                aria-label={`Filter by ${name}`}
                className={`transition-all duration-200 cursor-pointer flex items-center justify-center p-2 rounded-lg hover:text-black ${
                  isSelected
                    ? 'text-black scale-110 font-bold bg-neutral-100 shadow-xs px-3'
                    : 'text-neutral-600 hover:scale-105'
                }`}
              >
                {component}
              </button>
            );
          })}
        </div>

        {/* View all link */}
        <div className="shrink-0">
          <button
            onClick={onViewAll}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-medium cursor-pointer"
          >
            {selectedBrand ? 'Reset filter' : 'View all'}
          </button>
        </div>
      </div>
    </section>
  );
};
