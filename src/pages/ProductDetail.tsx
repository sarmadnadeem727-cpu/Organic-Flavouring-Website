import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { products, officialInfo } from '../data/products';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingBag, MessageCircle, Check, MapPin, Box, Eye, Layers, ArrowRight } from 'lucide-react';
import { HalalIcon, IsoIcon } from '../components/Illustrations';
import Product3DViewer from '../components/Product3DViewer';

interface FlyingParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

type ThumbnailType = '3d-jar' | 'macro' | 'pack' | 'scale';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.packSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeThumbnail, setActiveThumbnail] = useState<ThumbnailType>('3d-jar');
  const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'certifications'>(
    (tabParam === 'usage' || tabParam === 'certifications') ? tabParam : 'description'
  );
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActiveThumbnail('3d-jar');
    setSelectedSize(product.packSizes[0]);
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  useEffect(() => {
    if (tabParam === 'description' || tabParam === 'usage' || tabParam === 'certifications') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Add to Cart Action with Flying Spice Particle Arc Trajectory to Header Cart Icon
  const handleAddToCart = () => {
    if (selectedSize.isBulk) {
      window.open(`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20am%20interested%20in%20bulk%20(20kg/40kg)%20pricing%20for%20${encodeURIComponent(product.name)}`, '_blank');
      return;
    }

    addToCart({ ...product, price: selectedSize.price }, quantity, selectedSize.size);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);

    // Spawn flying spice particles from button toward top right header cart
    if (buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const startX = btnRect.left + btnRect.width / 2;
      const startY = btnRect.top + btnRect.height / 2;
      const targetX = window.innerWidth - 60;
      const targetY = 30;

      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: startX + (Math.random() * 20 - 10),
        y: startY + (Math.random() * 20 - 10),
        targetX: targetX + (Math.random() * 20 - 10),
        targetY: targetY + (Math.random() * 20 - 10)
      }));

      setFlyingParticles(newParticles);
      setTimeout(() => setFlyingParticles([]), 900);
    }
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  // Helper for spice-specific backdrop particle drift color
  const getProductParticleColor = (category: string) => {
    switch (category) {
      case 'Chilli': return '#D9683F';
      case 'Powders': return '#F0C36B';
      case 'Whole Spices': return '#6E8A4E';
      default: return '#D89A2E';
    }
  };

  const particleColor = getProductParticleColor(product.category);

  // Define thumbnail tiles: 3D Jar, Macro Shot, Pack, Scale reference
  const thumbnailTiles: { type: ThumbnailType; label: string; image: string; is3D?: boolean }[] = [
    { type: '3d-jar', label: '3D Jar', image: product.image, is3D: true },
    { type: 'macro', label: 'Macro Texture', image: product.gallery[1] || product.image },
    { type: 'pack', label: 'Packaging', image: product.gallery[2] || product.image },
    { type: 'scale', label: 'Scale Ref', image: product.gallery[3] || product.image }
  ];

  const currentFlatImage = activeThumbnail === 'macro'
    ? (product.gallery[1] || product.image)
    : activeThumbnail === 'pack'
    ? (product.gallery[2] || product.image)
    : activeThumbnail === 'scale'
    ? (product.gallery[3] || product.image)
    : undefined;

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A1F16] bg-texture-grain pb-24 pt-6 relative">
      
      {/* Flying Spice Particles Burst Trajectory toward Header Cart Icon */}
      {flyingParticles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
          animate={{ x: p.targetX, y: p.targetY, scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.85, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="fixed z-50 w-2.5 h-2.5 rounded-full pointer-events-none"
          style={{ backgroundColor: particleColor }}
        />
      ))}

      {/* Toast Notification */}
      <AnimatePresence>
        {addedSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#241A10] text-[#FFF6E8] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-xs font-bold border border-[#D89A2E]"
          >
            <Check className="w-4 h-4 text-[#D89A2E]" /> Added {product.name} ({selectedSize.size}) to Cart!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-[#2A1F16]/70 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#B0472B]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B0472B]">Shop</Link>
          <span>/</span>
          <span className="text-[#2A1F16] font-bold">{product.name}</span>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* TWO-COLUMN GRID: VIEWER ~55% (STICKY), INFO ~45%                       */}
        {/* ---------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start bg-white p-6 sm:p-10 rounded-2xl border-2 border-[#241A10] shadow-xl relative overflow-hidden">
          
          {/* Subtle Product Spice Background Dust Drift */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-dust-mote"
                style={{
                  left: `${10 + i * 11}%`,
                  bottom: `${10 + (i % 3) * 20}%`,
                  width: '4px',
                  height: '4px',
                  backgroundColor: particleColor,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Left Column (55% on desktop): Sticky 3D Interactive Product Viewer */}
          <div className="lg:col-span-7 space-y-4 relative z-10 lg:sticky lg:top-24">
            
            {/* 3D Cylinder Interactive Viewer */}
            <Product3DViewer
              product={product}
              activeMedia={currentFlatImage}
              isFlatImage={activeThumbnail !== '3d-jar'}
            />

            {/* Thumbnail Row Below Viewer (3-4 small tiles) */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {thumbnailTiles.map((tile) => {
                const isActive = activeThumbnail === tile.type;
                return (
                  <button
                    key={tile.type}
                    onClick={() => setActiveThumbnail(tile.type)}
                    className={`relative px-3 py-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer min-w-[76px] bg-[#FBF3E7] ${
                      isActive 
                        ? 'border-[#B0472B] shadow-md scale-105 bg-white' 
                        : 'border-[#E5D7C5] opacity-75 hover:opacity-100 hover:border-[#241A10]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#241A10] flex items-center justify-center overflow-hidden">
                      {tile.is3D ? (
                        <Box className={`w-5 h-5 ${isActive ? 'text-[#D89A2E]' : 'text-[#EDE1CC]'}`} />
                      ) : (
                        <img 
                          src={tile.image} 
                          alt={tile.label} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${isActive ? 'text-[#B0472B]' : 'text-[#2A1F16]/80'}`}>
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column (45% on desktop): Product Info Panel (E-commerce Layout) */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            
            {/* Category Eyebrow, Heading, Price */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 bg-[#241A10] text-[#D89A2E] text-[10px] uppercase font-bold tracking-widest rounded">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#6E8A4E]/20 text-[#455A2E] text-[10px] uppercase font-bold tracking-widest rounded border border-[#6E8A4E]/30">
                  Halal & ISO Certified
                </span>
              </div>

              {/* Large Serif Heading */}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241A10] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#B0472B] font-bold uppercase tracking-wider mt-1.5">
                {product.tagline}
              </p>

              {/* Bold Price in Clay-Deep Color */}
              <div className="mt-4 pt-3 border-t border-[#E5D7C5]/80">
                {selectedSize.isBulk ? (
                  <div>
                    <span className="text-[10px] text-[#2A1F16]/70 uppercase tracking-widest block font-bold">Wholesale Sacks</span>
                    <span className="font-display text-2xl font-bold text-[#7E2F1C]">Direct Mandi Rates</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] text-[#2A1F16]/70 uppercase tracking-widest block font-bold">Price</span>
                    <motion.span 
                      key={selectedSize.price * quantity}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      className="font-display text-3xl font-black text-[#7E2F1C] inline-block"
                    >
                      Rs. {(selectedSize.price * quantity).toLocaleString()}
                    </motion.span>
                  </div>
                )}
              </div>
            </div>

            {/* Short 2-3 Sentence Description */}
            <p className="text-xs sm:text-sm text-[#2A1F16]/85 leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Pack-Size Selector as a Row of Pill Buttons */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#2A1F16]/70">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.packSizes.map((sizeOption) => {
                  const isSelected = selectedSize.size === sizeOption.size;
                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#B0472B] text-white shadow-md border-2 border-[#B0472B]' 
                          : 'bg-transparent text-[#2A1F16] border-2 border-[#E5D7C5] hover:border-[#241A10]'
                      }`}
                    >
                      {sizeOption.size} {sizeOption.isBulk ? '(Bulk)' : `— Rs. ${sizeOption.price}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simple Two-Column Detail Table (Origin / Heat Level / Form / Certification) */}
            <div className="border-t border-[#E5D7C5] pt-2">
              <div className="text-xs divide-y divide-[#E5D7C5]">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-[#2A1F16]/70 uppercase text-[10px] tracking-wider">Origin</span>
                  <Link to="/origin" className="font-semibold text-[#B0472B] hover:underline flex items-center gap-1 text-right">
                    {product.sourcingOrigin || 'Sindh & Punjab'} →
                  </Link>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-[#2A1F16]/70 uppercase text-[10px] tracking-wider">Heat Level</span>
                  <span className="font-semibold text-[#241A10] text-right">
                    {product.heatName || (product.heatLevel ? `${product.heatLevel} / 5 Heat` : 'Gentle Aromatic')}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-[#2A1F16]/70 uppercase text-[10px] tracking-wider">Form</span>
                  <span className="font-semibold text-[#241A10] text-right">Stone-Milled Pure Powder</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-[#2A1F16]/70 uppercase text-[10px] tracking-wider">Certification</span>
                  <Link to="/certifications" className="font-semibold text-[#6E8A4E] hover:underline flex items-center gap-1 text-right">
                    Halal & ISO 9001:2015 →
                  </Link>
                </div>
              </div>
            </div>

            {/* Stepper & Full-Width Add to Cart Button (Clay Gradient Fill & Colored Drop Shadow) */}
            {!selectedSize.isBulk && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-[#241A10] rounded-xl bg-[#FBF3E7] p-0.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-[#241A10] hover:text-[#B0472B] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-[#241A10]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-[#241A10] hover:text-[#B0472B] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs text-[#2A1F16]/65 font-medium">
                    Total: Rs. {(selectedSize.price * quantity).toLocaleString()}
                  </span>
                </div>

                {/* Full-width Add to Cart button with clay gradient & colored shadow */}
                <motion.button
                  ref={buttonRef}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-white text-xs uppercase font-bold tracking-[0.18em] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    addedSuccess 
                      ? 'bg-[#241A10] border-2 border-[#D89A2E] text-[#FFF6E8]' 
                      : 'bg-gradient-to-r from-[#D9683F] via-[#B0472B] to-[#7E2F1C] hover:from-[#B0472B] hover:to-[#4A1C10]'
                  }`}
                  style={{
                    boxShadow: addedSuccess ? '0 10px 25px -5px rgba(216, 154, 46, 0.4)' : '0 14px 28px -6px rgba(176, 71, 43, 0.45)'
                  }}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#D89A2E]" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </motion.button>
              </div>
            )}

            {/* WhatsApp Quick Action */}
            <div>
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${selectedSize.size})%20Qty:%20${quantity}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> {selectedSize.isBulk ? "Inquire Bulk Sacks via WhatsApp" : "Order via WhatsApp"}
              </a>
            </div>

          </div>

        </div>

        {/* Framer Motion Detail Tabs */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#241A10] shadow-lg">
          <div className="flex border-b border-[#E5D7C5] gap-8 relative mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs uppercase tracking-widest font-bold relative cursor-pointer ${
                activeTab === 'description' ? 'text-[#B0472B]' : 'text-[#2A1F16]/70 hover:text-[#2A1F16]'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B0472B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-3 text-xs uppercase tracking-widest font-bold relative cursor-pointer ${
                activeTab === 'usage' ? 'text-[#B0472B]' : 'text-[#2A1F16]/70 hover:text-[#2A1F16]'
              }`}
            >
              Usage & Storage
              {activeTab === 'usage' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B0472B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`pb-3 text-xs uppercase tracking-widest font-bold relative cursor-pointer ${
                activeTab === 'certifications' ? 'text-[#B0472B]' : 'text-[#2A1F16]/70 hover:text-[#2A1F16]'
              }`}
            >
              Accreditations
              {activeTab === 'certifications' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B0472B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

          <div className="text-xs text-[#2A1F16]/80 leading-relaxed min-h-[80px]">
            {activeTab === 'description' && (
              <p>{product.shortDescription} Harvested during peak season and stone-milled under strict temperature control to prevent essential oil evaporation.</p>
            )}
            {activeTab === 'usage' && (
              <p>Store in a cool, dry pantry away from direct sunlight. Once opened, keep tightly sealed in our re-sealable zip pouch or glass jar to preserve aroma for up to 18 months.</p>
            )}
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2"><HalalIcon className="w-5 h-5 text-[#6E8A4E]" /> <span>Pakistan Halal Standard PS:3733-2022 (R)</span></div>
                  <div className="flex items-center gap-2"><IsoIcon className="w-5 h-5 text-[#B0472B]" /> <span>ISO 9001:2015 Quality Management System</span></div>
                </div>
                <div className="pt-2">
                  <Link 
                    to="/certifications" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B0472B] hover:text-[#7E2F1C] transition-colors"
                  >
                    <span>View accredited Halal & ISO documents & verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-12">
          <h3 className="font-display text-xl font-bold text-[#241A10] mb-6 pb-3 border-b border-[#E5D7C5]">
            Frequently Bought Together
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="bg-white p-5 rounded-xl border border-[#E5D7C5] hover:border-[#B0472B] transition-all group flex items-center gap-4 shadow-xs"
              >
                <img src={rel.image} alt={rel.name} className="w-16 h-16 object-contain bg-[#FBF3E7] p-1 rounded-lg border" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#241A10] group-hover:text-[#B0472B] transition-colors">{rel.name}</h4>
                  <p className="text-xs font-bold text-[#B0472B] mt-1">Rs. {rel.startingPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
