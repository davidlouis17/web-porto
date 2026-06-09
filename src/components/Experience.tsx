/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Landmark, Laptop, Calendar, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { isFirebaseEnabled, fetchCollectionData } from '../firebase';

interface ExperienceItem {
  id: string;
  type: "experience" | "certification";
  title: string;
  subtitle?: string;
  date: string;
  institution: string;
  description: string;
  skills: string; // Comma separated in localstorage
  gambar?: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const EXP_DB_KEY = "david_louis_portfolio_experiences";
    
    const syncExperiences = () => {
      const storedExps = localStorage.getItem(EXP_DB_KEY);
      if (storedExps) {
        try {
          setExperiences(JSON.parse(storedExps));
        } catch (e) {
          console.error("Error parsing experiences", e);
        }
      } else {
        // Seed default values for certifications added in dashboard
        const seedExps: ExperienceItem[] = [
          {
            id: "seed-exp1",
            type: "certification",
            title: "Fiber Optic Training Certification",
            subtitle: "Fiber Optic Installation & Network Fundamentals",
            date: "June 5, 2026",
            institution: "State Optical Communication Center",
            description: "Sertifikasi kompetensi rekayasa fisik jaringan meliputi fundamental fiber optic, instalasi kabel udara dan bawah tanah, fusion splicing (penyambungan core serat kaca), serta pengukuran loss menggunakan Optical Time Domain Reflectometer (OTDR). Berkontribusi penuh pada penguasaan topologi jaringan telekomunikasi berkecepatan tinggi.",
            skills: "Fiber Optic Installation, Core Splicing, OTDR Audits, Network Fundamentals, FTTH G-PON",
            gambar: ""
          },
          {
            id: "seed-exp2",
            type: "experience",
            title: "Event Logistics & Venue PIC",
            subtitle: "Technical Coordinator & Lead Operator",
            date: "August 2024 - Active",
            institution: "State Tech Event Management",
            description: "Memimpin tim manajemen teknis, tata suara (sound system), tata cahaya (lighting system), dan distribusi daya untuk kelancaran kegiatan berskala besar dengan kapasitas audiens hingga 2.000 peserta. Mengatur rancangan kabel audio biner, sinkronisasi lighting DMX-512, serta kontrol panggung utama secara real-time.",
            skills: "Sound Engineering, DMX Lighting Systems, Resource Allocation, Technical Coordination, Crisis Management",
            gambar: ""
          }
        ];
        localStorage.setItem(EXP_DB_KEY, JSON.stringify(seedExps));
        setExperiences(seedExps);
      }
    };

    syncExperiences();
    window.addEventListener("storage", syncExperiences);
    window.addEventListener("local-storage-update", syncExperiences);
    return () => {
      window.removeEventListener("storage", syncExperiences);
      window.removeEventListener("local-storage-update", syncExperiences);
    };
  }, []);

  interface StageItem {
    phase: string;
    era: string;
    title: string;
    duration: string;
    institution: string;
    icon: string;
    description: string;
    skills: string[] | string;
    gambar: string;
    imageCaption: string;
  }

  const [stages, setStages] = useState<StageItem[]>([]);

  useEffect(() => {
    const STAGES_DB_KEY = "david_louis_portfolio_stages";
    
    const defaultStages: StageItem[] = [
      {
        phase: "Fase 1",
        era: "Masa SMA",
        title: "Eksplorasi Kepemimpinan & Organisasi",
        duration: "2019 - 2022",
        institution: "Pendidikan Menengah Atas",
        icon: "book-open",
        description: "Masa awal eksplorasi diri, keaktifan berorganisasi, dan penemuan minat dasar. Terlibat aktif dalam menyusun program kerja kesiswaan dan mengoordinasikan agenda bersama kelompok, merintis pemahaman awal atas cara memimpin yang komunikatif, suportif, serta berorientasi pada penyelarasan bakat tim.",
        skills: "Organisasi Siswa, Kepemimpinan Dasar, Eksplorasi Minat, Komunikasi Publik",
        gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
        imageCaption: "Inisiasi awal jiwa kepemimpinan & organisasi"
      },
      {
        phase: "Fase 2",
        era: "Representasi Budaya & Kepemimpinan",
        title: "Putera Puteri Batik Jawa Timur & PIC Teknis",
        duration: "2022 - 2024",
        institution: "Paguyuban Duta Batik Regional",
        icon: "landmark",
        description: "Terpilih dalam ajang Putera Puteri Batik Jawa Timur. Aktif dalam public speaking, mempromosikan warisan budaya Indonesia, serta mengambil peran manajerial teknis yang krusial selaku Penanggung Jawab (PIC) Sound System & Venue untuk mengawal kelancaran operasional pementasan event kebudayaan berskala nasional yang dihadiri ribuan delegasi secara langsung.",
        skills: "Duta Budaya, Public Speaking, PIC Sound System, Tata Letak Venue & Logistik",
        gambar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
        imageCaption: "Preservasi kebudayaan nasional & orasi publik"
      },
      {
        phase: "Fase 3",
        era: "Dunia Teknologi & Informatika",
        title: "S1 Informatika & Mobile App Engineering",
        duration: "2024 - Sekarang",
        institution: "Fakultas Teknik Informatika",
        icon: "laptop",
        description: "Melanjutkan studi ke jenjang S1 Informatika di Surabaya. Berfokus secara intensif pada Android Development (Kotlin, Jetpack Compose) untuk merancang sistem aplikasi seluler cerdas yang andal serta melakukan riset implementasi fungsional model kecerdasan buatan Machine Learning.",
        skills: "Kotlin Android Native, Jetpack Compose UI, Model Machine Learning (KNN, CNN), Backend API Services",
        gambar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
        imageCaption: "Laboratorium software & rekayasa kecerdasan komputer"
      }
    ];

    const syncStages = () => {
      const storedStages = localStorage.getItem(STAGES_DB_KEY);
      if (storedStages) {
        try {
          setStages(JSON.parse(storedStages));
        } catch (e) {
          console.error("Error parsing stages", e);
          setStages(defaultStages);
        }
      } else {
        localStorage.setItem(STAGES_DB_KEY, JSON.stringify(defaultStages));
        setStages(defaultStages);
      }
    };

    syncStages();
    
    // We listen to custom storage alerts
    window.addEventListener("storage", syncStages);
    window.addEventListener("local-storage-update", syncStages);
    return () => {
      window.removeEventListener("storage", syncStages);
      window.removeEventListener("local-storage-update", syncStages);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className="w-4 h-4 text-amber-700" />;
      case 'landmark':
        return <Landmark className="w-4 h-4 text-[#8c7355]" />;
      case 'laptop':
        return <Laptop className="w-4 h-4 text-stone-800" />;
      default:
        return <BookOpen className="w-4 h-4 text-amber-700" />;
    }
  };

  const getSkillsArray = (skillsValue: any): string[] => {
    if (Array.isArray(skillsValue)) {
      return skillsValue;
    }
    if (typeof skillsValue === 'string') {
      return skillsValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    return [];
  };

  return (
    <section 
      id="pengalaman" 
      className="relative py-24 bg-[#FAF9F6] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-850 px-4 sm:px-6 lg:px-8 transition-colors"
      aria-label="Interactive Storytelling Timeline: Perjalanan David Louis"
    >
      {/* Background soft aesthetic overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-[130px] glow-bg" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-[#8c7355] uppercase tracking-widest bg-[#C5A880]/10 border border-[#C5A880]/20 px-4 py-1.5 rounded-full" id="timeline-subtitle">
            Timeline Interaktif
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-white tracking-tight" id="timeline-title">
            Perjalanan Cerita Saya
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A880] mx-auto mt-2" aria-hidden="true" />
          <p className="text-stone-605 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Menelusuri proses pembelajaran holistik: mulai dari keaktifan berorganisasi masa SMA, kepemimpinan representatif budaya, hingga rekayasa teknologi informatika modern.
          </p>
        </div>

        {/* 1. PRIMARY STORYTELLING TIMELINE (3 Phases requested by User) */}
        <div className="relative pl-2 sm:pl-10 space-y-16 max-w-4xl mx-auto" id="storytelling-container">
          {/* Vertical central stem line */}
          <div className="timeline-stem" aria-hidden="true" />

          {stages.map((stage, idx) => {
            return (
              <motion.div
                key={stage.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pl-10 text-left"
              >
                {/* Visual Connector node indicating the phase */}
                <div 
                  className="absolute left-[-21px] top-1.5 w-10 h-10 rounded-full bg-white dark:bg-stone-900 border-2 border-[#C5A880] flex items-center justify-center shadow-md timeline-node-glow z-10 transition-all duration-300 group-hover:bg-[#FAF5ED]"
                  aria-hidden="true"
                >
                  {getIcon(stage.icon)}
                </div>

                {/* Left Content Column (7 cols): The Written Narrative */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded">
                      {stage.phase}
                    </span>
                    <span className="text-stone-300 font-light text-xs" aria-hidden="true">|</span>
                    <span className="font-mono text-xs text-[#8c7355] font-semibold">{stage.duration}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono uppercase text-stone-400 tracking-widest leading-tight">{stage.era}</span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white leading-tight group-hover:text-amber-700 transition-colors">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-605 dark:text-stone-300 leading-relaxed font-sans">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {getSkillsArray(stage.skills).map((skill) => (
                      <span key={skill} className="bento-skill-tag text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Image/Documentation Column (5 cols) with precise structural notes */}
                <div className="lg:col-span-5 w-full">
                  {/*
                    ========================================
                    DOKUMENTASI GAMBAR (UNTUK DAVID LOUIS):
                    Mencantumkan foto-foto cerita Anda ke dalam portfolio sangatlah mudah.
                    1. Siapkan file gambar Anda (misal: "my-photo.jpg") dan letakkan di dalam folder `/public/` atau upload via editor.
                    2. Ganti link https://images.unsplash.com/... di atas pada variabel `storytellingStages` baris `gambar:` untuk setiap fase dengan path lokal Anda.
                    Contoh: gambar: "/assets/my-photo.jpg" -> letakkan di /public/assets/my-photo.jpg
                    ========================================
                  */}
                  <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 shadow-md transform transition-all duration-300 group-hover:scale-[1.02] aspect-video group-hover:border-[#C5A880]/50">
                    <img 
                      src={stage.gambar} 
                      alt={`Dokumentasi ${stage.phase}: ${stage.title}`} 
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-stone-900/60 backdrop-blur-3xs p-1.5 text-center">
                      <span className="text-[10px] font-mono text-white tracking-wide font-medium">
                        {stage.imageCaption}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* 2. DYNAMIC CREDENTIALS SECTION (From dynamic LocalStorage / Admin Console) */}
        {experiences.length > 0 && (
          <div className="mt-32 pt-20 border-t border-stone-200 dark:border-stone-850 text-left space-y-10">
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 max-w-4xl mx-auto">
              <div className="space-y-1">
                <span className="font-mono text-[9px] font-bold text-[#8c7355] uppercase tracking-widest">
                  Verifikasi Tambahan
                </span>
                <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-105">
                  Sertifikat Profesi & Lisensi Teknis
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                Terintegrasi dengan Panel Dashboard Admin
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto grid-flow-row-dense">
              {experiences.map((exp, idx) => {
                const isCert = exp.type === "certification";
                return (
                  <div 
                    key={exp.id || idx}
                    className="bento-card p-6 flex flex-col justify-between space-y-5"
                    role="article"
                    aria-label={`Rincian Kredensi: ${exp.title}`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                          isCert ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-800'
                        }`}>
                          {isCert ? "Sertifikasi" : "Pekerjaan"}
                        </span>
                        <div className="flex items-center text-xs text-stone-400 font-mono gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{exp.date}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.institution}</span>
                        </p>
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans line-clamp-3">
                        {exp.description}
                      </p>

                      {exp.gambar && (
                        <div 
                          onClick={() => setActiveImage(exp.gambar || null)}
                          className="mt-3 relative rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 shadow-sm aspect-video max-h-40 flex items-center justify-center cursor-pointer group/img"
                        >
                          <img 
                            src={exp.gambar} 
                            alt={`Dokumentasi ${exp.title}`} 
                            className="w-full h-full object-cover transition-all duration-350 group-hover/img:scale-105" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[9px] font-mono font-medium bg-stone-900/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg shadow-sm">
                              Perbesar Gambar
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.2 pt-3 border-t border-stone-100 dark:border-stone-800">
                      {(exp.skills || "").split(',').map((s) => (
                        <span key={s} className="bento-skill-tag text-[9px]">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col justify-center items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all cursor-pointer shadow-lg"
                aria-label="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <img 
                src={activeImage} 
                alt="Bukti Dokumen Kredensial" 
                className="rounded-lg max-w-full max-h-[75vh] object-contain shadow-2xl border border-stone-800"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
