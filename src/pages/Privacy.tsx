// Draft: Pakistani food/spice privacy policy. Owner to review placeholders.
import React from 'react';
import { officialInfo } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { Lock } from 'lucide-react';

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy',
    description: 'Privacy practices and data handling policies for Organic Flavouring customers in Pakistan.',
  });

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      <section className="bg-[#EFE7DA] border-b border-[#E5D7C5] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241A10]/10 text-[#241A10] text-xs font-bold uppercase tracking-widest">
            <Lock className="w-4 h-4 text-[#D9542F]" /> Data Protection
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#211D18]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4F46]">Last updated: September 2026 · Lahore, Pakistan</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 text-xs sm:text-sm text-[#3E352F] leading-relaxed">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">1. Information We Collect</h2>
          <p>
            When you place an order for our spices via our website, we collect necessary personal details to process and fulfill your delivery:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Full Name</strong></li>
            <li><strong>Phone / Mobile Number</strong> (used for delivery coordination and WhatsApp updates)</li>
            <li><strong>Delivery Address & Nearest Landmark</strong></li>
            <li><strong>Email Address</strong> (optional, for receipt confirmation)</li>
          </ul>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to fulfill your physical delivery across Pakistan, confirm orders, prevent fraud, and communicate delivery status. <strong>We do not sell, rent, or trade your personal data to any third party.</strong>
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">3. Courier & Third-Party Sharing</h2>
          <p>
            We share only your name, phone number, and physical address with our licensed domestic courier partners ([CONFIRM: courier partner names, e.g. Trax, Leopard, Call Courier, PostEx]) for the sole purpose of delivering your parcel to your doorstep.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D7C5] shadow-xs space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">4. Contact Us</h2>
          <p>
            If you have questions regarding your personal details or wish to update your records, please reach out to us at <strong>{officialInfo.email}</strong> or on WhatsApp at <strong>{officialInfo.phone}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
