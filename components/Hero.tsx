import React, { useEffect, useRef } from 'react';
import { HERO_DATA } from '../constants';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Track hero view
    trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, { label: 'hero_view', value: 0 });

    // --- Canvas Animation: Neural Network ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    const properties = {
      bgColor: 'rgba(3, 3, 3, 1)',
      particleColor: 'rgba(99, 102, 241, 0.5)', // Indigo
      particleRadius: 3,
      particleCount: 60,
      lineLength: 150,
      particleLife: 6,
    };

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      life: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = (Math.random() * (Math.random() < 0.5 ? -1 : 1));
        this.velocityY = (Math.random() * (Math.random() < 0.5 ? -1 : 1));
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
        this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      reDraw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
        if(!ctx) return;
        let x1, y1, x2, y2, length, opacity;
        for(let i in particles) {
            for(let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`; // Purple lines
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    };

    const loop = () => {
      if (!ctx) return;
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].position();
        particles[i].reDraw();
      }
      drawLines();
      requestAnimationFrame(loop);
    };

    initParticles();
    loop();

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const handleCtaClick = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
      location: 'hero_section',
      label: 'start_qualification',
      category: 'conversion'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden selection:bg-brand-accent selection:text-white">
      
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      
      {/* Gradient Spotlights */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* 2025 Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 animate-fade-in-up hover:bg-white/10 transition-all cursor-default group">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
          </span>
          <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
            Экосистема RevShare <span className="text-brand-gray">|</span> v2.5
          </span>
        </div>

        {/* Main Title with Fluid Typography */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Архитектор
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-cyan text-glow filter drop-shadow-2xl pb-2">
            Роста
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up font-light tracking-wide" style={{ animationDelay: '0.2s' }}>
          Получите доступ к закрытому портфелю AI-стартапов. <br/>
          Управляйте стратегией. <span className="text-white font-medium">Владейте результатом.</span>
        </p>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href={HERO_DATA.ctaLink}
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-transform active:scale-95"
          >
            <span className="relative z-10 font-bold text-base tracking-wide flex items-center gap-2 group-hover:gap-4 transition-all">
              {HERO_DATA.cta}
              <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-1 group">
             Как это работает <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust Indicator */}
        <div className="mt-20 pt-10 border-t border-white/5 w-full max-w-3xl flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
           {['ACEL', 'Y Combinator', '500 Startups'].map((txt, i) => (
               <span key={i} className="font-display font-bold text-xl">{txt}</span>
           ))}
        </div>
      </div>
    </section>
  );
};