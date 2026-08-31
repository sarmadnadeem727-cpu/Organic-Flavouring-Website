import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { terroirRegions } from '../data/products';
import { MapPin, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PureBotanicalIcon, HalalIcon, IsoIcon } from '../components/Illustrations';

export default function Origin() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>(terroirRegions[0].id);

  const activeRegion = terroirRegions.find(r => r.id === selectedRegionId) || terroirRegions[0];

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* Hero Banner */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2F4F24]/10 text-[#2F4F24] text-xs font-bold uppercase tracking-widest border border-[#2F4F24]/20">
            <Compass className="w-4 h-4 text-[#D9542F]" />
            <span>Pakistani Harvest Terroirs</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight">
            Origin & Terroir
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            Organic Flavouring procures premium spice varieties from Pakistan's most celebrated agricultural harvest belts.
          </p>
        </div>
      </section>

      {/* Interactive Region Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D9542F]">Regional Discovery</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#211D18]">Pakistani Sourcing Belts</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border-2 border-[#211D18] shadow-lg">
          
          {/* Interactive Map Block */}
          <div className="lg:col-span-6 bg-[#FBF8F2] rounded-xl p-8 border border-[#E5D7C5] relative aspect-[4/3] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <Compass className="w-64 h-64 text-[#211D18]" />
            </div>

            {terroirRegions.map(r => {
              const isSelected = selectedRegionId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegionId(r.id)}
                  style={{ top: `${r.mapCoords.y}%`, left: `${r.mapCoords.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-10"
                >
                  <div className="relative flex items-center justify-center">
                    <div className={`p-2.5 rounded-full shadow-lg border-2 transition-all ${
                      isSelected 
                        ? 'bg-[#D9542F] text-white border-[#211D18] scale-125' 
                        : 'bg-white text-[#211D18] border-[#E5D7C5] group-hover:scale-110'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    <span className={`absolute top-full mt-1.5 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded transition-all ${
                      isSelected
                        ? 'bg-[#211D18] text-white'
                        : 'bg-white text-[#5A4F46] border border-[#E5D7C5]'
                    }`}>
                      {r.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Region Details Slide */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FBF8F2] border border-[#E5D7C5]">
                  <img
                    src={activeRegion.image}
                    alt={activeRegion.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#2F4F24] text-[#FBF8F2] text-[10px] font-bold uppercase tracking-widest rounded">
                      {activeRegion.heat}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-3xl font-bold text-[#211D18]">
                    {activeRegion.name}
                  </h3>

                  <p className="text-sm text-[#5A4F46] leading-relaxed font-serif-heading italic">
                    "{activeRegion.description}"
                  </p>

                  <div className="p-4 bg-[#FBF8F2] rounded-xl border border-[#E5D7C5] text-xs text-[#5A4F46]">
                    <strong className="text-[#211D18]">Soil & Micro-Climate:</strong> {activeRegion.soilAndClimate}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-xs font-bold text-[#5A4F46]">Available Products:</span>
                    {activeRegion.usedInProducts.map(pName => (
                      <Link
                        key={pName}
                        to="/shop"
                        className="px-3 py-1.5 bg-[#EFE7DA] text-[#211D18] hover:bg-[#D9542F] hover:text-white rounded text-xs font-bold transition-colors"
                      >
                        {pName} →
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Mandatory Dark Deep-Green Contrast Section (#2F4F24) */}
      <section className="mt-20 py-16 bg-[#2F4F24] text-[#FBF8F2] bg-grain-dark border-t-2 border-[#C79A46]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <PureBotanicalIcon className="w-12 h-12 text-[#C79A46] mx-auto" />
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF8F2]">
            Authentic Single-Origin Harvest Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#FBF8F2]/80 max-w-xl mx-auto leading-relaxed">
            Every harvest lot is sun dried on clean beds, stone ground, and tested to ensure volatile essential oil retention.
          </p>
          <div>
            <Link to="/shop" className="btn-secondary-dark">
              Explore All Single-Origin Products →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
