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
  const [liveReviews, setLiveReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'live' && liveReviews.length === 0) {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      
      if (!apiKey) {
        setError('Missing Google Places API Key. Please add VITE_GOOGLE_PLACES_API_KEY to your .env file.');
        return;
      }

      setIsLoading(true);
      
      // Dynamically load the Google Maps script
      const scriptId = 'google-maps-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      const fetchReviews = () => {
        const placeId = 'ChIJsaZZVn4FGTkRhxKHwhjRL1o'; // Extracted from Maps link
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);
        
        service.getDetails({
          placeId: placeId,
          fields: ['reviews', 'rating', 'user_ratings_total']
        }, (place, status) => {
          setIsLoading(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.reviews) {
            setLiveReviews(place.reviews);
          } else {
            setError(`Failed to fetch reviews: ${status}`);
          }
        });
      };

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = fetchReviews;
        script.onerror = () => {
          setIsLoading(false);
          setError('Failed to load Google Maps script.');
        };
        document.body.appendChild(script);
      } else if (window.google && window.google.maps && window.google.maps.places) {
        fetchReviews();
      } else {
        script.addEventListener('load', fetchReviews);
      }
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
            
            <div className="min-h-[300px] mt-8 text-left">
              {error ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-200 text-center flex flex-col items-center justify-center h-full space-y-3">
                  <span className="font-bold">Cannot Load Live Reviews</span>
                  <p className="text-sm">{error}</p>
                  <p className="text-xs text-red-500 mt-2">
                    To fix this, get an API key from the Google Cloud Console (with Places API enabled), create a <code>.env</code> file in your project root, and add: <br/>
                    <code>VITE_GOOGLE_PLACES_API_KEY=your_api_key_here</code>
                  </p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-[#D9542F] space-y-4">
                  <div className="w-8 h-8 border-4 border-[#D9542F] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold uppercase tracking-widest">Fetching live reviews...</p>
                </div>
              ) : liveReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveReviews.map((review, idx) => (
                    <div key={idx} className="bg-[#FBF8F2] p-6 rounded-xl border border-[#E5D7C5] shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-[#C79A46] text-[#C79A46]' : 'text-[#E5D7C5]'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#5A4F46]">{review.relative_time_description}</span>
                      </div>
                      
                      <p className="text-[#211D18] leading-relaxed mb-6 flex-grow text-sm">
                        "{review.text}"
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#E5D7C5]">
                        <img src={review.profile_photo_url} alt={review.author_name} className="w-8 h-8 rounded-full" />
                        <span className="font-bold text-sm text-[#211D18]">{review.author_name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <a 
              href="https://www.google.com/maps/place/Organic+flavouring/@31.3849701,74.3679691,17z/data=!3m1!4b1!4m16!1m9!3m8!1s0x3919054e56598ab1:0x5a2ed148c2871287!2sOrganic+flavouring!8m2!3d31.3849701!4d74.370544!9m1!1b1!16s%2Fg%2F11t2z71wks!3m5!1s0x3919054e56598ab1:0x5a2ed148c2871287!8m2!3d31.3849701!4d74.370544!16s%2Fg%2F11t2z71wks?entry=ttu" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-white border border-[#E5D7C5] text-[#211D18] text-sm font-bold rounded hover:bg-[#F2EBE1] transition-colors"
            >
              View all on Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
