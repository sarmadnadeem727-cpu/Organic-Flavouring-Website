import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { officialInfo } from '../data/products';

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist on Organic Flavouring.',
  });

  return (
    <div className="min-h-[70vh] bg-[#FBF8F2] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="font-serif-heading text-6xl font-black text-[#D9542F] block">404</span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#211D18]">
          Spice Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#5A4F46] leading-relaxed">
          The page or product you requested may have moved or is no longer available. Explore our fresh spice catalog or message our team directly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#D9542F] hover:bg-[#B0472B] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Spice Shop
          </Link>
          <a
            href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20hit%20a%20broken%20link%20on%20your%20website`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Contact WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
