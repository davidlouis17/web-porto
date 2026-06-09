/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AccessibilityMenu from './components/AccessibilityMenu';
import { SectionType } from './types';
import { forceSyncFromCloud } from './firebase';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('beranda');

  // Load latest data directly from Cloud Firestore manual synchronization on mount
  useEffect(() => {
    forceSyncFromCloud();
  }, []);

  // Smooth scroll handler helper
  const handleSectionClick = (sectionId: SectionType) => {
    setActiveSection(sectionId);
    
    // Custom mapping if the HTML IDs slightly differ
    let targetId = sectionId as string;
    if (sectionId === 'beranda') {
      targetId = 'beranda';
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Offset for floating sticky header height
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Setup Dynamic Scroll IntersectionObserver to auto-track active section links
  useEffect(() => {
    const sections: SectionType[] = ['beranda', 'keahlian', 'proyek', 'pengalaman', 'kontak'];
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies focal center
      threshold: 0
    };

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        }, observerOptions);

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#FAF9F6] text-[#1C1917] relative font-sans antialiased selection:bg-[#ca8a04]/20 selection:text-[#ca8a04]">
      {/* a11y Skip Link for Keyboard Navigation Users */}
      <a href="#main-content" className="skip-link">
        Lompati ke Konten Utama (Skip to Content)
      </a>

      {/* Absolute Ambient Background Vectors in Warm Bronze */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-radial-gradient from-[#C5A880]/10 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Sticky Universal Header */}
      <Header activeSection={activeSection} onSectionClick={handleSectionClick} />

      {/* Main Single-Page Stack */}
      <main id="main-content" tabIndex={-1} className="relative z-10 w-full transition-all duration-300 outline-none">
        
        {/* Section 1: Hero Home */}
        <Hero 
          onSeeProjects={() => handleSectionClick('proyek')} 
          onContactMe={() => handleSectionClick('kontak')}
        />

        {/* Section 2: Skills & Expertise Domain */}
        <Skills />

        {/* Section 3: Engineering Projects with Interactive Simulators */}
        <Projects />

        {/* Section 5: Professional Footprint / Storytelling Journey & Certs */}
        <Experience />

        {/* Section 6: Direct Connect & Footer info */}
        <Contact />

      </main>

      {/* Persistent Floating Accessibility Options Drawer */}
      <AccessibilityMenu />
    </div>
  );
}
