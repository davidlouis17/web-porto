/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { isFirebaseEnabled, fetchCollectionData, saveCollectionItem } from '../firebase';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [profile, setProfile] = useState({
    email: "davidlouis857@gmail.com",
    github: "https://github.com/davidlouis",
    linkedin: "https://linkedin.com/in/davidlouis",
    instagram: "https://instagram.com/davidlouis857",
    nama: "David Louis"
  });

  useEffect(() => {
    const loadProfile = () => {
      const storedProfile = localStorage.getItem("david_louis_portfolio_profile");
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          setProfile(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Error parsing profile", e);
        }
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);

    try {
      const messagesKey = "david_louis_portfolio_messages";
      const existing = localStorage.getItem(messagesKey);
      const messagesList = existing ? JSON.parse(existing) : [];
      
      const newMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: formName.trim(),
        email: formEmail.trim(),
        message: formMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false
      };
      
      messagesList.unshift(newMsg);
      localStorage.setItem(messagesKey, JSON.stringify(messagesList));

      if (isFirebaseEnabled) {
        await saveCollectionItem("messages", newMsg.id, newMsg);
      }
      
      // Dispatch storage and local-storage-update events to alert dashboard
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("local-storage-update"));
      try {
        if (window.parent && window.parent !== window) {
          window.parent.dispatchEvent(new Event("local-storage-update"));
        }
      } catch (_) {}
    } catch (err) {
      console.error("Gagal menyimpan pesan ke inbox lokal:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1200);
  };

  const cleanUrlLabel = (urlStr: string, defaultVal: string) => {
    if (!urlStr) return defaultVal;
    // Strip http/https and www.
    let clean = urlStr.replace(/^(https?:\/\/)?(www\.)?/, "");
    // Strip trailing slashes
    if (clean.endsWith("/")) clean = clean.slice(0, -1);
    
    // Aesthetic handle formatting for instagram
    if (urlStr.includes("instagram.com/")) {
      const parts = clean.split("/");
      const handle = parts[parts.length - 1];
      if (handle && handle.trim().length > 0) {
        return `@${handle}`;
      }
    }
    
    return clean;
  };

  const socialLinks = [
    {
      name: "Surel / Email",
      value: profile.email || "davidlouis857@gmail.com",
      url: profile.email ? `mailto:${profile.email}` : "mailto:davidlouis857@gmail.com",
      icon: <Mail className="w-5 h-5 text-stone-700 dark:text-amber-500" />,
      color: "hover:border-[#C5A880]/50",
    },
    {
      name: "LinkedIn Pro",
      value: cleanUrlLabel(profile.linkedin, "linkedin.com/in/davidlouis"),
      url: profile.linkedin || "https://linkedin.com/in/davidlouis",
      icon: <Linkedin className="w-5 h-5 text-stone-700 dark:text-amber-500" />,
      color: "hover:border-[#C5A880]/50",
    },
    {
      name: "GitHub Developer",
      value: cleanUrlLabel(profile.github, "github.com/davidlouis"),
      url: profile.github || "https://github.com/davidlouis",
      icon: <Github className="w-5 h-5 text-stone-700 dark:text-amber-500" />,
      color: "hover:border-[#C5A880]/50",
    },
    {
      name: "Instagram",
      value: cleanUrlLabel(profile.instagram, "@davidlouis857"),
      url: profile.instagram || "https://instagram.com/davidlouis857",
      icon: <Instagram className="w-5 h-5 text-stone-700 dark:text-amber-500" />,
      color: "hover:border-[#C5A880]/50",
    }
  ];

  return (
    <section 
      id="kontak" 
      className="relative py-24 bg-[#FAF9F6] dark:bg-[#151515] border-t border-stone-200 dark:border-stone-850 px-4 sm:px-6 lg:px-8 transition-colors"
      aria-label="Formulir Kontak & Tautan Navigasi Media Sosial"
    >
      {/* Background glowing spot */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-[150px] glow-bg" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-[#8c7355] uppercase tracking-widest bg-[#C5A880]/10 border border-[#C5A880]/20 px-4 py-1.5 rounded-full">
            Mari BerkolaborasI
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-stone-900 dark:text-white tracking-tight">
            Hubungi Saya
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A880] mx-auto mt-2" aria-hidden="true" />
          <p className="text-stone-605 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Apakah Anda mendeteksi potensi kolaborasi riset digital, kebutuhan koding aplikasi cerdas, atau pelestarian budaya? Mari kita berdiskusi segera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-wrapper">
          {/* Left Column: Direct channels and closing invitation remarks */}
          <div id="contact-info-col" className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center space-x-2 bg-[#C5A880]/10 border border-[#C5A880]/20 px-3 py-1 rounded-full text-[#8c7355] font-mono text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Siap Menghubungkan Ide Anda</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white leading-tight">
                  Diskusikan Proyek Hebat Berikutnya
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm font-sans leading-relaxed">
                  Saya berkomitmen penuh pada pengembangan ekosistem seluler bermutu tinggi serta perancangan aplikasi cerdas. Saya terbuka untuk bertukar pemikiran riset, konsultasi koding, dan kontribusi kultural murni.
                </p>
              </div>

              {/* Grid of contact buttons */}
              <div className="space-y-3.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    aria-label={`Buka media sosial ${link.name}`}
                    className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl hover:border-[#C5A880] transition-all duration-300 transform hover:-translate-y-0.5 group outline-none"
                  >
                    <div className="flex items-center space-x-3.5 text-left">
                      <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-850 flex items-center justify-center border border-stone-200 dark:border-stone-800 transition-colors">
                        {link.icon}
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-wider">{link.name}</span>
                        <span className="block font-sans font-semibold text-xs sm:text-sm text-stone-800 dark:text-stone-100 group-hover:text-[#8c7355] transition-colors">{link.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-450 group-hover:text-[#8c7355] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Micro details */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-850 text-left text-[11px] text-stone-500 dark:text-stone-400 font-mono">
              <p>📍 Domisili Operasional: Surabaya, Indonesia</p>
              <p className="mt-1">🌐 Zona Waktu: UTC/GMT +7 (WIB)</p>
            </div>
          </div>

          {/* Right Column: Interactive Form with React state validation */}
          <div id="contact-form-col" className="lg:col-span-7 bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-850 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <h3 className="font-serif font-bold text-lg text-stone-955 dark:text-white mb-6 flex items-center space-x-2 text-left">
              <MessageSquare className="w-5 h-5 text-[#8c7355]" />
              <span>Kirim Pesan Langsung</span>
            </h3>

            {isSubmitted ? (
               <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-605 animate-bounce">
                  <CheckCircle className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-stone-505 dark:text-stone-400 max-w-sm mx-auto font-sans">
                    Terima kasih atas pesan Anda. David Louis akan meneliti subjek pesan dan segera memberi balasan resmi ke alamat email terdaftar Anda.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-full text-xs font-mono text-stone-605 hover:text-stone-950 transition-colors cursor-pointer outline-none"
                  aria-label="Kirim Formulir/Pesan baru lainnya"
                >
                  Kirim Pesan Lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-mono text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
                      Nama Lengkap Anda / Organisasi
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="Masukkan nama resmi atau korporasi Anda"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-stone-105 dark:bg-stone-855 border border-stone-450/40 dark:border-stone-550/40 focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-stone-855 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-all font-sans placeholder:text-stone-450"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-mono text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
                      Alamat Email (Surel)
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="contoh: nama@layanan.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-stone-105 dark:bg-stone-855 border border-stone-450/40 dark:border-stone-550/40 focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-stone-855 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-all font-sans placeholder:text-stone-450"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-msg" className="font-mono text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
                      Subjek & Isi Pesan Anda
                    </label>
                    <textarea
                      id="contact-msg"
                      required
                      rows={4}
                      placeholder="Gambarkan secara ringkas ide kolaborasi cerdas, kebutuhan sistem teknis, atau undangan kegiatan..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-stone-105 dark:bg-stone-855 border border-stone-450/40 dark:border-stone-550/40 focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-stone-855 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-all font-sans placeholder:text-stone-450 resize-none/none"
                      style={{ resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    type="submit"
                    id="submit-message-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider text-white bg-[#8c7355] hover:bg-[#70583b] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md outline-none"
                    aria-label={isSubmitting ? 'Mengirim pesan' : 'Kirim pesan sekarang'}
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span>{isSubmitting ? 'Sedang Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer info containing copyright statement */}
        <div className="mt-20 pt-8 border-t border-stone-200 dark:border-stone-850 flex flex-col md:flex-row items-center justify-between text-xs text-stone-550 dark:text-stone-450 font-mono gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded bg-stone-800 flex items-center justify-center border border-stone-700 text-[10px] font-bold text-white" aria-hidden="true">DL</span>
            <p>© 2026 David Louis. Seluruh hak cipta dilindungi undang-undang.</p>
          </div>
          <p className="tracking-wide">Dirancang secara cerdas • Storytelling Portfolio UI/UX & a11y</p>
        </div>
      </div>
    </section>
  );
}
