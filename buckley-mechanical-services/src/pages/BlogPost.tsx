import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
  const { id } = useParams();

  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="bg-dark-bg min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Post not found</h2>
          <Link to="/blog" className="text-burnt-orange hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl border border-navy-light/20">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <div className="flex items-center gap-4 text-slate-300 text-sm mb-4">
                <span className="bg-burnt-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
            </div>
          </div>

          <div 
            className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-navy-light/20 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Share this article</h3>
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-burnt-orange transition-colors">Facebook</button>
              <button className="text-slate-400 hover:text-burnt-orange transition-colors">Twitter</button>
              <button className="text-slate-400 hover:text-burnt-orange transition-colors">LinkedIn</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
