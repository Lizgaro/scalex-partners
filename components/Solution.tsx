import React, { useRef, useState, useEffect } from 'react';
import { SOLUTIONS } from '../constants';
import { Zap, Users, Coins, Check } from 'lucide-react';

const iconMap = {
  Zap,
  Users,
  Coins
};

const useOnScreen = (ref: any) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref]);
    return isIntersecting;
  };

export const Solution: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-brand-black relative overflow-hidden border-t border-white/5" ref={ref}>
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-brand-black to-brand-black pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 sm:mb-8">
            Больше, чем работа. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Экосистема Влияния.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed px-4">
            ScaleX — это среда, вырастившая проекты на 700 млн выручки. Мы не ищем исполнителей, мы ищем совладельцев результата.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS.map((solution, index) => {
            const Icon = iconMap[solution.iconName];
            
            // Custom animation based on icon type
            const getIconAnimation = () => {
                switch (solution.iconName) {
                    case 'Zap': // Growth/Speed
                        return 'group-hover:-rotate-12 group-hover:scale-125 group-hover:text-brand-cyan group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]';
                    case 'Users': // Connections
                        return 'group-hover:scale-110 group-hover:text-brand-primary group-hover:translate-x-1';
                    case 'Coins': // Money
                        return 'group-hover:rotate-[360deg] group-hover:scale-110 group-hover:text-brand-accent duration-700 ease-in-out';
                    default:
                        return 'group-hover:scale-110 group-hover:text-brand-primary';
                }
            };

            return (
              <div 
                key={solution.id} 
                className={`group flex flex-col h-full bg-white/[0.02] backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] p-1 border border-white/10 hover:border-brand-primary/50 transition-all duration-700 active:scale-[0.98] sm:hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-full bg-brand-dark/50 rounded-[1.4rem] sm:rounded-[1.8rem] p-6 sm:p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-b from-brand-primary/30 to-transparent transition-opacity duration-500"></div>

                    <div className="flex items-center justify-between mb-8 sm:mb-10 relative z-10">
                        <div className="p-3 sm:p-4 bg-brand-black rounded-xl sm:rounded-2xl border border-white/10 shadow-xl group-hover:scale-110 group-hover:border-brand-primary/30 transition-all duration-300">
                            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-white transition-all duration-500 ${getIconAnimation()}`} />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-brand-black/50">
                            {solution.subtitle}
                        </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-brand-primary transition-colors">{solution.title}</h3>
                    <p className="text-gray-400 leading-relaxed flex-grow text-sm sm:text-base">
                    {solution.description}
                    </p>

                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex items-center gap-2 text-xs sm:text-sm text-brand-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        Доступно после квалификации
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};