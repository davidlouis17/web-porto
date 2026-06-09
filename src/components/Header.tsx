/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Landmark, Cpu, Layers, BookOpen, Mail, Lock } from 'lucide-react';
import { SectionType } from '../types';
import { isFirebaseEnabled } from '../firebase';

interface HeaderProps {
  activeSection: SectionType;
  onSectionClick: (section: SectionType) => void;
}

export default function Header({ activeSection, onSectionClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda' as SectionType, label: 'Beranda', icon: <Landmark className="w-4 h-4" /> },
    { id: 'keahlian' as SectionType, label: 'Keahlian', icon: <Cpu className="w-4 h-4" /> },
    { id: 'proyek' as SectionType, label: 'Proyek', icon: <Layers className="w-4 h-4" /> },
    { id: 'pengalaman' as SectionType, label: 'Perjalanan', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'kontak' as SectionType, label: 'Hubungi', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleItemClick = (id: SectionType) => {
    onSectionClick(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-850 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleItemClick('beranda')}
            aria-label="David Louis Homepage Logo"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8c7355] to-[#C5A880] flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform duration-300 group-hover:rotate-6">
              DL
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold tracking-tight text-stone-900 dark:text-white text-base leading-none flex items-center">
                David Louis
                {isFirebaseEnabled ? (
                  <span className="inline-block w-2 h-2 ml-2 rounded-full bg-emerald-500 animate-pulse" title="Cloud Sync Active (Firestore)" />
                ) : (
                  <span className="inline-block w-2 h-2 ml-2 rounded-full bg-amber-500 cursor-help" title="Mode Lokal Terisolasi (Sync Cloud tidak aktif)" />
                )}
              </span>
              <span className="font-mono text-[9px] text-[#8c7355] tracking-widest uppercase mt-0.5 leading-none flex items-center">
                Portfolio
                <span className="ml-1.5 text-[8px] text-stone-400 dark:text-stone-500 normal-case">
                  ({isFirebaseEnabled ? "Cloud Sync" : "Lokal"})
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  aria-label={`Pindah ke bagian ${item.label}`}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 outline-none cursor-pointer ${
                    isActive
                      ? 'text-[#8c7355] dark:text-[#C5A880] bg-[#C5A880]/12 dark:bg-[#C5A880]/15'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-850'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      id={`active-dot-${item.id}`}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#8c7355] rounded-full shadow-xs"
                    />
                  )}
                </button>
              );
            })}

            {/* Standalone Admin Console link removed */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Pilihan Navigasi Mobile"
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-b border-stone-200 dark:border-stone-850 px-4 pt-2 pb-6 space-y-1 shadow-lg transition-all duration-300 text-left">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                aria-label={`Pindah ke bagian ${item.label}`}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-sans text-sm uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#8c7355] dark:text-[#C5A880] bg-[#C5A880]/15 dark:bg-[#C5A880]/18 border-l-4 border-[#8c7355]'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Mobile Admin Link Removed */}
        </div>
      )}
    </header>
  );
}
