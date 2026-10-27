import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: <Truck className="w-5 h-5 text-neutral-800" />,
      title: 'Free Shipping',
      subtitle: 'On orders over $100',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-neutral-800" />,
      title: '30-Day Returns',
      subtitle: 'Hassle-free returns',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
      title: '100% Authentic',
      subtitle: 'Genuine branded products',
    },
    {
      icon: <Lock className="w-5 h-5 text-neutral-800" />,
      title: 'Secure Payments',
      subtitle: 'Safe & encrypted checkout',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {props.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex items-center gap-4 transition-all duration-200 hover:shadow-md hover:border-neutral-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f4f5f7] flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
