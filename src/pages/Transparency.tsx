import React, { useState } from 'react';
import { batchDatabase, BatchRecord } from '../data/transparency';
import { brandLogo, officialCertificates, officialInfo } from '../data/products';
import { ShieldCheck, QrCode, FileText, CheckCircle2, Award, Download, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Transparency() {
  const [searchInput, setSearchInput] = useState("OF-2026-DC01");
  const [selectedBatch, setSelectedBatch] = useState<string>("OF-2026-DC01");

  const currentRecord: BatchRecord = batchDatabase[selectedBatch] || batchDatabase["OF-2026-DC01"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (batchDatabase[clean]) {
      setSelectedBatch(clean);
    } else {
      setSelectedBatch("OF-2026-DC01");
    }
  };

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* Header Banner */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest">
            <QrCode className="w-3.5 h-3.5 text-[#1F4B33]" />
            <span>ISO 9001:2015 & Halal Certified Transparency</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B] tracking-tight">
            Trace Your Jar's Provenance
          </h1>

          <p className="text-base sm:text-lg text-[#5E4D40] font-light leading-relaxed max-w-2xl mx-auto">
            Authenticity and food safety are our highest priorities. Inspect regional terroir, procurement dates, and laboratory parameters.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#826E5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. OF-2026-DC01"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white border border-[#DFCBB2] rounded-xs pl-10 pr-4 py-3 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] uppercase tracking-wider font-mono font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2A211B] hover:bg-[#B33A2E] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors"
            >
              Verify Batch
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-[#826E5F] pt-2">
            <span>Quick Select Batch:</span>
            {Object.keys(batchDatabase).map(b => (
              <button
                key={b}
                onClick={() => {
                  setSearchInput(b);
                  setSelectedBatch(b);
                }}
                className={`font-mono underline hover:text-[#2A211B] ${selectedBatch === b ? 'font-bold text-[#B33A2E]' : ''}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Batch Report Display */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#EBDAC4] p-8 md:p-12 shadow-sm relative overflow-hidden">
          
          {/* Certificate Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b-2 border-[#EBDAC4] gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#DFCBB2] p-0.5 bg-white shrink-0">
                <img src={brandLogo} alt="Seal" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#1F4B33]">
                  Standard of Authenticity • Certified Purity
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A211B]">
                  Batch Certificate of Chemical Purity
                </h2>
                <p className="text-xs text-[#826E5F]">
                  Halal & ISO 9001:2015 Compliant Laboratory Inspection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF2ED] text-[#1F4B33] text-xs font-bold rounded-full">
                <CheckCircle2 className="w-4 h-4" /> 100% Passed Safety Screening
              </span>
            </div>
          </div>

          {/* Product & Harvest Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-b border-[#F4EAD9] text-xs">
            <div>
              <p className="text-[#826E5F] uppercase tracking-wider text-[10px]">Product Identified</p>
              <p className="font-bold text-[#2A211B] text-sm mt-1">{currentRecord.productName}</p>
            </div>
            <div>
              <p className="text-[#826E5F] uppercase tracking-wider text-[10px]">Batch Number</p>
              <p className="font-mono font-bold text-[#2A211B] text-sm mt-1">{currentRecord.batchNo}</p>
            </div>
            <div>
              <p className="text-[#826E5F] uppercase tracking-wider text-[10px]">Harvest & Terroir Belt</p>
              <p className="font-semibold text-[#2A211B] text-sm mt-1">{currentRecord.harvestRegion}</p>
            </div>
          </div>

          {/* Laboratory Parameter Metrics */}
          <div className="py-8 border-b border-[#F4EAD9]">
            <h3 className="font-serif text-lg font-bold text-[#2A211B] mb-4">Chemical & Physical Verification</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4]">
                <span className="text-[#826E5F] text-[10px] uppercase font-bold tracking-wider">Natural ASTA Color</span>
                <p className="text-xl font-bold text-[#B33A2E] mt-1">{currentRecord.astaColourValue}</p>
                <p className="text-[11px] text-[#5E4D40] mt-1">Natural carotenoid score</p>
              </div>

              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4]">
                <span className="text-[#826E5F] text-[10px] uppercase font-bold tracking-wider">Capsaicin Heat Score</span>
                <p className="text-xl font-bold text-[#2A211B] mt-1">{currentRecord.capsaicinSHU}</p>
                <p className="text-[11px] text-[#5E4D40] mt-1">Scoville Heat Units</p>
              </div>

              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4]">
                <span className="text-[#826E5F] text-[10px] uppercase font-bold tracking-wider">Moisture Retention</span>
                <p className="text-xl font-bold text-[#1F4B33] mt-1">{currentRecord.moistureContent}</p>
                <p className="text-[11px] text-[#5E4D40] mt-1">Optimal aroma lock</p>
              </div>

              <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4]">
                <span className="text-[#826E5F] text-[10px] uppercase font-bold tracking-wider">Synthetic Red Dyes</span>
                <p className="text-xl font-bold text-[#1F4B33] mt-1">{currentRecord.pesticideScreening}</p>
                <p className="text-[11px] text-[#5E4D40] mt-1">0% Artificial Compounds</p>
              </div>
            </div>
          </div>

          {/* Inspector Commentary */}
          <div className="py-6 border-b border-[#F4EAD9] text-xs">
            <h4 className="font-bold text-[#2A211B] uppercase tracking-wider mb-2">Quality & Agronomy Inspection Log</h4>
            <p className="text-[#5E4D40] bg-[#FBF3E7] p-4 rounded-lg border border-[#EBDAC4] italic leading-relaxed">
              "{currentRecord.inspectorNotes}"
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#826E5F]">
              <Award className="w-4 h-4 text-[#1F4B33]" />
              <span>Certified under ISO 9001:2015 & PS:3733-2022 standards.</span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-[#DFCBB2] hover:border-[#2A211B] text-[#2A211B] font-bold uppercase tracking-wider text-[11px] rounded-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Print Certificate
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
