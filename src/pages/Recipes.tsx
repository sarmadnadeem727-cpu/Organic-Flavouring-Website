import { useState } from 'react';
import { recipes, Recipe } from '../data/recipes';
import { products, assets } from '../data/products';
import { useCart } from '../context/CartContext';
import { ChefHat, Clock, Utensils, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Recipes() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipes[0]);

  const categories = ['All', 'Condiments & Infusions', 'Mains & Brunch', 'Appetizers'];

  const filteredRecipes = activeCategory === 'All'
    ? recipes
    : recipes.filter(r => r.category === activeCategory);

  const matchedProduct = products.find(p => p.name.includes('Single Estate') || p.name.includes('Chilli')) || products[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#2C2A29] pb-24">
      
      {/* Header Banner */}
      <section className="relative bg-[#F3F0E8] border-b border-[#E3DDCF] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EAE5DA] text-[#59544D] text-xs font-semibold uppercase tracking-widest">
            <ChefHat className="w-3.5 h-3.5 text-[#78A425]" />
            <span>The Culinary Lab & Pairings</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1A1A18] tracking-tight">
            Artisanal Recipes & Pairings
          </h1>

          <p className="text-base sm:text-lg text-[#615C56] font-light leading-relaxed max-w-2xl mx-auto">
            Discover how pure, sun-cured spices unlock extraordinary depths in daily cooking. Created in collaboration with culinary purists.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#242220] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#666059] border border-[#DDD7CB] hover:border-[#1A1A18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipe Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-2xl border border-[#E2DDD2] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3 text-xs text-[#7A746C]">
              <span className="px-2.5 py-1 bg-[#EEF5E6] text-[#4E7A22] font-bold uppercase tracking-wider rounded-xs">
                {selectedRecipe.category}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedRecipe.time}</span>
              <span className="flex items-center gap-1"><Utensils className="w-3.5 h-3.5" /> Yields {selectedRecipe.yields}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A18] leading-tight">
              {selectedRecipe.title}
            </h2>

            <p className="text-sm text-[#615C56] leading-relaxed">
              {selectedRecipe.summary}
            </p>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs space-y-2">
              <span className="font-bold text-[#1A1A18] uppercase tracking-wider block">Featured Organic Botanical:</span>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#8B342A]">{selectedRecipe.featuredSpice}</span>
                <button
                  onClick={() => addToCart(matchedProduct, 1)}
                  className="px-3 py-1 bg-[#242220] hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3 h-3" /> Get This Spice
                </button>
              </div>
            </div>

            {/* Chef Tip */}
            <div className="p-3.5 bg-[#F9F7F2] border-l-3 border-[#78A425] text-xs text-[#6B655E] italic">
              <strong>Chef's Pairing Note:</strong> {selectedRecipe.chefTip}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F0ECE4] border border-[#E0DBD0] shadow-sm">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Recipe Method & Ingredients Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Ingredients Column */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl border border-[#E2DDD2] shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A18]">The Pantry List</h3>
            <ul className="space-y-3 text-xs text-[#59544D]">
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#EEF5E6] text-[#4E7A22] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-[#E2DDD2] shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A18]">Culinary Preparation</h3>
            <div className="space-y-6">
              {selectedRecipe.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DDD7CB] flex items-center justify-center text-xs font-mono font-bold text-[#1A1A18] shrink-0">
                    {idx + 1}
                  </span>
                  <div className="text-xs sm:text-sm text-[#59544D] leading-relaxed pt-1">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Recipe Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h3 className="font-serif text-3xl font-normal text-[#1A1A18] mb-8 pb-4 border-b border-[#E8E3DA]">
          More Dishes from Our Kitchen
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => {
                setSelectedRecipe(recipe);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`bg-white rounded-xl overflow-hidden border transition-all cursor-pointer group shadow-xs ${
                selectedRecipe.id === recipe.id ? 'border-[#78A425] ring-2 ring-[#78A425]/20' : 'border-[#E2DDD2] hover:border-[#DDD7CB]'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F0ECE4]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#78A425]">
                  {recipe.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1A1A18] group-hover:text-[#8B342A] transition-colors">
                  {recipe.title}
                </h4>
                <p className="text-xs text-[#7A746C] line-clamp-2">
                  {recipe.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
