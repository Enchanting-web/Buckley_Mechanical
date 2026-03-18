import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, FileText, Layout as LayoutIcon, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

interface SearchResult {
  id: string | number;
  title: string;
  excerpt: string;
  path: string;
  type: 'page' | 'blog';
  category?: string;
}

const staticPages: SearchResult[] = [
  { id: 'home', title: 'Home', excerpt: 'Welcome to Buckley Mechanical Services. Top-tier HVAC solutions.', path: '/', type: 'page' },
  { id: 'about', title: 'About Us', excerpt: 'Learn about our history, values, and expert HVAC team.', path: '/about', type: 'page' },
  { id: 'services', title: 'Our Services', excerpt: 'Comprehensive AC, heating, and maintenance solutions.', path: '/services', type: 'page' },
  { id: 'maintenance', title: 'Maintenance Plan', excerpt: 'Join our subscription plan for priority service and discounts.', path: '/services#maintenance-plan', type: 'page' },
  { id: 'work', title: 'Our Work', excerpt: 'View our recent residential and commercial HVAC projects.', path: '/work', type: 'page' },
  { id: 'reviews', title: 'Customer Reviews', excerpt: 'Read what our clients say about our professional service.', path: '/reviews', type: 'page' },
  { id: 'blog', title: 'HVAC Blog', excerpt: 'Tips, tricks, and industry news for your home comfort.', path: '/blog', type: 'page' },
  { id: 'contact', title: 'Contact Us', excerpt: 'Get a free estimate or schedule your HVAC service today.', path: '/contact', type: 'page' },
  { id: 'client-hub', title: 'Client Hub', excerpt: 'Secure portal for service history, quotes, and payments.', path: '/client-hub', type: 'page' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Search static pages
    const pageResults = staticPages.filter(page => 
      page.title.toLowerCase().includes(searchTerm) || 
      page.excerpt.toLowerCase().includes(searchTerm)
    );

    // Search blog posts
    const blogResults: SearchResult[] = blogPosts
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
      )
      .map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        path: `/blog/${post.id}`,
        type: 'blog',
        category: post.category
      }));

    setResults([...pageResults, ...blogResults]);
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-32">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-dark-surface border border-navy-light/30 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Search Input Area */}
            <div className="p-6 border-b border-navy-light/20 flex items-center gap-4">
              <Search className="w-6 h-6 text-burnt-orange" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for services, blog posts, or pages..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white text-lg placeholder-slate-500"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-navy/30 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {query.trim().length > 0 && results.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-slate-400">No results found for "<span className="text-white">{query}</span>"</p>
                </div>
              )}

              {query.trim().length === 0 && (
                <div className="py-8 px-4">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {staticPages.slice(0, 6).map(page => (
                      <button
                        key={page.id}
                        onClick={() => handleResultClick(page.path)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy/30 text-slate-300 hover:text-white transition-all text-left group"
                      >
                        <LayoutIcon className="w-4 h-4 text-burnt-orange" />
                        <span className="text-sm font-bold uppercase tracking-wider">{page.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
                    Search Results ({results.length})
                  </p>
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result.path)}
                      className="w-full flex items-start gap-4 p-4 rounded-2xl hover:bg-navy/30 transition-all text-left group border border-transparent hover:border-navy-light/20"
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${
                        result.type === 'blog' ? 'bg-burnt-orange/10 text-burnt-orange' : 'bg-navy/30 text-slate-300'
                      }`}>
                        {result.type === 'blog' ? <FileText className="w-5 h-5" /> : <LayoutIcon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-white font-bold truncate group-hover:text-burnt-orange transition-colors">
                            {result.title}
                          </h4>
                          {result.category && (
                            <span className="text-[10px] font-black text-burnt-orange uppercase tracking-widest px-2 py-0.5 bg-burnt-orange/10 rounded-full">
                              {result.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-1">{result.excerpt}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-burnt-orange group-hover:translate-x-1 transition-all shrink-0 self-center" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-navy/20 border-t border-navy-light/20 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-navy/50 rounded border border-navy-light/30">ESC</kbd> to close</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-navy/50 rounded border border-navy-light/30">↵</kbd> to select</span>
              </div>
              <div className="flex items-center gap-1">
                Search by Buckley Mechanical
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
