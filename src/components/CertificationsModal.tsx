import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HalalIcon, IsoIcon, PureBotanicalIcon } from './Illustrations';
import { products } from '../data/products';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-[#FBF3E7] bg-powder-dust text-[#241D17] rounded-2xl max-w-xl w-full p-8 shadow-2xl border-2 border-[#241D17] z-10 overflow-hidden space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#5A4F46] hover:text-[#241D17] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 border-b border-[#E5D7C5] pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E2A1C] text-[#E0A020] text-[10px] uppercase font-bold tracking-widest">
              <PureBotanicalIcon className="w-3.5 h-3.5" /> Accredited Verification
            </div>
            <h3 className="font-serif-heading text-2xl font-bold text-[#241D17]">
              Certified Standards & Quality
            </h3>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#E5D7C5] space-y-2">
              <div className="flex items-center gap-2">
                <HalalIcon className="w-7 h-7" />
                <div>
                  <h4 className="font-serif-heading text-sm font-bold text-[#241D17]">Pakistan Halal Standard</h4>
                  <p className="text-[10px] font-mono text-[#5A4F46]">PS:3733-2022 (R)</p>
                </div>
              </div>
              <p className="text-[11px] text-[#5A4F46] leading-relaxed">
                Certified 100% botanical food consumption and Shariah-compliant packaging.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E5D7C5] space-y-2">
              <div className="flex items-center gap-2">
                <IsoIcon className="w-7 h-7" />
                <div>
                  <h4 className="font-serif-heading text-sm font-bold text-[#241D17]">ISO 9001:2015</h4>
                  <p className="text-[10px] font-mono text-[#5A4F46]">Quality Management System</p>
                </div>
              </div>
              <p className="text-[11px] text-[#5A4F46] leading-relaxed">
                Operates S.O.P. for raw spice quality grading, zero moisture adulteration, and hygienic sealing.
              </p>
            </div>
          </div>

          {/* Certified Line */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5A4F46] mb-2">
              Certified Pure Spice Products:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-1.5 p-2 bg-white rounded border border-[#E5D7C5] text-[11px]">
                  <Check className="w-3.5 h-3.5 text-[#6FAE3E]" />
                  <span className="truncate font-semibold">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#E5D7C5]">
            <button onClick={onClose} className="btn-primary-custom py-2 px-6 text-xs">
              Close Verification
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
