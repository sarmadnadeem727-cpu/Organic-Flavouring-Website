// Draft: Pakistani food/spice e-commerce terms of service. Owner to review placeholders.
import React from 'react';
import { officialInfo } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  usePageMeta({
    title: 'Terms of Service',
    description: 'Terms and conditions for placing orders with Organic Flavouring in Pakistan.',
  });

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      <section className="bg-[#EFE7DA] border-b border-[#E5D7C5] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241A10]/10 text-[#241A10] text-xs font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4 text-[#D9542F]" /> Store Policies
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#211D18]">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4F46]">Last updated: September 2026 · Lahore, Pakistan</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 text-xs sm:text-sm text-[#3E352F] leading-relaxed">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">1. General Overview</h2>
          <p>
            This website is operated by <strong>Organic Flavouring</strong>, based in Lahore, Pakistan (Est. 2022). By visiting our site and/or purchasing pure spices from us, you agree to be bound by these terms, our <Link to="/privacy" className="text-[#D9542F] underline">Privacy Policy</Link>, and our <Link to="/returns" className="text-[#D9542F] underline">Returns Policy</Link>.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">2. Orders & Cash on Delivery (COD)</h2>
          <p>
            All consumer orders placed online are dispatched on a <strong>Cash on Delivery (COD)</strong> basis. Payment must be made in cash directly to the courier representative upon receipt of the parcel.
          </p>
          <p>
            We reserve the right to verify your contact information and confirm your order via phone call or WhatsApp message before dispatching from our Lahore warehouse. Orders with unreachable phone numbers or incomplete addresses may be cancelled.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">3. Product Pricing & Quality Guarantee</h2>
          <p>
            All prices are quoted in Pakistani Rupees (PKR) and are inclusive of standard domestic packing. We make every effort to display true natural colors and textures, but slight natural batch variations in sun-dried botanical agricultural harvests may occur.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">4. Contact & Support</h2>
          <p>
            For inquiries regarding orders, wholesale sacks, or policy terms, please contact us at:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>WhatsApp / Phone:</strong> {officialInfo.phone}</li>
            <li><strong>Email:</strong> {officialInfo.email}</li>
            <li><strong>Address:</strong> {officialInfo.address}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
