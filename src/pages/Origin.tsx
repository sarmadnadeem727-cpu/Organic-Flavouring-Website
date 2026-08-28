import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { terroirRegions } from '../data/products';
import { MapPin, ArrowRight, Flame, Sparkles, Eye, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Origin() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>(terroirRegions[0].id);

  const activeRegion = terroirRegions.find(r => r.id === selectedRegionId) || terroirRegions[0];

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* Hero Banner */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest"
          >
            <Compass className="w-3.5 h-3.5 text-[#B33A2E]" />
            <span>Interactive Terroir Explorer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B] tracking-tight"
          >
            Origin & Terroir
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg text-[#5E4D40] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Organic Flavouring sources premium chilli varieties from Pakistan's most renowned spice-growing regions.
          </motion.p>
        </div>
      </section>

      {/* Interactive Region Explorer Section (Stylized Map + Glowing Animated Pins) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D8A72E]">Guided Discovery</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A211B]">Click or Tap Any Sourcing Region</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#EBDAC4] shadow-sm">
          
          {/* Stylized Interactive Map Container */}
          <div className="lg:col-span-6 bg-[#FBF3E7] rounded-xl p-8 border border-[#EBDAC4] relative aspect-[4/3] flex items-center justify-center overflow-hidden">
            {/* Background Map Contours */}
            <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
              <Compass className="w-64 h-64 text-[#B33A2E]" />
            </div>

            {/* Region Pins */}
            {terroirRegions.map(r => {
              const isSelected = selectedRegionId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegionId(r.id)}
                  style={{ top: `${r.mapCoords.y}%`, left: `${r.mapCoords.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-10`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Glowing pulse ring */}
                    <span className={`absolute w-8 h-8 rounded-full transition-all ${
                      isSelected ? 'bg-[#B33A2E]/30 animate-ping' : 'bg-[#D8A72E]/20 group-hover:animate-ping'
                    }`} />
                    
                    {/* Pin button */}
                    <div className={`p-2.5 rounded-full shadow-lg border transition-all ${
                      isSelected 
                        ? 'bg-[#B33A2E] text-white border-white scale-125' 
                        : 'bg-white text-[#2A211B] border-[#DFCBB2] group-hover:scale-110'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Pin Tag */}
                    <span className={`absolute top-full mt-1.5 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded-xs transition-all shadow-xs ${
                      isSelected
                        ? 'bg-[#2A211B] text-white'
                        : 'bg-white text-[#5E4D40] border border-[#DFCBB2]'
                    }`}>
                      {r.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slide-In Detail Card for Active Region */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FBF3E7] border border-[#DFCBB2]">
                  <img
                    src={activeRegion.image}
                    alt={activeRegion.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#F5E8D3] text-[#B33A2E] text-xs font-bold uppercase tracking-wider rounded-full">
                      {activeRegion.heat}
                    </span>
                    <span className="text-xs font-semibold text-[#D8A72E] uppercase tracking-wider">
                      {activeRegion.tagline}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-[#2A211B]">
                    {activeRegion.name}
                  </h3>

                  <p className="text-sm text-[#5E4D40] leading-relaxed">
                    "{activeRegion.description}"
                  </p>

                  <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4] text-xs text-[#5E4D40]">
                    <strong className="text-[#2A211B]">Soil & Climate:</strong> {activeRegion.soilAndClimate}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-xs font-bold text-[#826E5F]">Used in:</span>
                    {activeRegion.usedInProducts.map(pName => (
                      <Link
                        key={pName}
                        to="/shop"
                        className="px-3 py-1.5 bg-[#EAF2ED] text-[#1F4B33] hover:bg-[#1F4B33] hover:text-white rounded-xs text-xs font-bold transition-colors"
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

      {/* Sourcing Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#1F4B33] text-white rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-md">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FBF3E7]">
            Experience Genuine Pakistani Terroir
          </h2>
          <p className="text-sm text-[#FBF3E7]/80 max-w-xl mx-auto">
            Every harvest lot is carefully procured, sun-dried on clean beds, and certified Halal and ISO 9001:2015 compliant.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#D8A72E] hover:bg-[#c29424] text-[#2A211B] text-xs uppercase tracking-widest font-bold rounded-xs transition-colors shadow-lg"
            >
              Shop Single-Origin Spices
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
