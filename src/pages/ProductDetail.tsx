import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { products, officialInfo } from '../data/products';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingBag, MessageCircle, Check, MapPin, ZoomIn } from 'lucide-react';
import { PureBotanicalIcon, HalalIcon, IsoIcon } from '../components/Illustrations';

interface FlyingParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.packSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'certifications'>('description');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Interactive Cursor-Following Zoom Lens State with smooth lerped follow
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, show: false });

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.packSizes[0]);
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    
    // Smooth lerped cursor lens position
    setZoomPos(prev => ({
      x: prev.x + (x - prev.x) * 0.35,
      y: prev.y + (y - prev.y) * 0.35,
      show: true
    }));
  };

  const handleMouseLeave = () => {
    setZoomPos(prev => ({ ...prev, show: false }));
  };

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

        {/* Immersive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white p-6 sm:p-10 rounded-2xl border-2 border-[#241A10] shadow-xl relative overflow-hidden">
          
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

          {/* Left Column (60% Viewport): Immersive Zoom Viewer & Gallery */}
          <div className="lg:col-span-7 space-y-4 relative z-10">
            
            {/* Primary Image Stage with Lerped Magnifying Lens Zoom */}
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square bg-[#FBF3E7] rounded-2xl overflow-hidden border-2 border-[#241A10] p-6 flex items-center justify-center cursor-crosshair group shadow-inner"
            >
              <div className="absolute inset-0 radial-glow-masala opacity-60 pointer-events-none" />

              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-contain transition-opacity duration-300 ${zoomPos.show ? 'opacity-20' : 'opacity-100'}`}
              />

              {zoomPos.show && (
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '240%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}

              <span className="absolute bottom-3 right-3 bg-[#241A10]/85 text-[#FFF6E8] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1.5 backdrop-blur-xs pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#D89A2E]" /> Hover to Zoom
              </span>
            </div>

            {/* Thumbnail Strip with Cross-Fade + Horizontal Slide */}
            <div className="flex gap-3 justify-center pt-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 rounded-xl border-2 p-1 bg-[#FBF3E7] transition-all overflow-hidden cursor-pointer ${
                    activeImage === img ? 'border-[#B0472B] scale-105 shadow-md' : 'border-[#E5D7C5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover rounded-lg" />
                  {idx === 1 && (
                    <span className="absolute bottom-0 inset-x-0 bg-[#241A10] text-[#D89A2E] text-[8px] font-bold uppercase text-center py-0.5">
                      Macro
                    </span>
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column (40% Viewport): Scannable Product Info */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-[#241A10] text-[#D89A2E] text-[10px] uppercase font-bold tracking-widest rounded">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#6E8A4E]/20 text-[#455A2E] text-[10px] uppercase font-bold tracking-widest rounded border border-[#6E8A4E]/30">
                  Halal & ISO Certified
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241A10]">
                {product.name}
              </h1>
              <p className="text-xs text-[#B0472B] font-bold uppercase tracking-wider mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Short Scannable Bullet Points */}
            <div className="p-4 bg-[#FBF3E7] rounded-xl border border-[#E5D7C5] space-y-2 text-xs text-[#2A1F16]/80">
              <div className="flex items-center gap-2">
                <PureBotanicalIcon className="w-4 h-4 shrink-0 text-[#6E8A4E]" />
                <span className="font-bold text-[#241A10]">Freshly Packed:</span> Stone-ground from sun-dried harvest pods
              </div>
              <div className="flex items-center gap-2">
                <HalalIcon className="w-4 h-4 shrink-0" />
                <span className="font-bold text-[#241A10]">Purity Guarantee:</span> 0% Sudan dyes, fillers, or mineral polish
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[#B0472B]" />
                <span className="font-bold text-[#241A10]">Single Origin:</span> Sourced from {product.sourcingOrigin || 'Sindh/Punjab'}
              </div>
            </div>

            {/* Framer Motion layoutId Pack Size Pill Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#2A1F16]/70">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-2 relative">
                {product.packSizes.map((sizeOption) => {
                  const isSelected = selectedSize.size === sizeOption.size;
                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`relative px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isSelected ? 'text-[#FFF6E8]' : 'text-[#2A1F16] bg-[#FBF3E7] border border-[#E5D7C5] hover:border-[#241A10]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activePackPill"
                          className="absolute inset-0 bg-[#241A10] border-2 border-[#D89A2E] rounded-lg shadow-xs"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">
                        {sizeOption.size} {sizeOption.isBulk ? '(Wholesale Sack)' : `- Rs. ${sizeOption.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Display with Brief Scale Pulse */}
            <div className="pt-2">
              {selectedSize.isBulk ? (
                <div>
                  <span className="text-[10px] text-[#2A1F16]/70 uppercase tracking-widest block">Commercial Wholesale Order</span>
                  <span className="font-display text-2xl font-bold text-[#B0472B]">Direct Mandi Rates</span>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] text-[#2A1F16]/70 uppercase tracking-widest block">Price</span>
                  <motion.span 
                    key={selectedSize.price * quantity}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    className="font-display text-3xl font-black text-[#B0472B] inline-block"
                  >
                    Rs. {(selectedSize.price * quantity).toLocaleString()}
                  </motion.span>
                </div>
              )}
            </div>

            {/* Stepper & Add to Cart Button */}
            {!selectedSize.isBulk && (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border-2 border-[#241A10] rounded-lg bg-[#FBF3E7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[#241A10] hover:text-[#B0472B] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#241A10]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-[#241A10] hover:text-[#B0472B] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  ref={buttonRef}
                  onClick={handleAddToCart}
                  className={`px-6 py-3.5 bg-gradient-to-r from-[#B0472B] to-[#7E2F1C] hover:from-[#D9683F] hover:to-[#B0472B] text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-all shadow-md flex-1 flex items-center justify-center gap-2 cursor-pointer ${addedSuccess ? 'bg-[#241A10] border-[#D89A2E]' : ''}`}
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
                </button>
              </div>
            )}

            {/* WhatsApp Quick Action */}
            <div>
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${selectedSize.size})%20Qty:%20${quantity}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> {selectedSize.isBulk ? "Inquire Bulk Sacks via WhatsApp" : "Order via WhatsApp"}
              </a>
            </div>

          </div>

        </div>

        {/* Framer Motion layoutId Detail Tabs */}
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2"><HalalIcon className="w-5 h-5" /> <span>Pakistan Halal Standard PS:3733-2022</span></div>
                <div className="flex items-center gap-2"><IsoIcon className="w-5 h-5" /> <span>ISO 9001:2015 Quality System</span></div>
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
