import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products, Product, officialInfo } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Award, 
  Minus, 
  Plus, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  MapPin
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.packSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'desc' | 'storage' | 'certs'>('desc');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.packSizes[0]);
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  const handleAddToCart = () => {
    if (selectedSize.isBulk) {
      window.open(`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20am%20interested%20in%20bulk%20(20kg/40kg)%20pricing%20for%20${encodeURIComponent(product.name)}`, '_blank');
      return;
    }
    addToCart({ ...product, price: selectedSize.price }, quantity, selectedSize.size);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24 pt-8">
      
      {/* Toast Notification */}
      {addedSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-6 z-50 bg-[#1F4B33] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-bold border border-[#2e6e4c]"
        >
          <Check className="w-4 h-4 text-[#D8A72E]" /> Added {product.name} ({selectedSize.size}) to Cart!
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-[#826E5F] mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-[#B33A2E]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B33A2E]">Shop</Link>
          <span>/</span>
          <span className="text-[#2A211B] font-semibold">{product.name}</span>
        </div>

        {/* Product Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-10 rounded-2xl border border-[#EBDAC4] shadow-xs">
          
          {/* Left: Image Gallery (Hover crossfade / zoom) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-[#FBF3E7] rounded-xl overflow-hidden border border-[#EBDAC4] p-8 flex items-center justify-center relative group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-lg border p-1 bg-[#FBF3E7] transition-all overflow-hidden ${
                    activeImage === img ? 'border-[#B33A2E] ring-2 ring-[#B33A2E]/20' : 'border-[#EBDAC4] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover rounded-md" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-[#EAF2ED] text-[#1F4B33] text-[10px] uppercase font-bold tracking-wider rounded-xs">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#FDF6E8] text-[#D8A72E] text-[10px] uppercase font-bold tracking-wider rounded-xs">
                  Halal & ISO Certified
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211B]">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#826E5F] font-semibold mt-1">
                {product.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#5E4D40] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Pack Size Selector with animated pill highlight */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A4E]">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.packSizes.map((sizeOption) => {
                  const isSelected = selectedSize.size === sizeOption.size;
                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-4 py-2.5 rounded-xs text-xs font-bold border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#2A211B] text-white border-[#2A211B] shadow-sm scale-105'
                          : 'bg-[#FBF3E7] text-[#5E4D40] border-[#DFCBB2] hover:border-[#2A211B]'
                      }`}
                    >
                      {sizeOption.size} {sizeOption.isBulk ? '(Contact Us)' : `- Rs. ${sizeOption.price}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Display with dynamic count */}
            <div className="pt-2">
              {selectedSize.isBulk ? (
                <div>
                  <span className="text-xs text-[#826E5F] block">Commercial Bulk Order</span>
                  <span className="font-serif text-2xl font-bold text-[#B33A2E]">Direct Mandi Wholesale Rates</span>
                </div>
              ) : (
                <div>
                  <span className="text-xs text-[#826E5F] block">Price</span>
                  <span className="font-serif text-3xl font-bold text-[#B33A2E]">
                    Rs. {(selectedSize.price * quantity).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Actions */}
            {!selectedSize.isBulk && (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-[#DFCBB2] rounded-xs bg-[#FBF3E7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[#5E4D40] hover:text-black transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#2A211B]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-[#5E4D40] hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-xs uppercase tracking-widest font-bold rounded-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    addedSuccess ? 'bg-[#1F4B33] text-white' : 'bg-[#B33A2E] hover:bg-[#972E24] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}

            {/* WhatsApp Direct Button */}
            <div>
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${selectedSize.size})%20Qty:%20${quantity}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> {selectedSize.isBulk ? "Inquire Bulk via WhatsApp" : "Order via WhatsApp"}
              </a>
            </div>

            {/* Freshness Highlights */}
            <div className="pt-4 border-t border-[#F4EAD9] space-y-2 text-xs text-[#5E4D40]">
              {product.freshnessHighlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1F4B33] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
              {product.sourcingOrigin && (
                <div className="flex items-center gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-[#D8A72E] shrink-0" />
                  <span>
                    Sourcing Region: <Link to="/origin" className="font-bold underline text-[#B33A2E]">{product.sourcingOrigin}</Link>
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Below Fold: Tabbed Section with sliding tab-underline */}
        <div className="mt-12 bg-white rounded-2xl border border-[#EBDAC4] p-8 shadow-xs">
          <div className="flex border-b border-[#EBDAC4] gap-6 text-xs uppercase tracking-wider font-bold mb-6">
            {(['desc', 'storage', 'certs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 border-b-2 transition-all relative ${
                  activeTab === tab ? 'border-[#B33A2E] text-[#B33A2E]' : 'border-transparent text-[#826E5F] hover:text-[#2A211B]'
                }`}
              >
                {tab === 'desc' && 'Description & Terroir'}
                {tab === 'storage' && 'Usage & Storage'}
                {tab === 'certs' && 'Certifications'}
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-[#5E4D40] leading-relaxed">
            {activeTab === 'desc' && (
              <p>{product.description}</p>
            )}
            {activeTab === 'storage' && (
              <p>{product.usageAndStorage}</p>
            )}
            {activeTab === 'certs' && (
              <p>{product.certificationsNote}</p>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A211B] mb-8 pb-4 border-b border-[#EBDAC4]">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map(rel => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="bg-white p-5 rounded-xl border border-[#EBDAC4] hover:shadow-lg transition-all group"
              >
                <div className="aspect-square bg-[#FBF3E7] rounded-lg p-4 mb-4 flex items-center justify-center overflow-hidden">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A211B] group-hover:text-[#B33A2E] transition-colors">{rel.name}</h4>
                <p className="text-xs font-bold text-[#B33A2E] mt-2">Rs. {rel.startingPrice}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
