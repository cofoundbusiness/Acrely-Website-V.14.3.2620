
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AcrelyAIChat } from './components/AcrelyAIChat';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ViewState, Property, BlogPost } from './types';
import { INITIAL_PROPERTIES, INITIAL_AGENTS } from './constants';
import { MapPin, Mail, Loader2 } from 'lucide-react';
import { Snowfall } from './components/Snowfall';
import { SettingsModal } from './components/SettingsModal';

// Lazy Load Pages for Better Performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Buy = lazy(() => import('./pages/Buy').then(module => ({ default: module.Buy })));
const Invest = lazy(() => import('./pages/Invest').then(module => ({ default: module.Invest })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Careers = lazy(() => import('./pages/Careers').then(module => ({ default: module.Careers })));
const Sell = lazy(() => import('./pages/Sell').then(module => ({ default: module.Sell })));
const Agents = lazy(() => import('./pages/Agents').then(module => ({ default: module.Agents })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(module => ({ default: module.BlogDetail })));
const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));
const ContactForm = lazy(() => import('./components/ContactForm').then(module => ({ default: module.ContactForm })));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
    <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
    <span className="text-sm font-medium animate-pulse">Loading experience...</span>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSnowEnabled, setIsSnowEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) setScrolled(isScrolled);
    };
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Helper to scroll top on view change
  const handleSetView = (newView: ViewState) => {
    if (view === newView && newView !== 'blog-detail') return; 
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen overflow-x-hidden flex flex-col relative transition-colors duration-300">
      {/* Visual Effects */}
      {isSnowEnabled && <Snowfall />}
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        isSnowEnabled={isSnowEnabled}
        toggleSnow={() => setIsSnowEnabled(!isSnowEnabled)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Hide Navbar on Auth Pages */}
      {view !== 'login' && view !== 'signup' && (
        <Navbar 
          view={view} 
          setView={handleSetView} 
          scrolled={scrolled} 
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          {view === 'home' && (
            <Home 
              setView={handleSetView} 
              properties={properties} 
              onPropertyClick={setSelectedProperty} 
            />
          )}
          
          {view === 'buy' && (
            <Buy properties={properties} onPropertyClick={setSelectedProperty} />
          )}
          
          {view === 'invest' && <Invest />}
          
          {view === 'about' && <About />}
          
          {view === 'careers' && <Careers />}
          
          {view === 'sell' && <Sell />}
          
          {view === 'agents' && <Agents />}

          {view === 'blog' && (
            <Blog setView={handleSetView} onPostClick={handlePostClick} />
          )}

          {view === 'blog-detail' && selectedBlogPost && (
            <BlogDetail post={selectedBlogPost} onBack={() => handleSetView('blog')} />
          )}

          {(view === 'login' || view === 'signup') && (
            <AuthPage mode={view} setView={handleSetView} />
          )}

          {view === 'contact' && (
            <div className="pt-24 md:pt-32 pb-20 container mx-auto px-4 md:px-6 animate-fade-in">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="md:sticky md:top-32 order-2 md:order-1 animate-slide-in-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-6">
                    Contact Us
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">Let's start a <br /><span className="text-amber-500">conversation.</span></h1>
                  <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                    Whether you're looking to buy your dream home, sell a property, or invest in fractional ownership, our team is here to help you every step of the way.
                  </p>
                  
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">Headquarters</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">123, Tech Park Road, Whitefield,<br/>Bangalore - 560066</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">Email Us</h3>
                        <a href="mailto:hello@acrely.in" className="text-slate-500 dark:text-slate-400 mt-1 block hover:text-amber-600 dark:hover:text-amber-500">hello@acrely.in</a>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Typical response time: 2 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 animate-slide-up">
                  <ContactForm className="w-full" />
                </div>
              </div>
            </div>
          )}
        </Suspense>
      </main>

      {/* Hide Footer on Auth pages and Invest page (dashboard style) */}
      {view !== 'invest' && view !== 'login' && view !== 'signup' && (
        <Suspense fallback={null}>
          <Footer setView={handleSetView} />
        </Suspense>
      )}

      {/* AI Assistant - Hide on Auth */}
      {view !== 'login' && view !== 'signup' && (
         <AcrelyAIChat properties={properties} agents={INITIAL_AGENTS} />
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
};

export default App;
