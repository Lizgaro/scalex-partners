import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { Solution } from './components/Solution';
import { ProjectCatalog } from './components/ProjectCatalog';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { FooterCTA } from './components/FooterCTA';

const App: React.FC = () => {
  
  useEffect(() => {
    // Global Smooth Scroll Handler for Anchor Links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      // Check if it's a local anchor link
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(link.hash);
        if (element) {
          // Calculate offset for fixed header (approx 100px to clear the floating navbar)
          const offset = 100; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-primary selection:text-white">
      <Navbar />
      <Hero />
      <PainPoints />
      <Solution />
      <ProjectCatalog />
      <HowItWorks />
      <FAQ />
      <FooterCTA />
    </main>
  );
};

export default App;