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
    <section id="qualify" className="relative py-40 bg-brand-black overflow-hidden flex items-center justify-center">
      
      {/* Aurora Effect */}
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-5 animate-aurora mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-black via-transparent to-brand-black z-10"></div>
      </div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        
        <div className="mb-12 inline-block">
            <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-gray to-black border border-white/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]">
                 <Rocket className="w-10 h-10 text-white" />
            </div>
        </div>
        
        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter leading-none">
          Готов к <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Масштабу?</span>
        </h2>
        
        <div className="flex flex-col items-center gap-8">
             <a 
               href="#qualify" 
               onClick={handleCtaClick}
               className="group relative h-16 px-12 bg-white text-black rounded-full flex items-center gap-4 overflow-hidden hover:scale-105 transition-transform duration-300"
             >
                <span className="relative z-10 text-lg font-bold tracking-wide">Начать Отбор</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </a>
             
             <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                 Набор в закрытую группу ограничен
             </p>
        </div>

        <div className="mt-32 flex justify-center gap-8 text-xs text-gray-700 font-mono">
            <span>SPL-2025.18.11</span>
            <span>SECURE CONNECTION</span>
            <span>SCALEX CORP</span>
        </div>
      </div>
    </section>
  );
};