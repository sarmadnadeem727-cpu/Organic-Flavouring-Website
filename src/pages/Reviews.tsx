import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

const STATIC_REVIEWS = [
  {
    id: 1,
    name: "Ayesha Malik",
    date: "2 weeks ago",
    rating: 5,
    text: "The quality of the Turmeric is exceptional. It has a beautiful rich color and the aroma is exactly how pure turmeric should be. I've switched completely to Organic Flavouring for all my daily spices.",
    location: "Lahore"
  },
  {
    id: 2,
    name: "Kamran Ahmed",
    date: "1 month ago",
    rating: 5,
    text: "I run a small catering business and sourcing consistent quality spices is critical. Organic Flavouring's wholesale packs are incredibly fresh and the flavor payoff in my dishes is unmatched. Highly recommended.",
    location: "Karachi"
  },
  {
    id: 3,
    name: "Zainab R.",
    date: "3 months ago",
    rating: 5,
    text: "Beautiful packaging and phenomenal taste. You can really tell the difference between these unadulterated spices and the generic ones from the supermarket. The Garam Masala is a game changer!",
    location: "Islamabad"
  },
  {
    id: 4,
    name: "Bilal Hussain",
    date: "4 months ago",
    rating: 4,
    text: "Delivery was fast and the product is pure. Only giving 4 stars because I wish they had more blends available, but the single-origin spices are 10/10.",
    location: "Faisalabad"
  }
];

export default function Reviews() {
  const [activeTab, setActiveTab] = useState<'curated' | 'live'>('curated');

  // To simulate rendering the Elfsight widget when switching tabs
  useEffect(() => {
    if (activeTab === 'live') {
      // If the user had the Elfsight script loaded in index.html, 
      // we would trigger a refresh here if necessary.
    }
  }, [activeTab]);

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* Hero Section */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D9542F]/10 text-[#D9542F] text-xs font-bold uppercase tracking-widest border border-[#D9542F]/20">
            <MessageCircle className="w-4 h-4" />
            <span>Customer Experiences</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight leading-tight">
            Loved by Homes & Kitchens Nationwide
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            See what our community has to say about the pure, unadulterated taste of our spices.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="flex justify-center border-b border-[#E5D7C5]">
          <button
            onClick={() => setActiveTab('curated')}
            className={`py-4 px-8 font-serif-heading text-lg transition-colors border-b-2 ${
              activeTab === 'curated' 
                ? 'border-[#D9542F] text-[#D9542F] font-bold' 
                : 'border-transparent text-[#5A4F46] hover:text-[#211D18]'
            }`}
          >
            Customer Reviews
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`py-4 px-8 font-serif-heading text-lg transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'live' 
                ? 'border-[#D9542F] text-[#D9542F] font-bold' 
                : 'border-transparent text-[#5A4F46] hover:text-[#211D18]'
            }`}
          >
            Live Google Reviews
            <span className="bg-[#6FAE3E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Live</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeTab === 'curated' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {STATIC_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-xl border border-[#E5D7C5] shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-[#C79A46] text-[#C79A46]' : 'text-[#E5D7C5]'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#5A4F46]">{review.date}</span>
                </div>
                
                <p className="text-[#211D18] leading-relaxed mb-6 flex-grow italic">
                  "{review.text}"
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F2EBE1]">
                  <span className="font-bold text-sm text-[#211D18]">{review.name}</span>
                  <div className="flex items-center gap-1 text-xs text-[#5A4F46]">
                    <MapPin className="w-3 h-3" />
                    {review.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'live' && (
          <div className="bg-white p-8 sm:p-12 rounded-xl border border-[#E5D7C5] shadow-sm text-center animate-fade-in space-y-6">
            <h2 className="font-serif-heading text-2xl font-bold text-[#211D18]">
              Live Reviews from Google
            </h2>
            <p className="text-[#5A4F46] max-w-lg mx-auto">
              We aggregate our live customer feedback straight from Google Maps to ensure complete transparency.
            </p>
            
            <div className="bg-[#FBF8F2] border border-dashed border-[#C79A46] p-8 rounded-lg max-w-3xl mx-auto my-8 flex flex-col items-center justify-center min-h-[300px]">
              {/* NOTE TO USER: Replace the div below with your Elfsight Widget code */}
              <div className="elfsight-app-PLACEHOLDER"></div>
              
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Star className="w-6 h-6 fill-[#C79A46] text-[#C79A46]" />
                </div>
                <p className="text-sm font-semibold text-[#211D18]">Widget Placeholder</p>
                <p className="text-xs text-[#5A4F46] max-w-xs mx-auto">
                  To display live Google reviews, sign up for a free widget at <a href="https://elfsight.com/google-reviews-widget/" target="_blank" rel="noreferrer" className="text-[#D9542F] hover:underline">Elfsight</a> and paste the embed code in <code>src/pages/Reviews.tsx</code>.
                </p>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/place/Organic+flavouring/@31.3849701,74.3679691,17z/data=!3m1!4b1!4m16!1m9!3m8!1s0x3919054e56598ab1:0x5a2ed148c2871287!2sOrganic+flavouring!8m2!3d31.3849701!4d74.370544!9m1!1b1!16s%2Fg%2F11t2z71wks!3m5!1s0x3919054e56598ab1:0x5a2ed148c2871287!8m2!3d31.3849701!4d74.370544!16s%2Fg%2F11t2z71wks?entry=ttu" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E5D7C5] text-[#211D18] text-sm font-bold rounded hover:bg-[#F2EBE1] transition-colors"
            >
              View on Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
