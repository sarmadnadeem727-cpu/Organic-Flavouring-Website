import React, { useState } from 'react';
import { officialCertificates, products, brandLogo } from '../data/products';
import { ShieldCheck, FileCheck, Award, Eye, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Certifications() {
  const [modalCert, setModalCert] = useState<string | null>(null);

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* Header Banner */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest"
          >
            <Award className="w-3.5 h-3.5 text-[#1F4B33]" />
            <span>Verified International Compliance</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B] tracking-tight"
          >
            Certified Quality You Can Trust
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-[#5E4D40] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Every batch of spices we pack meets internationally recognized quality management and Pakistan Halal compliance standards.
          </motion.p>
        </div>
      </section>

      {/* Main Certificates Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Halal Certificate Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border border-[#EBDAC4] p-8 md:p-10 shadow-xs space-y-6 flex flex-col justify-between hover:border-[#1F4B33] transition-all group animate-shine"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#EAF2ED] text-[#1F4B33] text-xs font-bold uppercase tracking-wider rounded-full">
                  Pakistan Halal Standard
                </span>
                <span className="text-xs font-mono font-bold text-[#826E5F]">PS:3733-2022 (R)</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-[#2A211B]">
                Halal Certification
              </h2>

              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4] text-xs space-y-2 text-[#5E4D40]">
                <div><strong className="text-[#2A211B]">Certified By:</strong> Accredited Third-Party Halal Certification Body</div>
                <div><strong className="text-[#2A211B]">Scope:</strong> Packaging and Distribution of Spices</div>
                <div><strong className="text-[#2A211B]">Standards:</strong> OIC/SMIIC 1:2019 & Pakistan Halal Standard PS:3733-2022</div>
              </div>

              {/* Certified Products Table */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B5A4E] mb-2">
                  Certified Product Line:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] rounded-xs border border-[#F4EAD9]">
                      <span className="font-semibold text-[#2A211B]">{p.name}</span>
                      <span className="text-[#1F4B33] font-bold text-[10px] uppercase">100% Halal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F4EAD9] flex items-center justify-between">
              <span className="text-xs text-[#826E5F]">
                100% Pure Shariah Compliant
              </span>
              <button
                onClick={() => setModalCert('halal')}
                className="px-5 py-2.5 bg-[#1F4B33] hover:bg-[#153423] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> View Certificate Details
              </button>
            </div>
          </motion.div>

          {/* ISO 9001:2015 Certificate Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border border-[#EBDAC4] p-8 md:p-10 shadow-xs space-y-6 flex flex-col justify-between hover:border-[#1F4B33] transition-all group animate-shine"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#EAF2ED] text-[#1F4B33] text-xs font-bold uppercase tracking-wider rounded-full">
                  Quality Management System
                </span>
                <span className="text-xs font-mono font-bold text-[#826E5F]">ISO 9001:2015</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-[#2A211B]">
                ISO 9001:2015 Certification
              </h2>

              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4] text-xs space-y-2 text-[#5E4D40]">
                <div><strong className="text-[#2A211B]">Certified By:</strong> Accredited Third-Party Certification Body</div>
                <div><strong className="text-[#2A211B]">Certification Scope:</strong> Packaging and Distribution of Spices</div>
                <div><strong className="text-[#2A211B]">Facility Location:</strong> Lahore, Pakistan</div>
              </div>

              <p className="text-xs text-[#5E4D40] leading-relaxed pt-2">
                This management system certification verifies that Organic Flavouring operates strict standard operating procedures for raw spice quality grading, contamination-free storage, moisture monitoring, and hygienic packaging.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F4EAD9] flex items-center justify-between">
              <span className="text-xs text-[#826E5F]">
                Internationally Accredited
              </span>
              <button
                onClick={() => setModalCert('iso')}
                className="px-5 py-2.5 bg-[#1F4B33] hover:bg-[#153423] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> View Certificate Details
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trust Quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="p-8 bg-[#F5E8D3] rounded-2xl border border-[#EBDAC4] space-y-3">
          <p className="font-serif text-xl sm:text-2xl text-[#2A211B] italic">
            "Every batch we pack meets internationally recognized quality and halal compliance standards — because your trust matters as much to us as it did in 1994."
          </p>
          <p className="text-xs font-bold text-[#826E5F] uppercase tracking-widest">— Organic Flavouring Quality Board</p>
        </div>
      </section>

      {/* Certificate Lightbox Modal (Protected Privacy View) */}
      {modalCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setModalCert(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white text-[#2A211B] rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-[#EBDAC4] z-10 overflow-hidden space-y-6"
          >
            <button
              onClick={() => setModalCert(null)}
              className="absolute top-4 right-4 p-2 text-[#826E5F] hover:text-[#2A211B] hover:bg-[#FBF3E7] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 border-b border-[#EBDAC4] pb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#1F4B33]">
                Accredited Certification
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2A211B]">
                {modalCert === 'halal' ? 'Halal Compliance Statement' : 'ISO 9001:2015 Quality Statement'}
              </h3>
            </div>

            <div className="p-6 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4] text-xs space-y-3">
              <div className="flex justify-between border-b border-[#EBDAC4] pb-2">
                <span className="text-[#826E5F]">Organization:</span>
                <span className="font-bold text-[#2A211B]">ORGANIC FLAVOURING</span>
              </div>
              <div className="flex justify-between border-b border-[#EBDAC4] pb-2">
                <span className="text-[#826E5F]">Location:</span>
                <span className="font-medium text-[#2A211B]">Lahore, Pakistan</span>
              </div>
              <div className="flex justify-between border-b border-[#EBDAC4] pb-2">
                <span className="text-[#826E5F]">Scope:</span>
                <span className="font-bold text-[#1F4B33]">Packaging and Distribution of Spices</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#826E5F]">Standard:</span>
                <span className="font-medium text-[#2A211B]">{modalCert === 'halal' ? 'Pakistan Halal Standard PS:3733-2022 (R)' : 'ISO 9001:2015 Quality Management System'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModalCert(null)}
                className="px-6 py-2.5 bg-[#2A211B] text-white text-xs uppercase font-bold tracking-wider rounded-xs"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
