import React, { useState } from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Sparkles, Search, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedToast, setAddedToast] = useState<string | null>(null);

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
      return 0; // default featured
    });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const defaultPack = product.packSizes[0];
    if (defaultPack.isBulk) return;
    addToCart({ ...product, price: defaultPack.price }, 1, defaultPack.size);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* Toast Notification */}
      {addedToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-6 z-50 bg-[#1F4B33] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-bold border border-[#2e6e4c]"
        >
          <Check className="w-4 h-4 text-[#D8A72E]" /> {addedToast} added to Cart!
        </motion.div>
      )}

      {/* Header Banner */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8A72E]" /> Halal & ISO 9001:2015 Certified
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B]"
          >
            Our Products
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-[#5E4D40] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Freshly procured and hygienically packed single-estate Pakistani spices. Available in retail packs and 20kg/40kg wholesale consignments.
          </motion.p>
        </div>
      </section>

      {/* Filter & Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#EBDAC4]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#B33A2E] text-white shadow-xs scale-105'
                    : 'bg-[#F5E8D3] text-[#5E4D40] hover:bg-[#EBDAC4] hover:text-[#2A211B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#826E5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#DFCBB2] rounded-full pl-9 pr-4 py-2 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#DFCBB2] rounded-full px-4 py-2 text-xs text-[#2A211B] font-bold focus:outline-none focus:border-[#B33A2E]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8"
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl overflow-hidden border border-[#EBDAC4] hover:border-[#B33A2E] transition-all duration-300 flex flex-col group shadow-xs hover:shadow-xl relative"
            >
              {/* Image Box */}
              <div className="relative bg-[#FBF3E7] aspect-square p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

                {/* Quick Add Slide-Up on Hover */}
                <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full py-2.5 bg-[#B33A2E] hover:bg-[#972E24] text-white text-xs uppercase tracking-wider font-bold rounded-xs shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-[#D8A72E] uppercase tracking-wider mb-1">
                  {product.category}
                </span>

                <h3 className="font-serif text-lg font-bold text-[#2A211B] mb-1">
                  <Link to={`/product/${product.id}`} className="hover:text-[#B33A2E] transition-colors">
                    {product.name}
                  </Link>
                </h3>

                <p className="text-xs text-[#6B5A4E] line-clamp-2 mb-4">
                  {product.shortDescription}
                </p>

                <div className="mt-auto pt-4 border-t border-[#F4EAD9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#826E5F] block">Starting from</span>
                    <span className="text-base font-serif font-bold text-[#B33A2E]">Rs. {product.startingPrice}</span>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-3.5 py-1.5 bg-[#2A211B] hover:bg-[#B33A2E] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
