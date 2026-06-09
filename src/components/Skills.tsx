/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, BrainCircuit, ShieldCheck, Cpu, ShieldAlert } from 'lucide-react';
import { isFirebaseEnabled, fetchCollectionData } from '../firebase';

export default function Skills() {
  const [dbSkills, setDbSkills] = useState<any[]>([]);

  useEffect(() => {
    const SKILLS_DB_KEY = "david_louis_portfolio_skills";
    const syncSkills = () => {
      const stored = localStorage.getItem(SKILLS_DB_KEY);
      if (stored) {
        try {
          setDbSkills(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing skills in homepage", e);
        }
      } else {
        const defaultSkills = [
          { id: "seed-s1", keahlian: "Kotlin Native Android", kategori: "Mobile Development", rating: 90, deskripsi: "Utama untuk rekayasa Android modern menggunakan Jetpack Compose." },
          { id: "seed-s2", keahlian: "Jetpack Compose UI", kategori: "Mobile Development", rating: 85, deskripsi: "Arsitektur deklaratif modular dengan rendering grafis berkinerja tinggi." },
          { id: "seed-s3", keahlian: "Flutter SDK", kategori: "Mobile Development", rating: 75, deskripsi: "Pengembangan sistem multiplatform dengan tata kelola kode bersih." },
          { id: "seed-s4", keahlian: "K-Nearest Neighbors (KNN)", kategori: "Machine Learning", rating: 85, deskripsi: "Digunakan dalam pemetaan harmoni suara & sistem rekomendasi cerdas." },
          { id: "seed-s5", keahlian: "Convolutional Neural Networks (CNN)", kategori: "Machine Learning", rating: 80, deskripsi: "Implementasi deteksi visual pola citra untuk verifikasi on-device." },
          { id: "seed-s6", keahlian: "Artificial Neural Networks (ANN)", kategori: "Machine Learning", rating: 82, deskripsi: "Klasifikasi data latih multi-parameter dan model pemilah numerik." },
          { id: "seed-s7", keahlian: "Kali Linux Audit", kategori: "Cybersecurity & Forensic", rating: 85, deskripsi: "Perangkat lunak audit untuk mitigasi kerentanan integritas server." },
          { id: "seed-s8", keahlian: "Forensic Autopsy", kategori: "Cybersecurity & Forensic", rating: 80, deskripsi: "Investigasi database digital & pengusutan integritas histori disk." },
          { id: "seed-s9", keahlian: "Metasploit Core", kategori: "Cybersecurity & Forensic", rating: 75, deskripsi: "Pemetaan vulnerability host-node untuk proteksi transmisi data." }
        ];
        setDbSkills(defaultSkills);
        localStorage.setItem(SKILLS_DB_KEY, JSON.stringify(defaultSkills));
      }
    };

    syncSkills();
    window.addEventListener('storage', syncSkills);
    window.addEventListener('local-storage-update', syncSkills);
    return () => {
      window.removeEventListener('storage', syncSkills);
      window.removeEventListener('local-storage-update', syncSkills);
    };
  }, []);

  const categoryHeaders: { [key: string]: { description: string; icon: string } } = {
    "Mobile Development": {
      description: "Membangun aplikasi mobile berskala industri yang stabil, responsif, dan interaktif dengan keamanan tingkat perangkat.",
      icon: "Smartphone"
    },
    "Machine Learning": {
      description: "Merancang dan mendesain model komputasi cerdas untuk analisis data biometrik serta klasifikasi dinamika sinyal digital.",
      icon: "BrainCircuit"
    },
    "Cybersecurity & Forensic": {
      description: "Melakukan pengujian kerentanan server penunjang, peninjauan logs forensik digital, serta audit keamanan web.",
      icon: "ShieldAlert"
    }
  };

  const skillsByCategory: { [key: string]: any[] } = {};
  dbSkills.forEach(s => {
    const cat = s.kategori || "Umum & Pendukung";
    if (!skillsByCategory[cat]) {
      skillsByCategory[cat] = [];
    }
    skillsByCategory[cat].push({
      name: s.keahlian,
      level: Number(s.rating) || 80,
      description: s.deskripsi
    });
  });

  const skillCategoriesList = Object.keys(skillsByCategory).map(catName => {
    const meta = categoryHeaders[catName] || {
      description: `Kumpulan keahlian rekayasa teknologi penunjang di bidang ${catName}.`,
      icon: "Cpu"
    };
    return {
      title: catName,
      description: meta.description,
      icon: meta.icon,
      items: skillsByCategory[catName]
    };
  });

  return (
    <section 
      id="keahlian" 
      className="relative py-24 bg-[#FAF9F6] dark:bg-[#151515] border-t border-stone-200 dark:border-stone-850 px-4 sm:px-6 lg:px-8 transition-colors"
      aria-label="Keahlian Teknologi & Domain Riset Resmi"
    >
      {/* Visual background enhancements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-3/4 w-72 h-72 rounded-full bg-[#C5A880]/10 blur-[120px] glow-bg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-[#8c7355] uppercase tracking-widest bg-[#C5A880]/10 border border-[#C5A880]/20 px-4 py-1.5 rounded-full">
            Keahlian Teknologi
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-white tracking-tight">
            Kemampuan & Domain Riset
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A880] mx-auto mt-2" aria-hidden="true" />
          <p className="text-stone-605 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Menyelaraskan keahlian rekayasa aplikasi visual seluler dengan algoritma Machine Learning terapan serta audit sistem keamanan.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategoriesList.map((category, catIndex) => {
            const getIcon = () => {
              switch (category.icon) {
                case "Smartphone":
                  return <Smartphone className="w-5 h-5 text-[#8c7355]" />;
                case "BrainCircuit":
                  return <BrainCircuit className="w-5 h-5 text-amber-700" />;
                case "ShieldAlert":
                  return <ShieldAlert className="w-5 h-5 text-stone-750" />;
                default:
                  return <Cpu className="w-5 h-5 text-[#8c7355]" />;
              }
            };

            return (
              <motion.div
                key={category.title}
                id={`skill-category-${catIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="flex flex-col bento-card p-6 h-full hover:scale-[1.01] text-left shrink-0 min-h-[380px]"
              >
                {/* Visual Category Header */}
                <div className="flex items-center space-x-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-850 flex items-center justify-center border border-stone-200 dark:border-stone-800">
                    {getIcon()}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white leading-tight capitalize">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6 font-sans text-justify">
                  {category.description}
                </p>

                {/* Skill List items */}
                <div className="space-y-5 mt-auto">
                  {category.items.map((skill, skillIndex) => {
                    return (
                      <div key={skill.name} id={`skill-item-${catIndex}-${skillIndex}`} className="space-y-1.5 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-sans font-medium text-stone-800 dark:text-stone-205 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
                            <span>{skill.name}</span>
                          </span>
                          <span className="font-mono text-stone-500 dark:text-stone-400 font-bold">{skill.level}%</span>
                        </div>

                        {/* Skill Level Meter */}
                        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden border border-stone-200/50 dark:border-stone-800/30">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: skillIndex * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#C5A880] to-[#8c7355] rounded-full"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-[10px] text-stone-605 dark:text-stone-404 leading-relaxed font-sans text-justify">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-[20px] flex flex-col md:flex-row justify-between items-center gap-4 hover:border-[#C5A880] hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-3.5 text-left">
            <div className="w-9 h-9 rounded-full bg-[#C5A880]/10 flex items-center justify-center border border-[#C5A880]/20 flex-shrink-0">
              <Cpu className="w-4 h-4 text-[#8c7355]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-850 dark:text-stone-100 font-sans">Integrasi Komputasi Multiplatfom</p>
              <p className="text-[10px] text-stone-505 dark:text-stone-450 font-sans">Menggabungkan logika native Android (Kotlin) dengan prosesor model cerdas on-device.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Android USB Host API", "JVM Engine Integration", "Scikit Learn", "On-Device Inference"].map((tag) => (
              <span key={tag} className="bento-skill-tag text-[9px] font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
