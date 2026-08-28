import React from 'react';
import { officialInfo } from '../data/products';
import { MapPin, Truck, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Stockists() {
  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B]">
            Dispatch & Delivery Network
          </h1>
          <p className="text-base text-[#5E4D40] max-w-xl mx-auto">
            Dispatched daily across Pakistan from our main packaging hub in Lahore.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-16">
        <div className="bg-white p-8 rounded-2xl border border-[#EBDAC4] shadow-xs space-y-4 text-center">
          <MapPin className="w-10 h-10 text-[#B33A2E] mx-auto" />
          <h2 className="font-serif text-2xl font-bold">{officialInfo.city}</h2>
          <p className="text-xs text-[#6B5A4E]">Nationwide Cash on Delivery (COD) & Raast Banking available.</p>
          <div className="pt-4">
            <Link to="/shop" className="px-6 py-2.5 bg-[#B33A2E] text-white text-xs uppercase font-bold tracking-wider rounded-xs">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
