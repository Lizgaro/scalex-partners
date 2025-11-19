import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        className={`
          transition-all duration-500 ease-in-out
          ${isScrolled ? 'w-[90%] md:w-[600px] bg-brand-black/60 border-white/10 shadow-2xl shadow-brand-primary/10' : 'w-full max-w-7xl bg-transparent border-transparent'}
          backdrop-blur-xl border rounded-full px-2 py-2 flex justify-between items-center
        `}
      >
        {/* Logo Area */}
        <div className={`flex items-center gap-2 pl-4 ${isScrolled ? '' : ''}`}>
          <div className="relative group cursor-pointer">
             <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-cyan rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
             <div className="relative flex items-center justify-center w-8 h-8">
                {/* Custom 'X' Logo SVG */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300">
                  <path d="M18.6 4H15.4L12 9.1L8.6 4H5.4L10.4 11.5L5 19.6H8.2L12 13.9L15.8 19.6H19L13.6 11.5L18.6 4Z" fill="currentColor"/>
                  <path d="M18.6 4H15.4L12 9.1L8.6 4H5.4L10.4 11.5L5 19.6H8.2L12 13.9L15.8 19.6H19L13.6 11.5L18.6 4Z" fill="url(#paint0_linear)" fillOpacity="0.5"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="5" y1="4" x2="19" y2="19.6" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1"/>
                      <stop offset="1" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
             </div>
          </div>
          <span className={`font-display font-bold tracking-wide text-white transition-all duration-300 ${isScrolled ? 'text-base' : 'text-xl'}`}>
            Scale<span className="text-brand-primary">X</span>
          </span>
        </div>
        
        {/* Desktop Menu - Centered or Right aligned based on mode */}
        <div className="hidden md:flex items-center gap-1">
          {['Проекты', 'Процесс', 'Гарантии'].map((item, index) => {
            const hrefs = ['#projects', '#how-it-works', '#faq'];
            return (
              <a 
                key={item}
                href={hrefs[index]} 
                className="text-xs font-medium text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a 
          href="#qualify"
          className="relative group overflow-hidden rounded-full p-[1px]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-accent rounded-full opacity-70 group-hover:opacity-100 group-hover:animate-shine bg-[length:200%_100%] transition-all duration-500"></span>
          <div className="relative px-5 py-2 bg-brand-black rounded-full flex items-center gap-2 transition-all group-hover:bg-brand-black/80">
            <span className="text-xs font-bold text-white tracking-wide">
              Вход
            </span>
            <Sparkles className="w-3 h-3 text-brand-cyan group-hover:rotate-12 transition-transform" />
          </div>
        </a>
      </nav>
    </div>
  );
};