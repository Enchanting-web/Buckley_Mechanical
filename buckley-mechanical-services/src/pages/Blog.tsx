import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Tag, Clock, ChevronRight, X } from 'lucide-react';
import { blogPosts as posts } from '../data/blogPosts';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">HVAC <span className="text-burnt-orange">Insights</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Expert advice, tips, and news from the Buckley Mechanical team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-burnt-orange transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search articles by keyword, category, or title..."
              className="block w-full pl-12 pr-4 py-4 bg-dark-surface border border-navy-light/30 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 focus:border-burnt-orange transition-all shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-dark-surface rounded-2xl overflow-hidden border border-navy-light/20 hover:border-burnt-orange/50 transition-all group hover:-translate-y-2 flex flex-col shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-4 left-4 bg-burnt-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {post.category}
                        </div>
                        <button 
                          onClick={() => setSelectedPost(post)}
                          className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-2 backdrop-blur-sm"
                        >
                          <Search className="w-5 h-5" /> Quick View
                        </button>
                      </div>
                      <div className="p-8 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-burnt-orange transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="mt-auto inline-flex items-center gap-2 text-burnt-orange font-bold hover:text-white transition-colors"
                        >
                          Read Article <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center"
                  >
                    <div className="bg-dark-surface rounded-3xl p-12 border border-navy-light/20 inline-block">
                      <Search className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                      <p className="text-slate-400">Try adjusting your search terms or browse all categories.</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-burnt-orange font-bold hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Recent Posts Widget */}
            <div className="bg-dark-surface rounded-2xl p-8 border border-navy-light/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-burnt-orange" />
                Recent Posts
              </h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-navy-light/20">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight group-hover:text-burnt-orange transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-dark-surface rounded-2xl p-8 border border-navy-light/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Tag className="w-5 h-5 text-burnt-orange" />
                Categories
              </h3>
              <div className="space-y-2">
                {['Maintenance', 'Tips & Tricks', 'Buying Guide', 'Health', 'Announcements'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSearchQuery(cat)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-navy/20 text-slate-400 hover:text-white transition-all group"
                  >
                    <span className="text-sm font-medium">{cat}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-burnt-orange transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-burnt-orange rounded-2xl p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Stay Updated</h3>
              <p className="text-white/80 text-sm mb-6 relative z-10">Get the latest HVAC tips and exclusive offers delivered to your inbox.</p>
              <form className="space-y-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-burnt-orange font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-dark-surface rounded-3xl overflow-hidden border border-navy-light/30 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 bg-dark-bg/50 hover:bg-burnt-orange text-white p-2 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-2 text-burnt-orange text-xs font-bold uppercase tracking-widest mb-4">
                  <Tag className="w-3 h-3" /> {selectedPost.category}
                </div>
                <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-6 text-slate-500 text-xs mb-8 border-b border-navy-light/20 pb-6">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2"><User className="w-4 h-4" /> {selectedPost.author}</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 text-lg italic">
                  {selectedPost.excerpt}
                </p>
                <div className="bg-navy/20 p-6 rounded-2xl border border-navy-light/10 mb-8">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-burnt-orange" /> Key Insights
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={`/blog/${selectedPost.id}`}
                    onClick={() => setSelectedPost(null)}
                    className="flex-1 bg-burnt-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-orange-500/30"
                  >
                    Read Full Article
                  </Link>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex-1 bg-navy hover:bg-navy-light text-white py-4 rounded-xl font-bold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
