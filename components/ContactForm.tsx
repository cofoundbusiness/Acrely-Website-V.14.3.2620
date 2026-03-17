
import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export const ContactForm: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none ${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Get in touch</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">We typically reply within 2 hours during business days.</p>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h4>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">Thanks for reaching out. We've received your message and will get back to you shortly.</p>
          <Button 
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="min-w-[140px]"
          >
            Send another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isLoading}
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                value={formState.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              disabled={isLoading}
              value={formState.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              disabled={isLoading}
              rows={5}
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white font-medium resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-4 text-base" 
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
