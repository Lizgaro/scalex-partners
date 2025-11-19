import React, { useEffect, useRef, useState } from 'react';
import { WORK_STEPS } from '../constants';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Simple logic to highlight steps as they enter center screen
      const stepIndex = Math.min(
        WORK_STEPS.length - 1,
        Math.max(0, Math.floor((windowHeight / 2 - top) / 200))
      );
      
      if (top < windowHeight * 0.8) {
          setActiveStep(stepIndex);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" className="py-32 bg-brand-black relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Путь к Партнерству
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            От заявки до управления P&L за 7 дней. Никакой бюрократии, только спринт.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-brand-gray -translate-x-1/2 rounded-full overflow-hidden">
              <div className="w-full bg-gradient-to-b from-brand-primary via-brand-accent to-brand-cyan transition-all duration-1000 ease-out" style={{ height: `${(activeStep + 1) * 25}%` }}></div>
          </div>

          <div className="space-y-24">
            {WORK_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const isActive = index <= activeStep;
              
              return (
                <div key={step.stepNumber} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-12 relative group`}>
                  
                  {/* Text Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-24 text-left' : 'md:pr-24 md:text-right text-left'} transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10'}`}>
                    <div className={`inline-block mb-4 font-mono font-bold text-4xl ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent' : 'text-brand-gray'}`}>
                      0{step.stepNumber}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 font-display">
                      {step.title}
                    </h3>
                    <div className="text-brand-primary/80 text-sm font-bold uppercase tracking-widest mb-4">{step.subtitle}</div>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Marker */}
                  <div className={`absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${isActive ? 'bg-brand-black border-2 border-brand-primary shadow-[0_0_30px_rgba(99,102,241,0.6)] scale-110' : 'bg-brand-dark border-2 border-brand-gray'}`}>
                    <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isActive ? 'bg-brand-accent' : 'bg-brand-gray'}`}></div>
                  </div>

                  {/* Empty side */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};