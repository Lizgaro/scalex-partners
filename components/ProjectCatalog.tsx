
import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, Lock, Terminal, ArrowLeft, ArrowRight, Activity, X, Zap, CheckCircle } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

const FOMO_MESSAGES = [
  "⚡️ Александр К. (Москва) начал квалификацию в SkyPay",
  "👁️ 24 стратега сейчас изучают карточку SpeakyGo",
  "🔒 Metadoor-dev: Осталось 1 место в слот Alpha",
  "🚀 Елена В. (СПб) получила доступ к Find The Job",
  "📈 ChallengeLife: Одобрен бюджет на тест гипотезы",
  "⚠️ Внимание: Высокая активность в секторе FINTECH",
  "🔥 Новая заявка на партнерство от ex-Yandex менеджера"
];

export const ProjectCatalog: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // FOMO Ticker State
  const [fomoIndex, setFomoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Ticker Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setFomoIndex((prev) => (prev + 1) % FOMO_MESSAGES.length);
        setIsFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectClick = (projectId: string) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      trackEvent(ANALYTICS_EVENTS.PROJECT_VIEW, {
        projectId: project.id,
        projectTitle: project.title,
        category: 'interaction'
      });
      document.body.style.overflow = 'hidden'; // Lock scroll
    }
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset'; // Unlock scroll
  };

  return (
    <section id="projects" className="py-32 bg-brand-black relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent opacity-50"></div>
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-brand-primary font-mono text-xs tracking-[0.2em] uppercase">Live Assets Database • 8 Projects</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
                  Портфель <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-cyan">Активов</span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                  Проекты, прошедшие Due Diligence. Они ждут GTM-стратегию, а не код. <br/> 
                  <span className="text-white/60 text-sm">Листайте, чтобы выбрать цель.</span>
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
                <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`p-4 rounded-full border transition-all duration-300 ${!canScrollLeft ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white'}`}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`p-4 rounded-full border transition-all duration-300 ${!canScrollRight ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white'}`}
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Carousel Container */}
        <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] snap-center">
                <HoloCard project={project} onClick={handleProjectClick} />
            </div>
          ))}
           
           {/* Coming Soon Card */}
           <div className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] snap-center h-full">
               <div className="group relative h-full min-h-[550px] rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center p-8 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                   <div className="relative z-10">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 border border-white/5">
                            <Lock className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-300 font-display tracking-wider">CLASSIFIED</h3>
                        <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-widest">Доступ после NDA</p>
                   </div>
               </div>
           </div>
        </div>
        
        {/* Dynamic FOMO Ticker */}
        <div className="mt-6 border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
            {/* Live Status */}
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
                </span>
                <span className="text-brand-success tracking-widest font-bold">LIVE FEED</span>
            </div>

            {/* Dynamic Message */}
            <div className="flex-grow flex justify-center md:justify-start w-full md:w-auto overflow-hidden relative h-6">
                <div className={`absolute w-full text-center md:text-left transition-all duration-500 transform ${isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} flex items-center justify-center md:justify-start gap-2`}>
                   <Activity className="w-3 h-3 text-brand-primary hidden sm:block" />
                   <span className="text-gray-300 uppercase tracking-tight">{FOMO_MESSAGES[fomoIndex]}</span>
                </div>
            </div>

            {/* Slots Status */}
            <div className="hidden lg:flex items-center gap-2 bg-red-500/5 px-3 py-1.5 rounded-full border border-red-500/10">
                <span>AVAILABLE SLOTS:</span>
                <span className="text-red-400 animate-pulse font-bold">CRITICAL LOW</span>
            </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProjectModal} />
        )}

      </div>
    </section>
  );
};

const HoloCard = ({ project, onClick }: { project: Project, onClick: (id: string) => void }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [normalizedPos, setNormalizedPos] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePos({ x, y });
        
        // Calculate normalized position (-1 to 1) for parallax
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;
        setNormalizedPos({ x: normX, y: normY });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
        trackEvent(ANALYTICS_EVENTS.PROJECT_HOVER, { projectId: project.id });
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setNormalizedPos({ x: 0, y: 0 }); // Reset parallax
    };

    return (
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project.id)}
            className="group relative flex flex-col h-full min-h-[550px] rounded-[2rem] bg-[#0A0A0A] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-brand-primary/20 transform-gpu"
        >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 p-[1px] rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent group-hover:from-brand-primary/50 group-hover:via-brand-cyan/30 group-hover:to-brand-accent/50 transition-colors duration-500 z-0">
                <div className="absolute inset-0 bg-[#0A0A0A] rounded-[2rem] m-[1px]" />
            </div>

            {/* Spotlight Effect */}
            <div 
                className="pointer-events-none absolute inset-0 transition duration-300 group-hover:opacity-100 z-30 mix-blend-overlay"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
                }}
            />
            
            {/* Image Area with Parallax */}
            <div className="h-72 w-full relative overflow-hidden shrink-0 rounded-t-[2rem] z-10">
                <div className="absolute inset-0 bg-brand-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-20"></div>
                
                {/* Scanning Line Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20 translate-y-[-100%] group-hover:animate-scan opacity-0 group-hover:opacity-100"></div>

                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-[110%] h-[110%] object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-100 ease-out absolute top-[-5%] left-[-5%]"
                    style={{
                        // Parallax effect: move image opposite to mouse direction
                        transform: `translate(${normalizedPos.x * -15}px, ${normalizedPos.y * -15}px) scale(1.05)`
                    }}
                    loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-30">
                     <div className={`backdrop-blur-md border px-3 py-1 rounded-full flex items-center gap-2 shadow-lg transition-transform duration-300 group-hover:translate-y-1 ${project.category === 'ENTERPRISE' ? 'bg-purple-900/60 border-purple-500/30 text-purple-200' : 'bg-black/60 border-white/10 text-white'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${project.category === 'ENTERPRISE' ? 'bg-purple-400' : 'bg-green-400'}`}></div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{project.category}</span>
                     </div>
                </div>

                <div className="absolute top-4 right-4 z-30">
                     <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="w-5 h-5" />
                     </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow relative z-20 mt-[-1rem]">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 transition-transform duration-500 group-hover:-translate-y-1">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/5 px-2 py-1 rounded-md group-hover:border-white/20 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-cyan transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3 font-light flex-grow group-hover:text-gray-300 transition-colors">
                    {project.description}
                </p>
                
                {/* Stats Block - Slides up slightly on hover */}
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 group-hover:border-brand-primary/30 transition-all duration-500 mt-auto group-hover:bg-white/[0.05] group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/50">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-primary uppercase mb-3 border-b border-white/5 pb-2">
                        <Terminal className="w-3 h-3" />
                        <span>{project.rocketReason.title}</span>
                    </div>
                    <div className="space-y-2">
                        {project.rocketReason.points.map((point: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                                <span className="mt-0.5 text-brand-accent">▹</span>
                                <span className="leading-relaxed">{point.replace("🚀", "").trim()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Premium Modal Component ---
const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
       {/* Backdrop */}
       <div 
         className="absolute inset-0 bg-[#030303]/90 backdrop-blur-xl transition-opacity duration-300 animate-fade-in-up"
         onClick={onClose}
         style={{ animationDuration: '0.3s' }}
       />

       {/* Modal Content */}
       <div 
         className="relative w-full max-w-5xl bg-[#0A0A0A] rounded-[2rem] border border-white/10 shadow-2xl shadow-brand-primary/10 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up"
         style={{ animationDuration: '0.4s' }}
       >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 group"
          >
             <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Header Image */}
          <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10"></div>
             <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay z-10"></div>
             <img 
               src={project.imageUrl} 
               alt={project.title}
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex items-end justify-between">
                <div>
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md mb-4 ${project.category === 'ENTERPRISE' ? 'bg-purple-900/60 border-purple-500/30 text-purple-200' : 'bg-green-900/60 border-green-500/30 text-green-200'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">{project.category}</span>
                   </div>
                   <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tighter">
                     {project.title}
                   </h2>
                </div>
             </div>
          </div>

          {/* Body */}
          <div className="flex-grow overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
             {/* Left Column: Description */}
             <div className="md:col-span-2 space-y-8">
                <div>
                   <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Briefing</h3>
                   <p className="text-xl text-gray-300 leading-relaxed font-light">
                     {project.description}
                   </p>
                </div>

                <div>
                   <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Target Vectors</h3>
                   <div className="flex flex-wrap gap-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-300 font-mono text-sm">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>

                 <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <div className="flex items-center gap-3 mb-2 text-brand-primary">
                       <Zap className="w-5 h-5" />
                       <span className="font-bold uppercase tracking-wide text-sm">Mission Objective</span>
                    </div>
                    <p className="text-gray-400">
                       Разработать и внедрить GTM-стратегию для масштабирования данного актива. Полное управление P&L.
                    </p>
                 </div>
             </div>

             {/* Right Column: Stats */}
             <div className="md:col-span-1">
                <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 text-sm font-mono text-brand-cyan uppercase mb-6 border-b border-white/5 pb-4">
                        <Terminal className="w-4 h-4" />
                        <span>System Intel</span>
                    </div>
                    
                    <div className="space-y-6 flex-grow">
                        {project.rocketReason.points.map((point, idx) => {
                           const [label, value] = point.replace("🚀", "").split(":").map(s => s.trim());
                           return (
                             <div key={idx} className="group">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                                <div className="text-white font-medium border-l-2 border-brand-accent/50 pl-3 group-hover:border-brand-primary transition-colors">
                                   {value || label}
                                </div>
                             </div>
                           )
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <a 
                          href="#qualify"
                          onClick={onClose}
                          className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors gap-2 group"
                        >
                           <span>Подать заявку</span>
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                           <CheckCircle className="w-3 h-3 text-brand-success" />
                           <span>Slots Available</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
