import React from 'react';
import { ShieldCheck, HelpCircle, Check } from 'lucide-react';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 bg-brand-dark border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 sm:mb-12">
          <div className="group bg-gradient-to-r from-brand-gray to-brand-black rounded-[1.5rem] sm:rounded-[2rem] p-1 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
             <div className="bg-brand-black h-full rounded-[1.4rem] sm:rounded-[1.9rem] p-6 sm:p-8 md:p-16 relative z-10 overflow-hidden">
                 <HelpCircle className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 text-brand-gray/20 -rotate-12" />

                 <div className="relative z-20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-md">
                            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <span className="text-brand-primary font-bold tracking-wide uppercase text-xs sm:text-sm">Главное Возражение</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-display">"Это работа 'за процент'?"</h3>
                    <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                        <p>
                            <span className="text-white font-bold bg-red-500/10 px-2 py-1 rounded">Нет.</span> Работа "за процент" — это роль sales-менеджера, где вы получаете крохи.
                        </p>
                        <p>
                            Партнерство в ScaleX — это уровень C-Level. Вы управляете P&L (прибылями и убытками) и забираете <span className="text-brand-primary font-bold text-lg sm:text-xl px-2">30-50% от Net Profit</span>, который создала ваша команда. Это модель Venture Builder, а не найма.
                        </p>
                    </div>
                 </div>
             </div>
          </div>
        </div>

        <div className="bg-brand-gray/30 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 p-6 sm:p-8 md:p-12 relative overflow-hidden hover:border-brand-success/30 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-success via-transparent to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-10 relative z-10">
                <div className="shrink-0">
                     <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-success/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-brand-success/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
                        <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-brand-success" />
                     </div>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 font-display">Наша Гарантия</h3>
                    <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
                        Венчур — это риск. Но мы берем риск "пустого портфолио" на себя. Даже если гипотеза не сработает, вы выигрываете:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {[
                            "Сильный AI-кейс в портфолио",
                            "Доступ к методологии ScaleX",
                            "Нетворк с фаундерами",
                            "Приоритет на новые проекты"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-300 bg-brand-black/50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/5">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-success/20 flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-success" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};