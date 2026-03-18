import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Facebook, MessageCircle } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';

const Reviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const reviews = [
    { id: 1, name: "John Andrew ", date: "2 years ago", rating: 5, text: "Best service I've ever had with any sort of repair or installation, hands down. Matt got to us very quickly and helped us work within our budget when we needed a whole new furnace at the start of the winter season. He got it up and running on a Friday night. We felt the heat come back on within minutes. What a relief. I can't recommend this company enough. ", source: "Facebook" },
    { id: 2, name: "Courtney Marquart", date: "1 month ago", rating: 5, text: "Matt was hands down, fantastic. He genuinely cares for his clients and their wellbeing. Not only did he work quickly to find our family a working furnace, he stayed extremely late to ensure my family ", source: "Facebook" },
    { id: 3, name: "Robert L.", date: "3 months ago", rating: 4, text: "Great experience overall. Scheduling was easy and the team was respectful of my home.", source: "Google" },
    { id: 4, name: "Marie Glenn Wonderleigh", date: "4 months ago", rating: 5, text: "they came an hour and a half on a Saturday afternoon, worked four hrs. and repaired my heat. great job would recommend them 100%.", source: "Google" },
    { id: 5, name: "Britany Dumford Price", date: "5 months ago", rating: 5, text: "Very happy to have this family owned business help us with our air conditioning! Our ac went out last week during one of the hottest weeks of they year! They temporarily helped us while we figured out what was needed to be done. Then fully replaced our system a few days later. Very knowledgeable, friendly, and timely. From first call(JJ) to instilation(Bryan, Matt, JT), they were very professional. Highly recommend.", source: "Facebook" },
    { id: 6, name: "Kim Chase Mattocks ", date: "6 months ago", rating: 5, text: "90 degrees and the day after the holiday, Buckley Mechanical services took my emergency call and worked me into their schedule SAME DAY! They arrived early and the AC was repaired before they left. As a landlord this is huge because I don’t have a hot irritated tenant calling my phone over and over. I will use and refer Buckley Service to all my associates.", source: "Google" },
    { id: 7, name: "Amanda Rose", date: "7 months ago", rating: 4, text: "They had a very fast response time, Bryan was very knowledgeable and provided me with tips on how to prevent any further issues and properly maintain my unit. He really care about his customers. I will definitely use them again for any of my hvac needs.", source: "Google" },
    { id: 8, name: "Diane Fisher", date: "8 months ago", rating: 5, text: "TExcellent response time, quality service & pricing. Bryan repaired our A/C quickly & answered my questions along the way. I definitely recommend Buckley Mechanical Services for your HVAC needs!", source: "Facebook" },
  ];

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Buckley Mechanical Services LLC",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length.toString()
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString()
      },
      "reviewBody": review.text
    }))
  };

  const loadMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, reviews.length));
  };

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <SchemaMarkup data={reviewSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Customer <span className="text-burnt-orange">Reviews</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            See what our satisfied customers have to say about our HVAC services.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <a 
              href="https://www.google.com/search?q=Buckley+Mechanical+Services+LLC+reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
            >
              <img 
                src="https://i.postimg.cc/G3W4xvZQ/icons8_google_50.png" 
                alt="Google" 
                className="w-6 h-6" 
                loading="lazy"
                decoding="async"
              />
              Review us on Google
            </a>
            <a 
              href="https://www.facebook.com/Buckleyhvac/reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white hover:bg-[#166fe5] px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(24,119,242,0.39)]"
            >
              <Facebook className="w-6 h-6 fill-current" />
              Review us on Facebook
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-surface p-8 rounded-2xl border border-navy-light/20 hover:border-burnt-orange/30 transition-all relative"
            >
              <div className="absolute top-6 right-6 opacity-20">
                {review.source === 'Google' ? (
                  <img 
                    src="https://i.postimg.cc/BQCJPDs0/icons8_google_50_(1).png" 
                    alt="Google" 
                    className="w-6 h-6 grayscale" 
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Facebook className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-burnt-orange fill-current' : 'text-slate-600'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-white font-bold">{review.name}</span>
                <span className="text-slate-500 text-xs">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center">
            <button 
              onClick={loadMore}
              className="bg-navy hover:bg-navy-light text-white px-8 py-3 rounded-full font-bold transition-colors inline-flex items-center gap-2"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
