import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export const FooterCTA: React.FC = () => {
  const handleCtaClick = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
      location: 'footer_section',
      label: 'start_qualification',
      category: 'conversion'
    });
  };

  return (
    <section id="qualify" className="relative py-20 sm:py-32 md:py-40 bg-brand-black overflow-hidden flex items-center justify-center">
      
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-5 animate-aurora mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-black via-transparent to-brand-black z-10"></div>
      </div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="mb-8 sm:mb-12 inline-block">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-gray to-black border border-white/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]">
                 <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-8 sm:mb-10 tracking-tighter leading-none px-4">
          Готов к <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Масштабу?</span>
        </h2>
        
        <div className="flex flex-col items-center gap-6 sm:gap-8 px-4">
             <a 
               href="#qualify" 
               onClick={handleCtaClick}
               className="group relative w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 bg-white text-black rounded-full flex items-center justify-center gap-3 sm:gap-4 overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300"
             >
                <span className="relative z-10 text-base sm:text-lg font-bold tracking-wide">Начать Отбор</span>
                <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </a>
             
             <p className="text-[10px] sm:text-xs font-mono text-gray-600 uppercase tracking-widest">
                 Набор в закрытую группу ограничен
             </p>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32 flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-gray-700 font-mono">
            <span>SPL-2025.18.11</span>
            <span className="hidden sm:inline">SECURE CONNECTION</span>
            <span>SCALEX CORP</span>
        </div>
      </div>
    </section>
  );
};