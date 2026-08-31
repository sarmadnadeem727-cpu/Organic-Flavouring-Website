import React from 'react';
import { brandLogo } from '../data/products';
import { Link } from 'react-router-dom';
import { PureBotanicalIcon, HalalIcon, IsoIcon, FamilyOwnedIcon } from '../components/Illustrations';

export default function About() {
  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2F4F24]/10 text-[#2F4F24] text-xs font-bold uppercase tracking-widest border border-[#2F4F24]/20">
            <PureBotanicalIcon className="w-4 h-4" />
            <span>Serving You the Natural Twist • Est. 1994</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight leading-tight">
            Our Heritage & Story
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            Over three decades of Pakistani spice mastery — built on honesty, consistency, and unyielding botanical purity.
          </p>
        </div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#5A4F46] leading-relaxed text-sm sm:text-base">
        <div className="flex items-baseline gap-4">
          <span className="font-serif-heading text-6xl font-black text-[#D9542F] leading-none shrink-0">1994</span>
          <p className="font-serif-heading text-xl text-[#211D18]">
            Organic Flavouring is built on a family legacy established in 1994.
          </p>
        </div>

        <p>
          What began as a small spice trading business in 1994 grew steadily through honesty, consistency, and strong relationships within the community. For decades, our family supplied premium spices in bulk quantities to wholesalers, retailers, food manufacturers, and culinary artisans across Pakistan. We never relied on loud marketing campaigns; our reputation was earned through word of mouth, unadulterated flavor, and long-term customer trust.
        </p>
        <p>
          As generations passed, our business expanded while serving customers who valued genuine quality and reliable sourcing. Through years of hands-on experience, we developed deep mastery of regional Pakistani spice varieties, harvest selections, stone-milling techniques, and quality preservation.
        </p>
        <p>
          To make our products directly accessible nationwide, we launched Organic Flavouring — an online store dedicated to bringing pure, hygienically packed single-origin spices straight from prime harvest belts to your home.
        </p>
      </section>

      {/* 3. Mandatory Dark Deep-Green Contrast Section (#2F4F24) */}
      <section className="py-20 bg-[#2F4F24] text-[#FBF8F2] bg-grain-dark border-y-2 border-[#C79A46]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C79A46]">Our Generational Timeline</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF8F2]">From 1994 to Today</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#24401c]/80 p-6 rounded-xl border border-[#C79A46]/20 space-y-3">
              <span className="font-serif-heading text-3xl font-black text-[#C79A46]">1994</span>
              <h3 className="font-serif-heading font-bold text-sm text-[#FBF8F2]">Foundation</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">Family spice trading business founded on honesty, consistency, and community trust.</p>
            </div>

            <div className="bg-[#24401c]/80 p-6 rounded-xl border border-[#C79A46]/20 space-y-3">
              <span className="font-serif-heading text-3xl font-black text-[#6FAE3E]">Growth</span>
              <h3 className="font-serif-heading font-bold text-sm text-[#FBF8F2]">Bulk Sacks Expansion</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">Expanded bulk supply (20kg/40kg) to wholesalers and retailers across Pakistan.</p>
            </div>

            <div className="bg-[#24401c]/80 p-6 rounded-xl border border-[#C79A46]/20 space-y-3">
              <span className="font-serif-heading text-3xl font-black text-[#D9542F]">Mastery</span>
              <h3 className="font-serif-heading font-bold text-sm text-[#FBF8F2]">Purity Standards</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">Built an enduring market reputation through authentic sourcing and zero adulteration.</p>
            </div>

            <div className="bg-[#24401c]/80 p-6 rounded-xl border border-[#C79A46]/20 space-y-3">
              <span className="font-serif-heading text-3xl font-black text-[#C79A46]">Today</span>
              <h3 className="font-serif-heading font-bold text-sm text-[#FBF8F2]">Online Store Launch</h3>
              <p className="text-xs text-[#FBF8F2]/75 leading-relaxed">Direct nationwide consumer delivery of certified pure spices in sealed retail packs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Width Editorial Pull-Quote */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <blockquote className="font-serif-heading text-3xl sm:text-4xl text-[#D9542F] leading-snug">
          “Great food begins with genuine ingredients.”
        </blockquote>
        <p className="text-xs font-bold uppercase tracking-widest text-[#5A4F46]">
          — The Organic Flavouring Family Mission
        </p>
      </section>

      {/* 5. Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5D7C5] space-y-2 text-center">
            <HalalIcon className="w-8 h-8 mx-auto" />
            <h3 className="font-serif-heading text-lg font-bold text-[#211D18]">Purity</h3>
            <p className="text-xs text-[#5A4F46]">Careful grading and zero artificial additives in every pack.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5D7C5] space-y-2 text-center">
            <PureBotanicalIcon className="w-8 h-8 mx-auto text-[#6FAE3E]" />
            <h3 className="font-serif-heading text-lg font-bold text-[#211D18]">Authenticity</h3>
            <p className="text-xs text-[#5A4F46]">Single-origin regional varieties preserved with natural aroma.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5D7C5] space-y-2 text-center">
            <FamilyOwnedIcon className="w-8 h-8 mx-auto" />
            <h3 className="font-serif-heading text-lg font-bold text-[#211D18]">Trust</h3>
            <p className="text-xs text-[#5A4F46]">Over 30 years of honest customer and community relationships.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5D7C5] space-y-2 text-center">
            <IsoIcon className="w-8 h-8 mx-auto" />
            <h3 className="font-serif-heading text-lg font-bold text-[#211D18]">Natural Twist</h3>
            <p className="text-xs text-[#5A4F46]">Hygienic modern packaging bringing purity to every kitchen.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
