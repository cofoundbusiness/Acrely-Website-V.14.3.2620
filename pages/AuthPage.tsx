
import React, { useState, useEffect } from 'react';
import { Mail, User, ArrowRight, CheckCircle2, Loader2, X, Smartphone, ArrowLeft, ShieldCheck, TrendingUp, Activity } from 'lucide-react';
import { Button } from '../components/Button';
import { ViewState } from '../types';

interface AuthPageProps {
  mode: 'login' | 'signup';
  setView: (view: ViewState) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, setView }) => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);

  const isLogin = mode === 'login';

  // Reset state when mode changes
  useEffect(() => {
    setStep('details');
    setFormData({ name: '', email: '', mobile: '' });
    setOtp(['', '', '', '']);
  }, [mode]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setView('home'); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-900 relative transition-colors duration-300">
      {/* Close Button */}
      <button 
        onClick={() => setView('home')}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm group"
        aria-label="Return to Home"
      >
        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Left Column - Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
        <img 
          src={isLogin 
            ? "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1500" 
            : "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?auto=format&fit=crop&q=80&w=1500"
          } 
          alt="Luxury Home" 
          className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite] scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-16 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
           
           {/* Top Section with Logo & Stats */}
           <div>
             <div className="flex items-center gap-2 mb-16">
               <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white font-bold border border-white/30">A</div>
               <span className="text-white font-bold text-xl tracking-tight">acrely.</span>
             </div>

             {/* Decorative Floating Cards - Fills the empty space */}
             <div className="space-y-6">
               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl inline-flex items-center gap-4 animate-slide-in-right hover:bg-white/20 transition-colors cursor-default" style={{animationDelay: '0.2s'}}>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                     <TrendingUp className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-0.5">Market Watch</p>
                     <p className="text-white font-bold text-sm">Bangalore Prices <span className="text-emerald-400 ml-1">↑ 8.4%</span></p>
                  </div>
               </div>
               
               <div className="block"></div> {/* Spacer */}

               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl inline-flex items-center gap-4 animate-slide-in-right ml-12 hover:bg-white/20 transition-colors cursor-default" style={{animationDelay: '0.4s'}}>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                     <Activity className="text-amber-400 w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-0.5">Recent Activity</p>
                     <p className="text-white font-bold text-sm">34 New Listings <span className="text-slate-400 font-normal ml-1">today</span></p>
                  </div>
               </div>
             </div>
           </div>
           
           {/* Bottom Section */}
           <div className="space-y-6 animate-slide-up">
             <div className="flex gap-1 text-amber-400">
               {[1,2,3,4,5].map(i => <CheckCircle2 key={i} className="w-5 h-5 fill-amber-500/20" />)}
             </div>
             <blockquote className="text-2xl font-medium text-white leading-relaxed max-w-lg">
               "{isLogin ? "Welcome back. The market has been moving while you were away." : "Join 15,000+ investors and homeowners making smarter decisions with Acrely."}"
             </blockquote>
             <div className="flex items-center gap-3 pt-4 border-t border-white/20">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" className="w-10 h-10 rounded-full border-2 border-white/50" />
               <div className="text-white">
                 <div className="text-sm font-bold">Sarah Jenkins</div>
                 <div className="text-xs text-slate-300">Saved ₹12L on her first purchase</div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-fade-in relative">
          
          {step === 'otp' && (
             <button 
               onClick={() => setStep('details')}
               className="absolute -top-12 left-0 text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
             >
               <ArrowLeft className="w-4 h-4" /> Back
             </button>
          )}

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {step === 'otp' ? 'Verify it\'s you' : (isLogin ? 'Welcome back' : 'Create an account')}
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {step === 'otp' 
                ? `We've sent a 4-digit code to +91 ${formData.mobile}` 
                : (isLogin ? 'Enter your mobile number to sign in.' : 'Start your journey to smarter real estate.')}
            </p>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      name="name"
                      type="text" 
                      required={!isLogin}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400 dark:focus:border-slate-500 outline-none transition-all text-slate-900 dark:text-white"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile Number</label>
                <div className="relative flex">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-300 dark:border-slate-600 pr-2">
                     <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">🇮🇳 +91</span>
                  </div>
                  <input 
                    name="mobile"
                    type="tel" 
                    required 
                    maxLength={10}
                    placeholder="98765 43210"
                    className="w-full pl-20 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400 dark:focus:border-slate-500 outline-none transition-all font-mono text-lg tracking-wide text-slate-900 dark:text-white"
                    value={formData.mobile}
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                         handleChange(e);
                      }
                    }}
                  />
                  <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                     <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      name="email"
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400 dark:focus:border-slate-500 outline-none transition-all text-slate-900 dark:text-white"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 pt-1">We'll send market updates and property alerts here.</p>
                </div>
              )}

              <Button className="w-full py-4 mt-2" size="lg" disabled={isLoading || formData.mobile.length < 10}>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Get OTP <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-3 md:gap-4 my-8">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-14 h-16 md:w-16 md:h-20 text-center text-2xl md:text-3xl font-bold bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-amber-500 dark:focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-slate-900 dark:text-white"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              
              <div className="text-center">
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                   Didn't receive code? <button type="button" className="text-amber-600 font-bold hover:text-amber-700">Resend in 30s</button>
                 </p>
                 <Button className="w-full py-4" size="lg" disabled={isLoading || otp.join('').length < 4}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Verify & Continue <ShieldCheck className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {step === 'details' && (
            <>
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                    <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
                    GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                    onClick={() => setView(isLogin ? 'signup' : 'login')} 
                    className="font-bold text-slate-900 dark:text-white hover:text-amber-600 transition-colors"
                    >
                    {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
