/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { isFirebaseEnabled, fetchCollectionData } from '../firebase';

interface HeroProps {
  onSeeProjects: () => void;
  onContactMe: () => void;
}

export default function Hero({ onSeeProjects, onContactMe }: HeroProps) {
  const [profile, setProfile] = useState({
    nama: "David Louis",
    title: "Informatics Student | Mobile Developer | Cultural Ambassador",
    bio: "Menjembatani inovasi teknologi dengan pelestarian budaya. Memiliki minat mendalam pada pengembangan perangkat lunak, Machine Learning, dan komunikasi publik."
  });

  useEffect(() => {
    const loadProfile = () => {
      const stored = localStorage.getItem("david_louis_portfolio_profile");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setProfile(prev => ({ ...prev, ...parsed }));
        } catch (_) {}
      }
    };
    loadProfile();
    window.addEventListener("storage", loadProfile);
    window.addEventListener("local-storage-update", loadProfile);
    return () => {
      window.removeEventListener("storage", loadProfile);
      window.removeEventListener("local-storage-update", loadProfile);
    };
  }, []);

  const handleExploreJourney = () => {
    const element = document.getElementById('pengalaman');
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const titles = (profile.title || "Informatics Student | Mobile Developer | Cultural Ambassador")
    .split('|')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Dokumen Pengenalan Utama"
    >
      {/* Dynamic Grid Dot Background in Warm Stone Tone */}
      <div className="absolute inset-0 bg-[#FAF9F6] dark:bg-stone-900 z-0 transition-colors">
        <div 
          className="absolute inset-0 bg-[radial-gradient(#e5e5e0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#3c3c39_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" 
          id="grid-overlay" 
        />
        {/* Ivory & Warm Bronze Glow Spots */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#C5A880]/15 blur-[120px] glow-bg" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-600/5 blur-[130px] glow-bg" />
      </div>
 
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center space-y-8">
        {/* Dynamic badge with a11y support */}
        <div id="hero-info" className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#C5A880]/10 border border-[#C5A880]/30 px-4 py-1.5 rounded-full text-[#8c7355] font-mono text-xs w-fit"
            aria-label="Status: Mahasiswa Informatika & Duta Budaya"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Mahasiswa Informatika & Cultural Ambassador</span>
          </motion.div>
 
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-semibold tracking-tight text-4xl sm:text-5xl lg:text-7xl text-stone-900 dark:text-stone-100 leading-tight"
            >
              Halo, Saya <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A1824A] via-[#C5A880] to-[#8c7355]">
                {profile.nama || "David Louis"}
              </span>
            </motion.h1>
 
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-xs sm:text-sm text-stone-600 dark:text-amber-500 font-semibold tracking-wider flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 uppercase"
            >
              {titles.map((title, idx) => (
                <span key={title + idx} className="flex items-center gap-1.5 sm:gap-3">
                  <span>{title}</span>
                  {idx < titles.length - 1 && (
                    <span className="text-stone-300 dark:text-stone-700 font-light" aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </motion.p>
          </div>
 
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-stone-605 dark:text-stone-400 text-sm sm:text-base md:text-[17px] max-w-2xl leading-relaxed font-sans"
          >
            &ldquo;{profile.bio || "Menjembatani inovasi teknologi dengan pelestarian budaya. Memiliki minat mendalam pada pengembangan perangkat lunak, Machine Learning, dan komunikasi publik."}&rdquo;
          </motion.p>
 
          {/* Action Call buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            id="hero-actions"
          >
            <button
              id="cta-explore-journey"
              onClick={handleExploreJourney}
              aria-label="Jelajahi Perjalanan David Louis klik untuk scroll ke timeline"
              className="px-7 py-3.5 rounded-full font-display font-semibold text-xs uppercase tracking-wider text-white bg-[#8c7355] hover:bg-[#70583b] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(140,115,85,0.25)] flex items-center space-x-2 cursor-pointer outline-none"
            >
              <span>Jelajahi Perjalanan Saya</span>
              <Compass className="w-4 h-4" />
            </button>

            <button
              id="cta-projects"
              onClick={onSeeProjects}
              aria-label="Buka proyek-proyek David Louis"
              className="px-7 py-3.5 rounded-full font-display font-semibold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-850 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer outline-none"
            >
              <span>Lihat Karya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
