import React from 'react';
import { Star, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { reviews } from '../data/reviews';
import { officialInfo } from '../data/products';
import { Link } from 'react-router-dom';

export default function Reviews() {
  const verifiedReviews = reviews.filter(r => r.verified);

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* Hero Section */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-10 sm:py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D9542F]/10 text-[#D9542F] text-xs font-bold uppercase tracking-widest border border-[#D9542F]/20">
            <MessageCircle className="w-4 h-4" />
            <span>Customer Experiences</span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#211D18] tracking-tight leading-tight">
            Customer Reviews
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            {verifiedReviews.length > 0 
              ? "Read verified experiences from kitchens and chefs across Pakistan."
              : "Genuine feedback from real kitchens across Pakistan."}
          </p>
        </div>
      </section>

      {/* Reviews Content Grid or Graceful Empty State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {verifiedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {verifiedReviews.map((review) => (
              <div 
                key={review.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#211D18] shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#E0A020]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-[#E0A020]' : 'text-[#E5D7C5]'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#5A4F46]">{review.date}</span>
                  </div>

                  <p className="text-sm text-[#211D18] leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5D7C5] flex items-center justify-between">
                  <span className="font-bold text-sm text-[#211D18]">{review.name}</span>
                  {review.location && (
                    <span className="text-xs text-[#5A4F46] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D9542F]" /> {review.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border-2 border-[#211D18] text-center space-y-5 shadow-lg">
            <div className="w-14 h-14 bg-[#F0C36B]/20 text-[#B0472B] rounded-full flex items-center justify-center mx-auto border border-[#F0C36B]/40">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#211D18]">
              Reviews Coming Soon
            </h3>

            <p className="text-xs sm:text-sm text-[#5A4F46] leading-relaxed">
              Reviews are coming as our first customers receive their freshly milled spice orders across Pakistan. Have you tried our spices? Send us your review on WhatsApp!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20would%20like%20to%20share%20my%20feedback%20on%20my%20recent%20spice%20order`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Share Feedback on WhatsApp
              </a>

              <Link
                to="/shop"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#211D18] hover:bg-[#D9542F] text-white font-bold rounded-lg text-xs flex items-center justify-center transition-colors"
              >
                Shop Fresh Spices
              </Link>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}

