import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, Product, assets } from '../data/products';
import { useCart } from '../context/CartContext';
import CinematicHero from '../components/CinematicHero';
import { ShoppingBag, Check } from 'lucide-react';
import { HalalIcon, IsoIcon, FamilyOwnedIcon, DeliveryTruckIcon } from '../components/Illustrations';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onOpenCertModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Home({ onOpenCertModal, onOpenContactModal }: HomeProps) {
  const { addToCart } = useCart();
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const quoteRef = useRef<HTMLDivElement>(null);
  const trustRowRef = useRef<HTMLDivElement>(null);

  const crateRotations = [-3.5, 4.2, -2.8, 3.8, -4.5, 2.5, -3.0];

  const categoryTiles = [
    { id: 'Chilli', name: 'Chilli & Flakes', image: assets.powderMain, count: 'Pure Pod Harvest' },
    { id: 'Powders', name: 'Everyday Powders', image: assets.qualitySeal, count: 'Stone Ground Daily' },
    { id: 'Whole Spices', name: 'Whole Spices', image: assets.macroTexture, count: 'Single Origin Belts' },
    { id: 'Flour', name: 'Gram Flour (Besan)', image: assets.packagingRange, count: 'Double Sifted' }
  ];

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const defaultPack = product.packSizes[0];
    if (defaultPack.isBulk) return;
    addToCart({ ...product, price: defaultPack.price }, 1, defaultPack.size);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2200);
  };

  const getSpiceShadowClass = (category: string) => {
    switch (category) {
      case 'Chilli': return 'shadow-clay-tint';
      case 'Powders': return 'shadow-saffron-tint';
      case 'Whole Spices': return 'shadow-leaf-tint';
      case 'Flour': return 'shadow-saffron-tint';
      default: return 'shadow-clay-tint';
    }
  };

  // GSAP Animations: Word-by-Word quote scroll scrub, Trust icon materialize
  useEffect(() => {
    // 1. Word-by-Word Scroll Scrubbed Quote Reveal in Dark Section
    if (quoteRef.current) {
      const words = quoteRef.current.querySelectorAll('.quote-word');
      gsap.fromTo(
        words,
        { opacity: 0.2, y: 4 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 0.5
          }
        }
      );
    }

    // 3. Materializing Trust Row Icons (scale 0.8 + blur to sharp)
    if (trustRowRef.current) {
      const icons = trustRowRef.current.querySelectorAll('.trust-icon-box');
      gsap.fromTo(
        icons,
        { scale: 0.8, filter: 'blur(4px)', opacity: 0 },
        {
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: trustRowRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  const quoteText = "What started as a spice trading business in 1994 grew through nothing but trust — delivering unadulterated flavor from Pakistan’s fertile soils directly to family kitchens.";

  return (
    <div className="min-h-screen text-[#2A1F16] relative bg-texture-grain">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#241A10] text-[#FFF6E8] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-xs font-bold border border-[#D89A2E]"
          >
            <Check className="w-4 h-4 text-[#D89A2E]" /> Added {addedToast} to Cart!
          </motion.div>
        )}
      </AnimatePresence>


      {/* -------------------------------------------------------------------------- */}
      {/* 0. INTRO VIDEO BANNER (Top Section below Navbar)                          */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative w-full h-[40vh] min-h-[300px] bg-[#0E0904] overflow-hidden flex items-center justify-center">
        {/* Fallback text if video fails to render or is transparent */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#E8A33D] z-0 opacity-50 text-center px-4">
          <span className="text-sm tracking-widest uppercase">Video Loading...</span>
          <span className="text-xs mt-2 opacity-70">If it stays blank, please ensure IMG_0199.mp4 is encoded in H.264 (not HEVC)</span>
        </div>

        <video
          src="/IMG_0199.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover relative z-10"
          style={{ fetchPriority: 'high' } as any}
        />
        {/* Subtle gradient overlay to blend perfectly with the dark CinematicHero below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0E0904] to-transparent z-20 pointer-events-none" />
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 1. CINEMATIC HERO (Full Viewport, Letterbox Bars, Focus Pull Reveal)        */}
      {/* -------------------------------------------------------------------------- */}
      <CinematicHero 
        onOpenCertModal={onOpenCertModal} 
        onOpenContactModal={onOpenContactModal} 
      />

      {/* -------------------------------------------------------------------------- */}
      {/* 2. SHOP BY CATEGORY — 3D PERSPECTIVE FLIP & KEN-BURNS HOVER ZOOM          */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-4 border-b border-[#E5D7C5]">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B0472B]">Curated Spice Lines</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#241A10]">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {categoryTiles.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.id)}`}
              className="relative h-64 rounded-2xl overflow-hidden border-2 border-[#241A10] cursor-pointer group shadow-lg bg-[#241A10] block"
            >
              {/* Image with Slow Ken-Burns Zoom on Hover */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B140F] via-[#1B140F]/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F0C36B]">{cat.count}</span>
                <h3 className="font-display text-xl font-bold text-[#FFF6E8]">{cat.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9683F] group-hover:underline block pt-1">
                  Browse Category →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. SECOND SECTION — "THIS WEEK'S CRATE" (Single Dark Anchor #241A10)       */}
      {/* -------------------------------------------------------------------------- */}
      <section id="crate-section" className="bg-[#241A10] text-[#FFF6E8] py-24 border-t-2 border-[#1B140F] relative bg-texture-grain gpu-accelerate" style={{ contain: 'layout style paint' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D89A2E]">
              THIS WEEK'S CRATE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#FFF6E8]">
              Laid out the way it'd sit on our own counter.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {products.map((product, idx) => {
              const rotation = crateRotations[idx % crateRotations.length];
              const shadowClass = getSpiceShadowClass(product.category);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ 
                    y: -8, 
                    rotate: 0, 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 350, damping: 22 }
                  }}
                  style={{ rotate: `${rotation}deg` }}
                  className={`bg-[#1B140F] rounded-2xl border-2 border-[#4A1C10]/60 p-5 flex flex-col justify-between transition-colors duration-300 hover:border-[#B0472B] group cursor-pointer relative ${shadowClass}`}
                >
                  {/* Full Card Link Layer */}
                  <Link 
                    to={`/product/${product.id}`} 
                    className="absolute inset-0 z-10" 
                    aria-label={`View ${product.name}`} 
                  />

                  <div className="aspect-square bg-[#241A10] rounded-xl p-4 flex items-center justify-center relative overflow-hidden mb-4 border border-[#4A1C10]/40">
                    <div className="absolute inset-0 radial-glow-masala opacity-35 pointer-events-none" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 relative z-0 pointer-events-none"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#241A10] text-[#FFF6E8] border border-[#4A1C10]/60 z-20">
                      {product.category}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#FFF6E8] group-hover:text-[#D9683F] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#FFF6E8]/65 line-clamp-2 mt-1">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#4A1C10]/40 flex items-center justify-between relative z-20">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#FFF6E8]/50 block">From</span>
                        <span className="font-display font-black text-sm text-[#D9683F]">Rs. {product.startingPrice}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAdd(product, e);
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-[#B0472B] to-[#7E2F1C] hover:from-[#D9683F] hover:to-[#B0472B] text-white text-[10px] uppercase font-bold tracking-widest rounded transition-all shadow-md cursor-pointer relative z-30"
                      >
                        <ShoppingBag className="w-3 h-3 inline mr-1" /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. DARK SECTION WITH WORD-BY-WORD SCROLL SCRUBBED QUOTE REVEAL             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="py-24 bg-[#1B140F] text-[#FFF6E8] bg-texture-grain border-t border-[#241A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D89A2E]">
            OUR FOUNDING PHILOSOPHY
          </span>

          {/* Word-by-Word Scroll Scrubbed Text Reveal */}
          <div ref={quoteRef} className="font-display text-2xl sm:text-4xl leading-relaxed text-[#FFF6E8]">
            {quoteText.split(' ').map((word, i) => (
              <span key={i} className="quote-word inline-block mr-2.5 transition-opacity">
                {word}
              </span>
            ))}
          </div>

          {/* Materializing Trust Row Icons */}
          <div ref={trustRowRef} className="pt-8 border-t border-[#4A1C10]/50 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#FFF6E8]/80 font-bold">
            <div className="trust-icon-box flex items-center justify-center gap-2 p-3 bg-[#241A10] rounded-xl border border-[#4A1C10]/40">
              <HalalIcon className="w-5 h-5 shrink-0" />
              <span>Halal Certified</span>
            </div>
            <div className="trust-icon-box flex items-center justify-center gap-2 p-3 bg-[#241A10] rounded-xl border border-[#4A1C10]/40">
              <IsoIcon className="w-5 h-5 shrink-0" />
              <span>ISO 9001:2015</span>
            </div>
            <div className="trust-icon-box flex items-center justify-center gap-2 p-3 bg-[#241A10] rounded-xl border border-[#4A1C10]/40">
              <FamilyOwnedIcon className="w-5 h-5 shrink-0" />
              <span>Est. 1994</span>
            </div>
            <div className="trust-icon-box flex items-center justify-center gap-2 p-3 bg-[#241A10] rounded-xl border border-[#4A1C10]/40">
              <DeliveryTruckIcon className="w-5 h-5 shrink-0" />
              <span>Nationwide COD</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
