
import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { Button } from '../components/Button';

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack }) => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen animate-fade-in transition-colors duration-300">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </button>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-slate-800 py-6 max-w-2xl mx-auto">
           <div className="flex items-center gap-2">
             <span className="font-medium text-slate-900 dark:text-white">By {post.author}</span>
           </div>
           <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
           <div className="flex items-center gap-1.5">
             <Calendar className="w-4 h-4" /> {post.date}
           </div>
           <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
           <div className="flex items-center gap-1.5">
             <Clock className="w-4 h-4" /> {post.readTime}
           </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl mb-16">
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-a:text-amber-600 dark:prose-a:text-amber-500 
          prose-img:rounded-2xl prose-img:shadow-lg
          marker:text-amber-500
        ">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Share this article</h4>
            <div className="flex gap-4">
              <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 md:p-10 bg-slate-900 dark:bg-slate-800 rounded-3xl text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-amber-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
             <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h3>
             <p className="text-slate-300 mb-8 max-w-lg mx-auto">Explore verified listings and investment opportunities on Acrely today.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} size="lg">Explore Listings</Button>
               <Button onClick={onBack} variant="outline" className="text-white border-slate-600 hover:bg-white/10 hover:text-white">Back to Blog</Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
