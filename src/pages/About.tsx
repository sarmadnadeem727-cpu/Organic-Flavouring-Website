import { motion } from 'motion/react';
import { assets, brandLogo, terroirRegions } from '../data/products';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* 1. Header Banner */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest">
            <img src={brandLogo} alt="Logo" className="w-4 h-4 rounded-full object-cover" />
            <span>Serving You the Natural Twist • Since 1994</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#2A211B] tracking-tight leading-tight">
            Our Heritage
          </h1>

          <p className="text-base sm:text-lg text-[#5E4D40] font-light leading-relaxed max-w-2xl mx-auto">
            Premium Spices Since 1994 — Built on honesty, consistency, and community trust.
          </p>
        </div>
      </section>

      {/* 2. The Full Story Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#5E4D40] leading-relaxed text-sm sm:text-base">
        <p>
          Organic Flavouring is built on a family legacy that began in 1994. What started as a small spice trading business grew steadily through honesty, consistency, and strong relationships within the community. For decades, our family supplied premium spices in bulk quantities to wholesalers, retailers, food manufacturers, and traders across Pakistan. We never relied on large advertising campaigns. Instead, our reputation was built through word of mouth, trust, and long-term customer relationships.
        </p>
        <p>
          As generations passed, our business expanded, serving customers who valued quality, authenticity, and reliable sourcing. Through years of experience, we developed deep knowledge of spice varieties, sourcing regions, quality selection, and market dynamics.
        </p>
        <p>
          Today, while the world has become increasingly digital, our core values remain unchanged. To continue our family's tradition and make our products accessible to a wider audience, we launched Organic Flavouring, a modern online brand dedicated to bringing premium spices directly to homes, restaurants, and food enthusiasts across Pakistan.
        </p>
        <p>
          At Organic Flavouring, we believe great food begins with genuine ingredients. Our mission is to combine over three decades of family expertise with modern convenience, ensuring customers receive premium-quality spices they can trust.
        </p>
        <p>
          From our family's spice business established in 1994 to a growing digital brand, Organic Flavouring continues to serve the same promise: quality, authenticity, and a natural twist in every pack.
        </p>
      </section>

      {/* 3. Animated Heritage Timeline (1994 -> Today) */}
      <section className="py-24 bg-[#F5E8D3] border-y border-[#EBDAC4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B33A2E]">Generational Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A211B]">1994 → Today</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B33A2E]">1994</span>
              <h3 className="font-bold text-sm text-[#2A211B]">Foundation</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Family spice trading business founded on honesty, consistency, and community trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#D8A72E]">Growth Years</span>
              <h3 className="font-bold text-sm text-[#2A211B]">Bulk Supply Expansion</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Expanded bulk supply (20kg/40kg) to wholesalers, retailers, and food manufacturers across Pakistan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#1F4B33]">Reputation Built</span>
              <h3 className="font-bold text-sm text-[#2A211B]">Word of Mouth</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Built enduring market reputation through authentic sourcing and zero adulteration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B33A2E]">Today</span>
              <h3 className="font-bold text-sm text-[#2A211B]">Digital Brand Launch</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Launch of Organic Flavouring online store serving households, chefs, and restaurants nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission Statement Block */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="font-serif text-3xl sm:text-4xl text-[#B33A2E] italic leading-snug">
          "Great food begins with genuine ingredients."
        </blockquote>
        <p className="text-xs font-bold uppercase tracking-widest text-[#826E5F] mt-4">
          — The Organic Flavouring Family Mission
        </p>
      </section>

      {/* 5. Values Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-2 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2A211B]">Quality</h3>
            <p className="text-xs text-[#6B5A4E]">Careful grading and zero artificial additives in every pack.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-2 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2A211B]">Authenticity</h3>
            <p className="text-xs text-[#6B5A4E]">Single-origin regional varieties preserved with natural aroma.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-2 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2A211B]">Trust</h3>
            <p className="text-xs text-[#6B5A4E]">Over 30 years of honest customer and community relationships.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#EBDAC4] shadow-xs space-y-2 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2A211B]">Natural Twist</h3>
            <p className="text-xs text-[#6B5A4E]">Hygienic modern packaging bringing purity to every kitchen.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
