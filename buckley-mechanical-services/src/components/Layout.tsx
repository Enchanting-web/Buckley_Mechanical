import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Star, Wrench, Thermometer, Fan, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SchemaMarkup from './SchemaMarkup';
import SearchModal from './SearchModal';
import CookieBanner from './CookieBanner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "Buckley Mechanical Services LLC",
    "image": "https://i.postimg.cc/bNdZxpY8/b155f3958e3fd9aa550d0a6ee8cfe9c34ed69399e7780e4a8101e75e93e1e721.png",
    "@id": "https://buckleyhvac.com",
    "url": "https://buckleyhvac.com",
    "telephone": "(513) 813-1945",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HVAC Services"
    },
    "license": "OH Lic# 49424",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "638 S Main St.",
      "addressLocality": "Monroe",
      "addressRegion": "OH",
      "postalCode": "45050",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.4345,
      "longitude": -84.3622
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/BuckleyMechanicalServices"
    ]
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/#services' },
    { name: 'Our Work', path: '/#work' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/#blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 font-sans">
      <SchemaMarkup data={businessSchema} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CookieBanner />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-dark-bg/90 backdrop-blur-md border-b border-navy-light/30 top-0 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              <div className="absolute -inset-2 bg-white/5 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center p-2 group-hover:shadow-burnt-orange/20 transition-all duration-300 relative z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-navy">
                  <path d="M15 50 L50 20 L85 50" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="65" r="18" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="6 4" />
                  <circle cx="50" cy="65" r="8" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-xl font-black tracking-tight text-white leading-none">BUCKLEY</span>
                <span className="text-[10px] font-bold text-burnt-orange tracking-[0.2em] uppercase">Mechanical Services</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-burnt-orange ${
                    (location.pathname + location.hash) === link.path || (location.pathname === link.path && !location.hash)
                      ? 'text-burnt-orange' 
                      : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Search Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-300 hover:text-burnt-orange transition-colors group relative"
                aria-label="Search website"
              >
                <Search className="w-5 h-5" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-burnt-orange transition-all group-hover:w-full" />
              </button>

              <div className="relative group">
                <div className="absolute -inset-1 bg-burnt-orange rounded-full blur opacity-25 group-hover:opacity-75 animate-pulse transition duration-1000 group-hover:duration-200" />
                <Link
                  to="/client-hub"
                  className="relative bg-burnt-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-black transition-all shadow-[0_0_20px_rgba(204,85,0,0.4)] flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  Client Hub
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Search website"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-surface border-b border-navy-light/30 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      (location.pathname + location.hash) === link.path || (location.pathname === link.path && !location.hash)
                        ? 'bg-navy/30 text-burnt-orange'
                        : 'text-slate-300 hover:bg-navy/20 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/client-hub"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center mt-4 bg-burnt-orange text-white px-5 py-3 rounded-lg font-bold shadow-lg"
                >
                  Access Client Hub
                </Link>
                <div className="pt-4 mt-4 border-t border-navy-light/20 flex justify-center space-x-6">
                  <Link
                    to="/privacy-policy"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs text-slate-400 hover:text-burnt-orange transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms-conditions"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs text-slate-400 hover:text-burnt-orange transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-navy-light/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://i.postimg.cc/bNdZxpY8/b155f3958e3fd9aa550d0a6ee8cfe9c34ed69399e7780e4a8101e75e93e1e721.png" 
                  alt="Buckley Mechanical Services" 
                  className="w-10 h-10 rounded-md shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-lg font-bold text-white">BUCKLEY MECHANICAL</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Providing top-tier HVAC solutions for residential and commercial clients. Quality workmanship and customer satisfaction are our priorities.
              </p>
              <p className="text-burnt-orange text-xs font-bold tracking-wider uppercase">
                OH Lic# 49424
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-navy/50 flex items-center justify-center text-slate-300 hover:bg-burnt-orange hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-navy/50 flex items-center justify-center text-slate-300 hover:bg-burnt-orange hover:text-white transition-colors">
                  <Star className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/privacy-policy" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h3>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">AC Installation & Repair</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">Heating Systems</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">Preventative Maintenance</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">Commercial HVAC</Link></li>
                <li><Link to="/services" className="text-slate-400 hover:text-burnt-orange transition-colors text-sm">Emergency Services</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-burnt-orange shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">638 S Main St. <br />Monroe, OH 45050</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-burnt-orange shrink-0" />
                  <span className="text-slate-400 text-sm">(513) 813-1945</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-burnt-orange shrink-0" />
                  <span className="text-slate-400 text-sm">bryan@buckleyhvac.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Buckley Mechanical Services LLC. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-slate-400 hover:text-burnt-orange text-sm font-medium transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-slate-400 hover:text-burnt-orange text-sm font-medium transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
