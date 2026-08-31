import React, { useState } from 'react';
import { products } from '../data/products';
import { Eye, X } from 'lucide-react';
import { motion } from 'motion/react';
import { HalalIcon, IsoIcon, PureBotanicalIcon } from '../components/Illustrations';

export default function Certifications() {
  const [modalCert, setModalCert] = useState<string | null>(null);

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* Header Banner */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2F4F24]/10 text-[#2F4F24] text-xs font-bold uppercase tracking-widest border border-[#2F4F24]/20">
            <PureBotanicalIcon className="w-4 h-4" />
            <span>Accredited Quality Standards</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight">
            Certifications & Standards
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            Every batch of spices we pack meets internationally recognized quality management and Pakistan Halal compliance standards.
          </p>
        </div>
      </section>

      {/* Main Certificates Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Halal Certificate Card */}
          <div className="bg-white rounded-2xl border-2 border-[#211D18] p-8 md:p-10 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2F4F24] text-[#FBF8F2] text-[10px] font-bold uppercase tracking-widest rounded">
                  Pakistan Halal Standard
                </span>
                <span className="text-xs font-mono font-bold text-[#5A4F46]">PS:3733-2022 (R)</span>
              </div>

              <div className="flex items-center gap-4">
                <HalalIcon className="w-10 h-10 shrink-0" />
                <h2 className="font-serif-heading text-3xl font-bold text-[#211D18]">
                  Halal Certification
                </h2>
              </div>

              <div className="p-4 bg-[#FBF8F2] rounded-xl border border-[#E5D7C5] text-xs space-y-2 text-[#5A4F46]">
                <div><strong className="text-[#211D18]">Certified By:</strong> Accredited Third-Party Halal Certification Body</div>
                <div><strong className="text-[#211D18]">Scope:</strong> Packaging and Distribution of Spices</div>
                <div><strong className="text-[#211D18]">Standards:</strong> OIC/SMIIC 1:2019 & PS:3733-2022</div>
              </div>

              <div className="pt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5A4F46] mb-2">
                  Certified Product Line:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#FBF8F2] rounded border border-[#E5D7C5]">
                      <span className="font-bold text-[#211D18]">{p.name}</span>
                      <span className="text-[#2F4F24] font-bold text-[9px] uppercase tracking-wider">100% Halal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5D7C5] flex items-center justify-between">
              <span className="text-xs text-[#5A4F46]">
                100% Pure Shariah Compliant
              </span>
              <button
                onClick={() => setModalCert('halal')}
                className="btn-primary-custom text-[11px] py-2 px-4"
              >
                <Eye className="w-3.5 h-3.5" /> View Details
              </button>
            </div>
          </div>

          {/* ISO 9001:2015 Certificate Card */}
          <div className="bg-white rounded-2xl border-2 border-[#211D18] p-8 md:p-10 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2F4F24] text-[#FBF8F2] text-[10px] font-bold uppercase tracking-widest rounded">
                  Quality Management System
                </span>
                <span className="text-xs font-mono font-bold text-[#5A4F46]">ISO 9001:2015</span>
              </div>

              <div className="flex items-center gap-4">
                <IsoIcon className="w-10 h-10 shrink-0" />
                <h2 className="font-serif-heading text-3xl font-bold text-[#211D18]">
                  ISO 9001:2015 Certification
                </h2>
              </div>

              <div className="p-4 bg-[#FBF8F2] rounded-xl border border-[#E5D7C5] text-xs space-y-2 text-[#5A4F46]">
                <div><strong className="text-[#211D18]">Certified By:</strong> Accredited Third-Party Body</div>
                <div><strong className="text-[#211D18]">Scope:</strong> Packaging & Distribution of Spices</div>
                <div><strong className="text-[#211D18]">Facility Location:</strong> Lahore, Pakistan</div>
              </div>

              <p className="text-xs text-[#5A4F46] leading-relaxed pt-2">
                This quality system certification verifies that Organic Flavouring operates standard operating procedures for raw spice quality grading, contamination-free storage, moisture monitoring, and hygienic packaging.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5D7C5] flex items-center justify-between">
              <span className="text-xs text-[#5A4F46]">
                Internationally Accredited
              </span>
              <button
                onClick={() => setModalCert('iso')}
                className="btn-primary-custom text-[11px] py-2 px-4"
              >
                <Eye className="w-3.5 h-3.5" /> View Details
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Mandatory Dark Deep-Green Contrast Section (#2F4F24) */}
      <section className="mt-20 py-16 bg-[#2F4F24] text-[#FBF8F2] bg-grain-dark border-t-2 border-[#C79A46]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <blockquote className="font-serif-heading text-xl sm:text-2xl text-[#FBF8F2]">
            “Every batch we pack meets quality and halal compliance standards — because your trust matters as much to us as it did in 1994.”
          </blockquote>
          <p className="text-xs font-bold text-[#C79A46] uppercase tracking-widest">— Organic Flavouring Quality Board</p>
        </div>
      </section>

      {/* Details Lightbox Modal */}
      {modalCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setModalCert(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white text-[#211D18] rounded-2xl max-w-lg w-full p-8 shadow-2xl border-2 border-[#211D18] z-10 space-y-6"
          >
            <button
              onClick={() => setModalCert(null)}
              className="absolute top-4 right-4 p-2 text-[#5A4F46] hover:text-[#211D18] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 border-b border-[#E5D7C5] pb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2F4F24]">
                Accredited Certification
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[#211D18]">
                {modalCert === 'halal' ? 'Halal Compliance Statement' : 'ISO 9001:2015 Quality Statement'}
              </h3>
            </div>

            <div className="p-4 bg-[#FBF8F2] rounded-xl border border-[#E5D7C5] text-xs space-y-3 text-[#5A4F46]">
              <div className="flex justify-between border-b border-[#E5D7C5] pb-2">
                <span>Organization:</span>
                <span className="font-bold text-[#211D18]">ORGANIC FLAVOURING</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D7C5] pb-2">
                <span>Location:</span>
                <span className="font-medium text-[#211D18]">Lahore, Pakistan</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D7C5] pb-2">
                <span>Scope:</span>
                <span className="font-bold text-[#2F4F24]">Packaging & Distribution of Spices</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setModalCert(null)}
                className="btn-primary-custom text-xs py-2 px-6"
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
