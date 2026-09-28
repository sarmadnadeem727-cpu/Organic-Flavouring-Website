// Draft: Pakistani food/spice shipping policy. Owner to review placeholders.
import React from 'react';
import { officialInfo } from '../data/products';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING, formatPKR } from '../config/store';
import { usePageMeta } from '../hooks/usePageMeta';
import { Truck } from 'lucide-react';

export default function Shipping() {
  usePageMeta({
    title: 'Shipping Policy',
    description: 'Nationwide delivery rates, dispatch timelines, and COD policies for Organic Flavouring in Pakistan.',
  });

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      <section className="bg-[#EFE7DA] border-b border-[#E5D7C5] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241A10]/10 text-[#241A10] text-xs font-bold uppercase tracking-widest">
            <Truck className="w-4 h-4 text-[#D9542F]" /> Nationwide Delivery
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#211D18]">
            Shipping Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4F46]">Dispatched directly from Lahore across Pakistan</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 text-xs sm:text-sm text-[#3E352F] leading-relaxed">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">1. Delivery Charges & Free Shipping</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Standard Nationwide Shipping:</strong> {formatPKR(STANDARD_SHIPPING)} flat rate across Pakistan.</li>
            <li><strong>Free Nationwide Shipping:</strong> Unlocked automatically on all retail orders of <strong>{formatPKR(FREE_SHIPPING_THRESHOLD)} or more</strong>.</li>
          </ul>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">2. Estimated Delivery Timelines</h2>
          <p>
            All spice orders are freshly packed and dispatched from our Lahore facility:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Lahore:</strong> 1 to 2 business days.</li>
            <li><strong>Major Urban Centers (Karachi, Islamabad, Rawalpindi, Faisalabad, Multan):</strong> 2 to 4 business days.</li>
            <li><strong>Rest of Pakistan & Rural Belts:</strong> 3 to 6 business days.</li>
          </ul>
          <p className="text-xs text-[#5A4F46] italic">
            *Delivery timelines may vary slightly during public holidays, severe weather, or high-volume courier seasons. [CONFIRM: courier cut-off times].
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">3. Order Tracking & Cash on Delivery (COD)</h2>
          <p>
            Once your order is handed over to our courier partner ([CONFIRM: courier partner]), you will receive an SMS or WhatsApp notification with your consignment tracking number.
          </p>
          <p>
            Please keep the exact cash amount ready for the rider upon delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
