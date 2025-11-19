import React, { useRef, useEffect, useState } from 'react';
import { PAIN_POINTS } from '../constants';
import { TrendingDown, Lock, Shuffle, EggOff, AlertTriangle } from 'lucide-react';

const iconMap = {
  TrendingDown,
  Lock,
  Shuffle,
  EggOff
};

// Hook for scroll reveal
const useOnScreen = (ref: any, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
};

export const PainPoints: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, "-50px");

  return (
    <section className="py-32 bg-brand-black relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-20 max-w-3xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-red-500 font-mono uppercase tracking-widest text-sm">System Failure</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Рынок в аду. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Зарплата — это тупик.</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed border-l-2 border-red-500/30 pl-6">
            AI меняет правила игры с невероятной скоростью. Пока вы ждете повышения оклада, алгоритмы обесценивают рутинные навыки. Вы либо "Стратег", либо "Устаревший".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAIN_POINTS.map((pain, index) => {
            const Icon = iconMap[pain.iconName];
            return (
              <div 
                key={pain.id} 
                className={`group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-red-500/50 hover:to-orange-500/50 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-brand-gray/90 backdrop-blur-xl rounded-[22px] p-8 md:p-10 relative overflow-hidden">
                    {/* Hover Gradient Blob */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-brand-black border border-white/10 flex items-center justify-center mb-8 group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)] transition-all duration-300">
                            <Icon className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-red-400 transition-colors">{pain.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{pain.description}</p>
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