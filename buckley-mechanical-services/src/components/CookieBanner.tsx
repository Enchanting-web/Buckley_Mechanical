import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-navy/95 backdrop-blur-xl border border-navy-light/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-burnt-orange/10 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-burnt-orange" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-center md:justify-start gap-2">
                We value your privacy
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                Read our <Link to="/privacy-policy" className="text-burnt-orange hover:underline">Privacy Policy</Link> for more details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 rounded-xl border border-navy-light/30 text-slate-300 text-sm font-bold hover:bg-white/5 transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-xl bg-burnt-orange hover:bg-orange-600 text-white text-sm font-black shadow-lg shadow-burnt-orange/20 transition-all whitespace-nowrap"
              >
                Accept All
              </button>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
