import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Check } from 'lucide-react';
import { PureBotanicalIcon, NoResultsIllustration } from '../components/Illustrations';

export default function Shop() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const queryParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string>(catParam || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(queryParam || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [catParam]);

  useEffect(() => {
    if (queryParam !== null) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const categories = ['All', 'Chilli', 'Powders', 'Whole Spices', 'Flour'];

  const filteredProducts = products
    .filter(product => {
      const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      return 0;
    });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const defaultPack = product.packSizes[0];
    if (defaultPack.isBulk) return;
    addToCart({ ...product, price: defaultPack.price }, 1, defaultPack.size);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2200);
  };

  const getCardTintClass = (category: string) => {
    switch (category) {
      case 'Chilli': return 'card-tint-chilli';
      case 'Powders': return 'card-tint-turmeric';
      case 'Whole Spices': return 'card-tint-whole';
      case 'Flour': return 'card-tint-flour';
      default: return 'card-tint-turmeric';
    }
  };

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#241D17] bg-powder-dust pb-24">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#3E2A1C] text-[#FBF3E7] px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs font-bold border border-[#E0A020]"
          >
            <Check className="w-4 h-4 text-[#E0A020]" /> {addedToast} added to Cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <section className="relative bg-[#3E2A1C] text-[#FBF3E7] bg-powder-dust-dark border-b-2 border-[#E0A020] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0A020]/20 text-[#E0A020] text-xs font-bold uppercase tracking-widest border border-[#E0A020]/30">
            <PureBotanicalIcon className="w-4 h-4" /> 100% Pure Botanical Pakistani Spices
          </div>
          
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#FBF3E7]">
            Shop All Spices
          </h1>

          <p className="text-xs sm:text-sm text-[#FBF3E7]/80 max-w-xl mx-auto leading-relaxed">
            Freshly procured, stone-ground, and hygienically packed. Select your retail jar, pouch, or bulk master pack.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E5D7C5]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D9542F] text-white shadow-xs border-2 border-[#241D17]'
                    : 'bg-white text-[#241D17] border border-[#E5D7C5] hover:border-[#D9542F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#A0958B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#241D17] rounded-lg pl-9 pr-4 py-2 text-xs text-[#241D17] focus:outline-none focus:border-[#D9542F]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-[#241D17] rounded-lg px-4 py-2 text-xs text-[#241D17] font-bold focus:outline-none focus:border-[#D9542F]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid with Spice Powder Tints */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-2xl border-2 border-[#241D17] overflow-hidden flex flex-col hover:border-[#D9542F] transition-all duration-300 group shadow-md relative cursor-pointer ${getCardTintClass(product.category)}`}
              >
                {/* Full Card Link Layer */}
                <Link 
                  to={`/product/${product.id}`} 
                  className="absolute inset-0 z-10" 
                  aria-label={`View ${product.name}`} 
                />

                {/* Image Box */}
                <div className="relative aspect-square p-6 flex items-center justify-center overflow-hidden group/image">
                  <div className="absolute inset-0 radial-glow-turmeric opacity-50 pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 relative z-0 pointer-events-none"
                  />
                  <span className="absolute top-3 left-3 bg-[#3E2A1C] text-[#E0A020] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest z-20 shadow-sm">
                    {product.category}
                  </span>

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 bg-[#0E0904]/95 backdrop-blur-sm p-6 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
                    <h4 className="font-serif-heading text-[#F0C36B] text-sm font-bold mb-3 border-b border-[#F0C36B]/30 pb-2">Inside the Pack</h4>
                    <ul className="space-y-2">
                      {product.freshnessHighlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#FBF3E7]/90 leading-tight">
                          <span className="text-[#D9542F] mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Details & Direct Quick Add */}
                <div className="p-5 bg-white border-t border-[#E5D7C5] flex flex-col flex-1 relative z-20">
                  <h3 className="font-serif-heading text-lg font-bold text-[#241D17] mb-1 group-hover:text-[#D9542F] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#5A4F46] line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#E5D7C5]/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#5A4F46] block uppercase tracking-wider">From</span>
                      <span className="font-serif-heading text-base font-black text-[#D9542F]">Rs. {product.startingPrice}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(product, e);
                      }}
                      className="btn-primary-custom py-2 px-3.5 text-[10px] relative z-30 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4">
            <NoResultsIllustration className="mx-auto" />
            <h3 className="font-serif-heading text-xl font-bold">No Spices Found</h3>
            <p className="text-xs text-[#5A4F46]">Try clearing your search query or category filter.</p>
          </div>
        )}
      </div>

    </div>
  );
}
