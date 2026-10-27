import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'men' | 'women'>('men');

  if (!isOpen) return null;

  const menSizes = [
    { us: '7.0', uk: '6.0', eu: '40.0', cm: '25.0' },
    { us: '7.5', uk: '6.5', eu: '40.5', cm: '25.5' },
    { us: '8.0', uk: '7.0', eu: '41.0', cm: '26.0' },
    { us: '8.5', uk: '7.5', eu: '42.0', cm: '26.5' },
    { us: '9.0', uk: '8.0', eu: '42.5', cm: '27.0' },
    { us: '9.5', uk: '8.5', eu: '43.0', cm: '27.5' },
    { us: '10.0', uk: '9.0', eu: '44.0', cm: '28.0' },
    { us: '10.5', uk: '9.5', eu: '44.5', cm: '28.5' },
    { us: '11.0', uk: '10.0', eu: '45.0', cm: '29.0' },
    { us: '11.5', uk: '10.5', eu: '45.5', cm: '29.5' },
    { us: '12.0', uk: '11.0', eu: '46.0', cm: '30.0' },
  ];

  const womenSizes = [
    { us: '5.5', uk: '3.0', eu: '36.0', cm: '22.5' },
    { us: '6.0', uk: '3.5', eu: '36.5', cm: '23.0' },
    { us: '6.5', uk: '4.0', eu: '37.5', cm: '23.5' },
    { us: '7.0', uk: '4.5', eu: '38.0', cm: '24.0' },
    { us: '7.5', uk: '5.0', eu: '38.5', cm: '24.5' },
    { us: '8.0', uk: '5.5', eu: '39.0', cm: '25.0' },
    { us: '8.5', uk: '6.0', eu: '40.0', cm: '25.5' },
    { us: '9.0', uk: '6.5', eu: '40.5', cm: '26.0' },
    { us: '9.5', uk: '7.0', eu: '41.0', cm: '26.5' },
    { us: '10.0', uk: '7.5', eu: '42.0', cm: '27.0' },
  ];

  const currentSizes = tab === 'men' ? menSizes : womenSizes;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden text-left relative z-10 p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-neutral-900" />
              <h3 className="text-base font-bold text-neutral-900">SoleX Footwear Size Chart</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer">
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Gender toggle */}
          <div className="flex bg-neutral-100 p-1 rounded-xl mt-4">
            <button
              onClick={() => setTab('men')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'men' ? 'bg-white text-black shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Men's Sizing
            </button>
            <button
              onClick={() => setTab('women')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === 'women' ? 'bg-white text-black shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Women's Sizing
            </button>
          </div>

          {/* Table */}
          <div className="mt-4 border border-neutral-100 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-center">
              <thead className="bg-[#f4f5f7] text-neutral-700 font-bold border-b border-neutral-200">
                <tr>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">CM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {currentSizes.map((row) => (
                  <tr key={row.us} className="hover:bg-neutral-50">
                    <td className="py-2 px-3 font-bold text-neutral-950">{row.us}</td>
                    <td className="py-2 px-3">{row.uk}</td>
                    <td className="py-2 px-3">{row.eu}</td>
                    <td className="py-2 px-3 text-neutral-500">{row.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-neutral-400 mt-4 text-center">
            Tip: If you're between sizes, we recommend sizing up half a size for athletic and running models.
          </p>
        </div>
      </div>
    </div>
  );
};
