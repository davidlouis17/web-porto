/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Settings, Check, RefreshCw, Volume2, Type, Eye, EyeOff, Sparkles, HelpCircle } from 'lucide-react';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Initialize accessibility settings on mount from LocalStorage
  useEffect(() => {
    const storedText = localStorage.getItem('a11y-large-text') === 'true';
    const storedContrast = localStorage.getItem('a11y-high-contrast') === 'true';
    const storedMotion = localStorage.getItem('a11y-reduced-motion') === 'true';

    setIsLargeText(storedText);
    setIsHighContrast(storedContrast);
    setIsReducedMotion(storedMotion);

    applyAccessibilityState('large-text', storedText);
    applyAccessibilityState('high-contrast', storedContrast);
    applyAccessibilityState('reduced-motion', storedMotion);
  }, []);

  const applyAccessibilityState = (key: string, value: boolean) => {
    const htmlEl = document.documentElement;
    if (key === 'large-text') {
      if (value) {
        htmlEl.setAttribute('data-zoom', 'lg');
      } else {
        htmlEl.removeAttribute('data-zoom');
      }
    } else if (key === 'high-contrast') {
      if (value) {
        htmlEl.setAttribute('data-contrast', 'high');
      } else {
        htmlEl.removeAttribute('data-contrast');
      }
    } else if (key === 'reduced-motion') {
      if (value) {
        htmlEl.setAttribute('data-motion', 'reduced');
      } else {
        htmlEl.removeAttribute('data-motion');
      }
    }
  };

  const toggleLargeText = () => {
    const newValue = !isLargeText;
    setIsLargeText(newValue);
    localStorage.setItem('a11y-large-text', String(newValue));
    applyAccessibilityState('large-text', newValue);
    announceAccessibilityChange(`Mode perbesar teks telah ${newValue ? 'diaktifkan' : 'dimatikan'}.`);
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('a11y-high-contrast', String(newValue));
    applyAccessibilityState('high-contrast', newValue);
    announceAccessibilityChange(`Mode kontras tinggi telah ${newValue ? 'diaktifkan' : 'dimatikan'}.`);
  };

  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    localStorage.setItem('a11y-reduced-motion', String(newValue));
    applyAccessibilityState('reduced-motion', newValue);
    announceAccessibilityChange(`Mode matikan animasi telah ${newValue ? 'diaktifkan' : 'dimatikan'}.`);
  };

  const resetAccessibility = () => {
    setIsLargeText(false);
    setIsHighContrast(false);
    setIsReducedMotion(false);

    localStorage.setItem('a11y-large-text', 'false');
    localStorage.setItem('a11y-high-contrast', 'false');
    localStorage.setItem('a11y-reduced-motion', 'false');

    applyAccessibilityState('large-text', false);
    applyAccessibilityState('high-contrast', false);
    applyAccessibilityState('reduced-motion', false);

    announceAccessibilityChange("Pengaturan aksesibilitas telah diatur ulang.");
  };

  // Helper function to announce changes to Screen Readers dynamically (aria-live)
  const announceAccessibilityChange = (message: string) => {
    const announcer = document.getElementById('a11y-live-announcer');
    if (announcer) {
      announcer.textContent = message;
      // Temporary exposure to let screen reader cache update
      setTimeout(() => {
        announcer.textContent = '';
      }, 5000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 font-sans" id="a11y-floating-anchor">
      {/* Off-screen active live announcer for screen-readers (vocal feedback) */}
      <div
        id="a11y-live-announcer"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      ></div>

      {/* Floating control drawer */}
      {isOpen && (
        <div
          id="a11y-panel-card"
          className="bottom-16 right-0 mb-3 absolute w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-5 rounded-2xl shadow-xl space-y-4 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Panel Pengaturan Aksesibilitas"
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2.5">
            <h4 className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
              <span>Aksesibilitas</span>
            </h4>
            <button
              onClick={resetAccessibility}
              className="text-[10px] font-mono text-amber-700 hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer outline-none focus:ring-1 focus:ring-amber-500 rounded p-1"
              aria-label="Atur ulang semua opsi aksesibilitas"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Toggle 1: Large Text */}
            <div className="flex items-center justify-between text-xs text-left">
              <div className="flex-1 pr-2">
                <span className="block font-semibold text-stone-800 dark:text-stone-105">Perbesar Teks</span>
                <span className="text-[10px] text-stone-400 block leading-tight">Meningkatkan ukuran huruf global 15%</span>
              </div>
              <button
                onClick={toggleLargeText}
                aria-pressed={isLargeText}
                aria-label={`Mode perbesar teks saat ini ${isLargeText ? "aktif" : "aktifkan"}`}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shrink-0 cursor-pointer ${
                  isLargeText ? 'bg-amber-600' : 'bg-stone-200 dark:bg-stone-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                  isLargeText ? 'translate-x-5' : 'translate-x-0'
                }`}>
                  {isLargeText && <Check className="w-3 h-3 text-amber-600" />}
                </div>
              </button>
            </div>

            {/* Toggle 2: High Contrast */}
            <div className="flex items-center justify-between text-xs text-left">
              <div className="flex-1 pr-2">
                <span className="block font-semibold text-stone-800 dark:text-stone-105">Kontras Tinggi</span>
                <span className="text-[10px] text-stone-400 block leading-tight">Kontras maksimal untuk pembacaan jelas</span>
              </div>
              <button
                onClick={toggleHighContrast}
                aria-pressed={isHighContrast}
                aria-label={`Mode kontras tinggi saat ini ${isHighContrast ? "aktif" : "aktifkan"}`}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shrink-0 cursor-pointer ${
                  isHighContrast ? 'bg-amber-600' : 'bg-stone-200 dark:bg-stone-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                  isHighContrast ? 'translate-x-5' : 'translate-x-0'
                }`}>
                  {isHighContrast && <Check className="w-3 h-3 text-amber-600" />}
                </div>
              </button>
            </div>

            {/* Toggle 3: Reduced Motion */}
            <div className="flex items-center justify-between text-xs text-left">
              <div className="flex-1 pr-2">
                <span className="block font-semibold text-stone-800 dark:text-stone-105">Matikan Animasi</span>
                <span className="text-[10px] text-stone-400 block leading-tight">Hilangkan gerakan transisi motion</span>
              </div>
              <button
                onClick={toggleReducedMotion}
                aria-pressed={isReducedMotion}
                aria-label={`Mode matikan animasi saat ini ${isReducedMotion ? "aktif" : "aktifkan"}`}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shrink-0 cursor-pointer ${
                  isReducedMotion ? 'bg-amber-600' : 'bg-stone-200 dark:bg-stone-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                  isReducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}>
                  {isReducedMotion && <Check className="w-3 h-3 text-amber-600" />}
                </div>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[9px] text-stone-400 leading-tight flex items-start gap-1">
            <HelpCircle className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
            <span>Desain ramah keyboard navigation. Tab untuk meng-highlight elemen secara berurutan.</span>
          </div>
        </div>
      )}

      {/* Main trigger button */}
      <button
        id="a11y-trigger-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="a11y-panel-card"
        aria-label="Panel Opsi Aksesibilitas"
        title="Menu Aksesibilitas"
        className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg relative cursor-pointer focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 outline-none group"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3" id="a11y-button-dot">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <Type className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
}
