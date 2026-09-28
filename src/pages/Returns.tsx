// Draft: Pakistani food/spice return & refund policy. Owner to review placeholders.
import React from 'react';
import { officialInfo } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { RefreshCw } from 'lucide-react';

export default function Returns() {
  usePageMeta({
    title: 'Returns & Refund Policy',
    description: 'Fair, transparent return and replacement policies for Organic Flavouring spices in Pakistan.',
  });

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      <section className="bg-[#EFE7DA] border-b border-[#E5D7C5] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241A10]/10 text-[#241A10] text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-4 h-4 text-[#D9542F]" /> Quality Guarantee
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#211D18]">
            Returns & Refunds
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4F46]">Customer satisfaction and purity guarantee</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 text-xs sm:text-sm text-[#3E352F] leading-relaxed">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">1. Damaged, Leaking, or Incorrect Items</h2>
          <p>
            We take pride in our hygienic packaging and secure shipping. In the unlikely event that your parcel arrives damaged, leaking, torn, or with an incorrect item:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Please notify us within <strong>[CONFIRM: return window, e.g. 48 to 72 hours]</strong> of delivery.</li>
            <li>Take a clear photo or short video of the parcel and damaged product.</li>
            <li>Send it to our WhatsApp support at <strong>{officialInfo.phone}</strong> with your Order ID.</li>
          </ul>
          <p>
            We will immediately dispatch a <strong>free replacement</strong> at zero additional charge, or issue a full refund via bank transfer / mobile wallet (Easypaisa / JazzCash) [CONFIRM: refund method].
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">2. Perishable Food Safety & Change of Mind</h2>
          <p>
            Because spices and food seasonings are consumable edible products with strict food safety guidelines, <strong>we cannot accept returns or exchanges for opened pouches or jars due to change of mind</strong> once the seal has been broken.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">3. How to Reach Customer Care</h2>
          <p>
            Our customer desk is located in Lahore and available Monday to Saturday:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>WhatsApp / Phone:</strong> {officialInfo.phone}</li>
            <li><strong>Email:</strong> {officialInfo.email}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
