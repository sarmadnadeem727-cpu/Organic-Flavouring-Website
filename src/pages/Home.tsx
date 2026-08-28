import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  assets, 
  brandLogo, 
  products, 
  terroirRegions, 
  officialCertificates,
  Product 
} from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Sun, 
  ArrowRight, 
  Check, 
  ShoppingBag, 
  Award, 
  Clock, 
  MapPin, 
  ChevronDown, 
  PackageCheck,
  Sparkles,
  Truck,
  Flame,
  Star,
  Layers,
  Leaf
} from 'lucide-react';

export default function Home() {
  const { addToCart } = useCart();
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', name: 'All Spices', icon: Sparkles },
    { id: 'Chilli', name: 'Chilli & Flakes', icon: Flame },
    { id: 'Powders', name: 'Everyday Powders', icon: Layers },
    { id: 'Whole Spices', name: 'Whole Spices', icon: Sun },
    { id: 'Flour', name: 'Gram Flour (Besan)', icon: Leaf }
  ];

  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const defaultPack = product.packSizes[0];
    if (defaultPack.isBulk) return;
    addToCart({ ...product, price: defaultPack.price }, 1, defaultPack.size);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="bg-[#FFFBF5] text-[#2A2420] overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#3D6B2C] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-[#528f3a]"
          >
            <Check className="w-4 h-4 text-[#E8A63C]" /> Added {addedToast} to Cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 1. STORE HERO SECTION (Shopping-First Split Showcase) */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FFFBF5] border-b border-[#F0E6D8] overflow-hidden pt-6 pb-12">
        
        {/* Background Soft Glow & Rotating Watermark */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E8A63C]/15 blur-3xl animate-radial-glow" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#6FAE3E]/10 blur-3xl" />
          {/* Faint Logo Watermark */}
          <div className="absolute -top-16 -right-16 opacity-5 animate-watermark">
            <img src={brandLogo} alt="Watermark" className="w-[500px] h-[500px]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Shopping-outcome & Store CTAs) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Freshness Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6FAE3E]/15 border border-[#6FAE3E]/30 text-xs font-bold tracking-wide text-[#3D6B2C]">
                <span className="w-2 h-2 rounded-full bg-[#6FAE3E] animate-stock-pulse" />
                <span>🌿 Fresh Stock • Packed This Week</span>
              </div>

              {/* Shopping-outcome Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2A2420] tracking-tight leading-[1.1]">
                Pakistan’s <span className="text-[#D9542F]">Freshest Spices</span>, Delivered to Your Door.
              </h1>

              {/* Sub-line (Tagline supporting, not leading) */}
              <p className="text-sm sm:text-base text-[#6B5A4E] max-w-lg leading-relaxed">
                Serving You the Natural Twist! — Freshly procured from prime Pakistani harvest belts, stone-ground, and packed for peak aroma.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-[#D9542F] hover:bg-[#c24623] text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-all duration-200 flex items-center gap-2.5 shadow-lg shadow-[#D9542F]/25 animate-pulse-glow"
                >
                  <ShoppingBag className="w-4 h-4" /> Shop Now
                </Link>

                <a
                  href="#bestsellers"
                  className="px-7 py-4 bg-white hover:bg-[#6FAE3E]/10 text-[#3D6B2C] border-2 border-[#6FAE3E] text-xs uppercase tracking-wider font-bold rounded-lg transition-all duration-200"
                >
                  View Bestsellers
                </a>
              </div>

              {/* Trust Badge Row Directly Under CTAs */}
              <div className="pt-6 border-t border-[#F0E6D8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-bold text-[#5A4F46]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#6FAE3E]" /> Halal Certified
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#6FAE3E]" /> ISO 9001:2015
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D9542F]" /> Cash on Delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D9542F]" /> Fast Nationwide
                </div>
              </div>
            </motion.div>

            {/* Right: Dynamic Layered Product Showcase (Real Product Clusters) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]"
            >
              {/* Product 1: Background Left (Turmeric) */}
              <div className="absolute left-2 sm:left-6 top-8 w-44 sm:w-56 bg-white p-3 rounded-2xl border border-[#F0E6D8] shadow-md transform -rotate-6 animate-float-b z-10">
                <div className="aspect-square bg-[#FFFBF5] rounded-xl p-2 flex items-center justify-center">
                  <img src={assets.qualitySeal} alt="Turmeric" className="w-full h-full object-contain" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[11px] font-bold text-[#2A2420]">Pure Haldi</p>
                  <p className="text-[10px] font-extrabold text-[#D9542F]">Rs. 320</p>
                </div>
              </div>

              {/* Product 2: Background Right (Dhania / Range) */}
              <div className="absolute right-2 sm:right-6 top-12 w-44 sm:w-56 bg-white p-3 rounded-2xl border border-[#F0E6D8] shadow-md transform rotate-6 animate-float-c z-10">
                <div className="aspect-square bg-[#FFFBF5] rounded-xl p-2 flex items-center justify-center">
                  <img src={assets.packagingRange} alt="Coriander" className="w-full h-full object-contain" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[11px] font-bold text-[#2A2420]">Coriander Powder</p>
                  <p className="text-[10px] font-extrabold text-[#D9542F]">Rs. 280</p>
                </div>
              </div>

              {/* Product 3: FRONT HERO PRODUCT (Red Chilli Master Pack) */}
              <div className="relative w-56 sm:w-72 bg-white p-4 rounded-2xl border-2 border-[#E8A63C]/40 shadow-2xl animate-float-a z-20">
                {/* Bestseller Badge */}
                <div className="absolute -top-3 -right-3 bg-[#D9542F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#E8A63C]" /> Best Seller
                </div>

                <div className="aspect-square bg-[#FFFBF5] rounded-xl p-4 flex items-center justify-center overflow-hidden">
                  <img src={assets.powderMain} alt="Red Chilli Powder" className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#2A2420]">Red Chilli Powder</h3>
                    <p className="text-[10px] text-[#6FAE3E] font-bold">Sindh Sun-Dried</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-[#D9542F]">Rs. 380</span>
                  </div>
                </div>

                <Link
                  to="/product/red-chilli-powder-flakes"
                  className="mt-3 w-full py-2 bg-[#6FAE3E] hover:bg-[#5da02e] text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick View & Buy
                </Link>
              </div>

            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] font-bold text-[#8C7E72] animate-bounce">
          <ChevronDown className="w-4 h-4 text-[#D9542F]" /> Explore Products
        </div>
      </section>

      {/* 🌟 2. SHOP BY CATEGORY STRIP (Quick Tap Chips) */}
      <section className="py-8 bg-[#F8F2E8] border-b border-[#EDE2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-[#D9542F] text-white shadow-md scale-105' 
                      : 'bg-white text-[#5A4F46] border border-[#E5D7C5] hover:border-[#D9542F]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#6FAE3E]'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🌟 3. BESTSELLERS / FEATURED PRODUCTS (Direct E-Commerce Cards) */}
      <section id="bestsellers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-4 border-b border-[#F0E6D8]">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#D9542F]">Top Picks For Daily Cooking</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#2A2420]">
              Featured Spice Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#6FAE3E] hover:text-[#3D6B2C] transition-colors"
          >
            View All 7 Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE5D8] hover:border-[#D9542F] transition-all duration-300 flex flex-col group shadow-xs hover:shadow-xl relative"
            >
              {/* Stock status & Image */}
              <div className="relative bg-[#FFFBF5] aspect-square p-5 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-[#6FAE3E]/20 text-[#3D6B2C] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  In Stock
                </span>

                {/* Quick Add Slide-Up */}
                <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full py-2.5 bg-[#D9542F] hover:bg-[#c24623] text-white text-xs uppercase font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Quick Add (Rs. {product.startingPrice})
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-[#E8A63C] uppercase tracking-wider mb-1">
                  {product.category}
                </span>

                <h3 className="font-heading text-base font-bold text-[#2A2420] mb-1">
                  <Link to={`/product/${product.id}`} className="hover:text-[#D9542F] transition-colors">
                    {product.name}
                  </Link>
                </h3>

                <p className="text-xs text-[#6B5A4E] line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>

                <div className="mt-auto pt-3 border-t border-[#F5EDE2] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C7E72] block">Price from</span>
                    <span className="text-base font-heading font-extrabold text-[#D9542F]">Rs. {product.startingPrice}</span>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-3.5 py-1.5 bg-[#FFFBF5] hover:bg-[#6FAE3E] text-[#3D6B2C] hover:text-white border border-[#6FAE3E] text-[11px] font-bold rounded-lg transition-all"
                  >
                    View Sizes
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌟 4. WHY ORGANIC FLAVOURING STRIP (Hand + Leaf Motif Style) */}
      <section className="py-12 bg-[#F8F2E8] border-y border-[#EDE2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-[#6FAE3E]/20 text-[#3D6B2C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-extrabold text-[#2A2420]">Halal Certified</p>
                <p className="text-[11px] text-[#6B5A4E]">PS:3733-2022 Verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-[#6FAE3E]/20 text-[#3D6B2C] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-extrabold text-[#2A2420]">ISO 9001:2015</p>
                <p className="text-[11px] text-[#6B5A4E]">Hygienic Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-[#D9542F]/20 text-[#D9542F] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-extrabold text-[#2A2420]">Since 1994</p>
                <p className="text-[11px] text-[#6B5A4E]">30+ Years Mastery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-[#D9542F]/20 text-[#D9542F] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-extrabold text-[#2A2420]">Fast Delivery</p>
                <p className="text-[11px] text-[#6B5A4E]">Nationwide COD Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 5. DEALS / BUNDLE PROMO BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#D9542F] via-[#c94a26] to-[#3D6B2C] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Commercial & Wholesale Supplies
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-black">
              Need Bulk 20kg or 40kg Sacks?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg">
              We supply restaurants, hotels, caterers, and retailers across Pakistan with direct wholesale mandi pricing.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-[#D9542F] hover:bg-[#FFFBF5] text-xs uppercase font-black tracking-wider rounded-xl transition-all shadow-lg shrink-0"
          >
            Inquire Bulk Rates
          </Link>
        </div>
      </section>

      {/* 🌟 6. ORIGIN & TERROIR (Shortened Swipeable Sourcing Quality) */}
      <section className="py-16 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6FAE3E]">Single-Origin Quality</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2A2420]">
              Sourced From Pakistan’s Renowned Spice Belts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {terroirRegions.map(r => (
              <div key={r.id} className="bg-white p-4 rounded-xl border border-[#F0E6D8] flex flex-col justify-between shadow-xs">
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold text-[#D9542F] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {r.name}
                  </span>
                  <p className="text-xs text-[#6B5A4E] leading-relaxed">{r.description}</p>
                </div>
                <div className="pt-2 mt-2 border-t border-[#F8F2E8] text-[10px] font-bold text-[#3D6B2C]">
                  {r.heat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 7. OUR STORY (Moved Down as Supporting Trust Content) */}
      <section className="py-16 bg-[#F8F2E8] border-t border-[#EDE2D4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D9542F] p-0.5 bg-white mx-auto">
            <img src={brandLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9542F]">Family Heritage</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2A2420]">
            Over 30 Years of Spice Mastery (Since 1994)
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5A4E] max-w-2xl mx-auto leading-relaxed">
            What began in 1994 as a trusted bulk spice business has grown into an online direct-to-consumer store. We never cut corners with fillers or artificial dyes—delivering authentic Pakistani taste to every kitchen.
          </p>
          <div className="pt-2">
            <Link to="/about" className="text-xs font-bold text-[#3D6B2C] hover:underline">
              Read Our Full Story →
            </Link>
          </div>
        </div>
      </section>

      {/* 🌟 8. CERTIFICATIONS STRIP */}
      <section className="py-12 bg-[#FFFBF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-heading text-lg font-bold text-[#2A2420]">Certified by Accredited Quality Bodies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {officialCertificates.map(c => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-[#F0E6D8] shadow-xs text-left space-y-1 animate-shine">
                <span className="text-[10px] font-bold uppercase text-[#6FAE3E]">{c.badgeLabel}</span>
                <p className="font-heading font-bold text-sm text-[#2A2420]">{c.title}</p>
                <p className="text-xs text-[#6B5A4E]">{c.standard}</p>
              </div>
            ))}
          </div>
          <div>
            <Link to="/certifications" className="text-xs font-bold text-[#D9542F] hover:underline">
              View Full Certifications & Standards →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
