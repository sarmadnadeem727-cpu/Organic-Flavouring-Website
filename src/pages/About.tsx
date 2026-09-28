import React from 'react';
import { brandLogo } from '../data/products';
import { Link } from 'react-router-dom';
import { PureBotanicalIcon, HalalIcon, IsoIcon, FamilyOwnedIcon } from '../components/Illustrations';

export default function About() {
  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2F4F24]/10 text-[#2F4F24] text-xs font-bold uppercase tracking-widest border border-[#2F4F24]/20">
            <PureBotanicalIcon className="w-4 h-4" />
            <span>Serving You the Natural Twist • Est. 2022</span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text- sm:text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight leading-tight">
            Our Heritage & Story
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            Homegrown business established in 2022 - Organic Flavouring is your premium local spice store and health food shop for pure, freshly packed spices.
          </p>
        </div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#5A4F46] leading-relaxed text-sm sm:text-base">
        <div className="flex items-baseline gap-4">
          <span className="font-serif-heading text-3xl sm:text- font-black text-[#D9542F] leading-none shrink-0">2022</span>
          <p className="font-serif-heading text-xl text-[#211D18]">
            Organic Flavouring is your premium local spice store and health food shop.
          </p>
        </div>

        <p>
          We have provided high-quality whole spices, ground masalas and natural cooking ingredients to give your meals a healthy taste.
        </p>
        <div className="space-y-2 pt-4">
          <h3 className="font-bold text-[#211D18] text-lg">Our Specialties Include:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Chilli & Spices:</strong> Red Chilli Powder (Laal / Kashmiri Mirch), Red Chilli Flakes (Dadar Mirch)</li>
            <li><strong>Herbs & Roots:</strong> Garlic Powder (Lehsan), Ginger Powder (Adrak), Turmeric (Haldi / Sabat Haldi)</li>
            <li><strong>Whole Spices:</strong> Coriander Whole (Sukha Dhaniya), Garam Masala, Black Pepper (Kali Mirch), Cumin Seeds (Zeera)</li>
            <li><strong>Flours:</strong> Gram Flour (Besan / Daal Chana) & Corn Flour (Makki Atta)</li>
          </ul>
        </div>
        <p className="pt-4 font-bold text-[#D9542F]">
          Serving you the Natural Twist.
        </p>
      </section>

      {/* 4. Full Width Editorial Pull-Quote */}
      <section className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
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
            <p className="text-xs text-[#5A4F46]">Homegrown business built on honest customer relationships.</p>
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
