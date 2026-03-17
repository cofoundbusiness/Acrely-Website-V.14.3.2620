
import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost, ViewState } from '../types';
import { BLOG_POSTS } from '../constants';

interface BlogProps {
  setView: (view: ViewState) => void;
  onPostClick: (post: BlogPost) => void;
}

export const Blog: React.FC<BlogProps> = ({ setView, onPostClick }) => {
  
  const handleReadMore = (post: BlogPost) => {
    onPostClick(post);
    setView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen animate-fade-in transition-colors duration-300">
      
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <span className="text-amber-600 font-bold tracking-wider uppercase text-xs mb-4 block animate-slide-up">Our Blog</span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
          Acrely Insights
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
          Guides, market trends, and smart property tips.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <div 
              key={post.id} 
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 group flex flex-col h-full animate-slide-up"
              style={{ animationDelay: `${0.1 * (idx % 3)}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => handleReadMore(post)}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-xs font-bold text-white rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                </div>
                
                <h3 
                  className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors cursor-pointer"
                  onClick={() => handleReadMore(post)}
                >
                  {post.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">By {post.author}</p>
                  
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-500 hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
