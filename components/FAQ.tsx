import React from 'react';
import { ShieldCheck, HelpCircle, Check } from 'lucide-react';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-32 bg-brand-dark border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <div className="group bg-gradient-to-r from-brand-gray to-brand-black rounded-[2rem] p-1 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
             <div className="bg-brand-black h-full rounded-[1.9rem] p-8 md:p-16 relative z-10 overflow-hidden">
                 {/* Icon BG */}
                 <HelpCircle className="absolute top-10 right-10 w-64 h-64 text-brand-gray/20 -rotate-12" />

                 <div className="relative z-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-brand-primary font-bold tracking-wide uppercase text-sm">Главное Возражение</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">"Это работа 'за процент'?"</h3>
                    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                            <span className="text-white font-bold bg-red-500/10 px-2 py-1 rounded">Нет.</span> Работа "за процент" — это роль sales-менеджера, где вы получаете крохи.
                        </p>
                        <p>
                            Партнерство в ScaleX — это уровень C-Level. Вы управляете P&L (прибылями и убытками) и забираете <span className="text-brand-primary font-bold text-xl px-2">30-50% от Net Profit</span>, который создала ваша команда. Это модель Venture Builder, а не найма.
                        </p>
                    </div>
                 </div>
             </div>
          </div>
        </div>

        <div className="bg-brand-gray/30 rounded-[2rem] border border-white/5 p-8 md:p-12 relative overflow-hidden hover:border-brand-success/30 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-success via-transparent to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
                <div className="shrink-0">
                     <div className="w-20 h-20 bg-brand-success/10 rounded-2xl flex items-center justify-center border border-brand-success/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
                        <ShieldCheck className="w-10 h-10 text-brand-success" />
                     </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-display">Наша Гарантия</h3>
                    <p className="text-gray-400 mb-8 text-lg">
                        Венчур — это риск. Но мы берем риск "пустого портфолио" на себя. Даже если гипотеза не сработает, вы выигрываете:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Сильный AI-кейс в портфолио",
                            "Доступ к методологии ScaleX",
                            "Нетворк с фаундерами",
                            "Приоритет на новые проекты"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300 bg-brand-black/50 p-3 rounded-xl border border-white/5">
                                <div className="w-5 h-5 rounded-full bg-brand-success/20 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-brand-success" />
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