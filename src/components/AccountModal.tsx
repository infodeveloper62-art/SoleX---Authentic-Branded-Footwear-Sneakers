import React from 'react';
import { X, User, Package, MapPin, Award, LogOut, CheckCircle2 } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowNotice: (title: string, msg: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onShowNotice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-left relative z-10 p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                AC
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Alex Carter</h3>
                <span className="text-[11px] text-orange-600 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" /> SoleX VIP Gold Member
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer">
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-[#f8f9fa] p-3 rounded-2xl border border-neutral-100">
              <span className="text-lg font-black text-neutral-900">4</span>
              <p className="text-[10px] text-neutral-500 font-medium mt-0.5">Orders</p>
            </div>
            <div className="bg-[#f8f9fa] p-3 rounded-2xl border border-neutral-100">
              <span className="text-lg font-black text-neutral-900">350</span>
              <p className="text-[10px] text-neutral-500 font-medium mt-0.5">SoleX Points</p>
            </div>
            <div className="bg-[#f8f9fa] p-3 rounded-2xl border border-neutral-100">
              <span className="text-lg font-black text-emerald-600">$40</span>
              <p className="text-[10px] text-neutral-500 font-medium mt-0.5">Available Credit</p>
            </div>
          </div>

          {/* Recent Orders in Transit */}
          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Active Shipment
            </h4>
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-neutral-800 shadow-xs">
                  <Package className="w-5 h-5 text-neutral-800" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Order #SLX-892401</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Out for delivery today
                  </p>
                </div>
              </div>
              <button
                onClick={() => onShowNotice('Tracking Info', 'Carrier: FedEx Priority. Tracking #FDX9920194. Estimated delivery: Today before 6 PM.')}
                className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
              >
                Track
              </button>
            </div>
          </div>

          {/* Account Options */}
          <div className="mt-5 space-y-1 text-xs">
            <button
              onClick={() => onShowNotice('Addresses', 'Default shipping address: 742 Evergreen Terrace, Springfield, OR 97477.')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 text-neutral-700 transition-colors text-left cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>Saved Shipping Addresses (2)</span>
            </button>
            <button
              onClick={() => onShowNotice('Account Settings', 'Profile details updated. Email notifications are set to ON.')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 text-neutral-700 transition-colors text-left cursor-pointer"
            >
              <User className="w-4 h-4 text-neutral-400" />
              <span>Personal Details & Preferences</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                onShowNotice('Signed Out', 'You have been signed out safely.');
                onClose();
              }}
              className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <span className="text-neutral-400 text-[11px]">Member since Jan 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};
