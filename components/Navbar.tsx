import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { label: 'Проекты', href: '#projects' },
    { label: 'Процесс', href: '#how-it-works' },
    { label: 'Гарантии', href: '#faq' }
  ];

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
        <nav 
          className={`
            transition-all duration-500 ease-in-out
            ${isScrolled ? 'w-[95%] sm:w-[90%] md:w-[600px] bg-brand-black/60 border-white/10 shadow-2xl shadow-brand-primary/10' : 'w-full max-w-7xl bg-transparent border-transparent'}
            backdrop-blur-xl border rounded-full px-3 sm:px-2 py-2 flex justify-between items-center
          `}
        >
          <div className={`flex items-center gap-2 pl-2 sm:pl-4 ${isScrolled ? '' : ''}`}>
            <div className="relative group cursor-pointer">
               <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-cyan rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
               <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300">
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
            <span className={`font-display font-bold tracking-wide text-white transition-all duration-300 ${isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-xl'}`}>
              Scale<span className="text-brand-primary">X</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-xs font-medium text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="#qualify"
              className="relative group overflow-hidden rounded-full p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-accent rounded-full opacity-70 group-hover:opacity-100 group-hover:animate-shine bg-[length:200%_100%] transition-all duration-500"></span>
              <div className="relative px-3 sm:px-5 py-2 bg-brand-black rounded-full flex items-center gap-1 sm:gap-2 transition-all group-hover:bg-brand-black/80">
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">
                  Вход
                </span>
                <Sparkles className="w-3 h-3 text-brand-cyan group-hover:rotate-12 transition-transform" />
              </div>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div 
        className={`fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={handleMenuClick}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleMenuClick}
              className={`text-3xl font-display font-bold text-white hover:text-brand-primary transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          
          <a
            href="#qualify"
            onClick={handleMenuClick}
            className={`mt-8 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all active:scale-95 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            Начать Отбор
          </a>
        </div>
      </div>
    </>
  );
};