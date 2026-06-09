/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, BarChart2, Radio, Server, ShieldCheck, Activity, Terminal, RotateCcw, Sliders, HardDrive, Cpu, Percent, ExternalLink, Image as ImageIcon, X, BookOpen, Layers, CheckCircle2, History } from 'lucide-react';
import { isFirebaseEnabled, fetchCollectionData } from '../firebase';

const PROJECT_CASE_STUDIES: Record<string, {
  challenge: string;
  solution: string;
  impact: string;
  techStackDetailed: string[];
  galleryText: string;
}> = {
  "seed-p1": {
    challenge: "Menampilkan kekayaan warisan budaya Jawa Timur secara digital tanpa terkesan kaku, sekaligus merancang katalog busana batik yang ringan diakses oleh masyarakat umum di daerah pelosok dengan koneksi internet terbatas.",
    solution: "Mengimplementasikan sistem static-rendering yang dioptimasi secara visual menggunakan Tailwind CSS bertema warna bumi (earthy-tones) hangat. Seluruh aset gambar dipasang dengan kompresi modern yang di-hosting secara andal, dan filter kategori ditenagai oleh pencarian linear instan di sisi klien.",
    impact: "Peningkatan rasio retensi pembaca hingga 42%, waktu pemuatan halaman di bawah 1.2 detik (menurut audit kecepatan seluler), serta pendaftaran keanggotaan baru meningkat signifikan secara digital.",
    techStackDetailed: ["Tailwind CSS", "Semantic HTML5", "Modern Image Encoding", "Dynamic Client-Side Filtering", "Local Storage Cache"],
    galleryText: "Katalog Batik Jawa Timur, Sistem Filter Kategori Budaya"
  },
  "seed-p2": {
    challenge: "Menjalankan rekomendasi lagu terdekat dari parameter gelombang suara secara real-time langsung di dalam sistem Android tanpa bergantung pada server eksternal, sekaligus memastikan konsumsi daya baterai dan memori operasional (RAM) tetap minimal.",
    solution: "Membuat optimasi komputasi aljabar linear untuk menghitung jarak Euclidean K-Nearest Neighbors langsung menggunakan multi-threading Kotlin Coroutines. Kami menyandikan nilai Energy, Tempo (BPM), dan Key sebagai koordinat 3D untuk meminimalkan kompleksitas ruang dan waktu algoritma O(N). Menambahkan audio crossfade pada media player asli Android.",
    impact: "Pengurangan penggunaan RAM ponsel hingga 60%, transisi lagu bebas dari celah suara (zero gaps/latency), serta rekomendasi instan tercapai dalam waktu proses < 15ms per siklus.",
    techStackDetailed: ["Kotlin (Android Native)", "Jetpack Compose", "KNN Classification", "Euclidean Distance Engine", "ExoPlayer Integration", "Coroutines Async Threading"],
    galleryText: "Inference Engine Core, Visual Audio Equalizer, KNN Vector Space"
  },
  "seed-p3": {
    challenge: "Mengintegrasikan dashboard monitoring telemetri infrastruktur server secara langsung tanpa membebani server target, sekaligus menjaga keakuratan parameter SLA (Service Level Agreement) dari fluktuasi ping acak yang sering memicu alarm palsu.",
    solution: "Merancang mekanisme penyaringan anomali data ping menggunakan model sliding window filter untuk meredam pencilan data jenuh. Data telemetri dikirim secara asinkron dari server produksi ke webhook terenkripsi, kemudian divisualisasikan dalam visual SVG grafik interaktif yang responsif.",
    impact: "Menghilangkan 95% peringatan palsu (false alarms), mencatatkan rekam keandalan uptime hingga 99.98%, serta meningkatkan waktu respons penanganan kendala sistem produksi di bawah 5 menit.",
    techStackDetailed: ["Site24x7 Core", "Nginx Proxy Server", "Node.js Webhook Router", "SVG Real-time Graphics", "Sliding Window Filters", "SLA Calculation Math"],
    galleryText: "Live Monitor Grid, Uptime Status Graph, Webhook Alerts Console"
  },
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'music' | 'infra'>('music');
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const getCaseStudy = (project: any) => {
    if (!project) return null;
    if (PROJECT_CASE_STUDIES[project.id]) {
      return PROJECT_CASE_STUDIES[project.id];
    }
    // Fallback for user custom projects
    return {
      challenge: `Mengembangkan solusi teknis komprehensif untuk proyek '${project.judul}' secara optimal demi menghadapi tantangan tingkat integrasi fungsionalitas sistem, manajemen state dinamis bertenaga, serta penyelarasan tampilan antarmuka agar responsif bagi seluruh jenis dimensi layar pengguna.`,
      solution: `Merancang arsitektur termodulasi yang memisahkan pengolahan logika data dan visualisasi komponen. Memanfaatkan penyimpanan lokal, optimalisasi rendering komponen React, serta integrasi pustaka ikon dan framework CSS Tailwind untuk memastikan respon instan pada interaksi pengguna.`,
      impact: "Sistem operasional berjalan stabil, akses beban antarmuka terbukti lancar, serta meningkatkan kenyamanan navigasi pengguna dalam beralih antar fitur utama hingga 100%.",
      techStackDetailed: [project.kategori || "Software Engineering", "React Hooks", "Tailwind CSS", "Data Persistence", "State Optimization"],
      galleryText: `Pratinjau antarmuka ${project.judul}, Log Aktivitas Sistem`
    };
  };

  useEffect(() => {
    const PROJECTS_DB_KEY = "david_louis_portfolio_projects";
    const syncProjects = () => {
      const stored = localStorage.getItem(PROJECTS_DB_KEY);

      if (stored) {
        try {
          setDbProjects(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        const SEED_PROJECTS = [
          {
            id: "seed-p1",
            judul: "Website Ikatan Putera Puteri Batik Jawa Timur",
            kategori: "Website & Komunitas",
            deskripsi: "Pengembangan website profil dan katalog resmi untuk komunitas duta batik regional Jawa Timur dengan desain berciri kultural elegan yang responsif.",
            url: "https://github.com/davidlouis/putera-puteri-batik-jatim",
            gambar: "https://images.unsplash.com/photo-1590736969955-71cb94801759?q=80&w=600&auto=format&fit=crop"
          },
          {
            id: "seed-p2",
            judul: "Smart Music Player with KNN",
            kategori: "Mobile Development",
            deskripsi: "Aplikasi mobile seluler Android native (Kotlin, Jetpack Compose) terproteksi dengan fitur automix cerdas dan sistem rekomendasi berbasis K-Nearest Neighbors (KNN).",
            url: "https://github.com/davidlouis/smart-knn-music-player",
            gambar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop"
          },
          {
            id: "seed-p3",
            judul: "Web Infrastructure Monitoring Dashboard",
            kategori: "Infrastruktur & Cloud",
            deskripsi: "Manajemen keandalan operational uptime server website terintegrasi dengan webhook telemetri otomatis serta parameter SLA secara komprehensif.",
            url: "https://github.com/davidlouis/web-infrastructure-monitoring",
            gambar: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&auto=format&fit=crop"
          }
        ];
        setDbProjects(SEED_PROJECTS);
        localStorage.setItem(PROJECTS_DB_KEY, JSON.stringify(SEED_PROJECTS));
      }
    };

    syncProjects();
    window.addEventListener('storage', syncProjects);
    window.addEventListener('local-storage-update', syncProjects);
    return () => {
      window.removeEventListener('storage', syncProjects);
      window.removeEventListener('local-storage-update', syncProjects);
    };
  }, []);

  // Music Player Simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [energySlider, setEnergySlider] = useState(70);
  const [tempoSlider, setTempoSlider] = useState(128); // BPM
  const [keySlider, setKeySlider] = useState(5); // Key index

  // Simulated Library of Songs for KNN
  const mockSongs = [
    { title: "Midnight Android Resonance", energy: 85, tempo: 130, key: 6, genre: "Cyber Electro" },
    { title: "Neural Drift (KNN Mix)", energy: 45, tempo: 95, key: 3, genre: "Ambient Lo-Fi" },
    { title: "Algorithmic Symphony", energy: 95, tempo: 140, key: 9, genre: "Hi-Tech Trance" },
    { title: "Kotlin Compose Overdrive", energy: 75, tempo: 120, key: 5, genre: "Synthwave" },
    { title: "Biometric Shadow Handshake", energy: 30, tempo: 80, key: 2, genre: "Cinematic Dark" },
    { title: "Deep Learning Waves", energy: 60, tempo: 110, key: 7, genre: "Deep House" }
  ];

  // Nearest song evaluated dynamically using Euclidean Distance
  const [closestSong, setClosestSong] = useState(mockSongs[0]);
  const [euclideanDistances, setEuclideanDistances] = useState<number[]>([]);

  useEffect(() => {
    // Basic Euclidean Distance computation
    const distances = mockSongs.map((song) => {
      const eDiff = Math.pow(song.energy - energySlider, 2);
      const tDiff = Math.pow((song.tempo - tempoSlider) / 2, 2); // Scale tempo down to balance metric weight
      const kDiff = Math.pow((song.key - keySlider) * 10, 2); // Scale key up
      return Math.sqrt(eDiff + tDiff + kDiff);
    });

    setEuclideanDistances(distances);

    // Find the closest index other than current track (or closest absolute)
    let minVal = Infinity;
    let minIndex = 0;
    distances.forEach((dist, idx) => {
      if (dist < minVal) {
        minVal = dist;
        minIndex = idx;
      }
    });
    setClosestSong(mockSongs[minIndex]);
  }, [energySlider, tempoSlider, keySlider]);

  const handleNextTrack = () => {
    // Automix automatically navigates to recommended closest track!
    const nextIdx = mockSongs.findIndex(s => s.title === closestSong.title);
    if (nextIdx !== -1) {
      setTrackIndex(nextIdx);
      // Keep sliders close to the track
      setEnergySlider(closestSong.energy);
      setTempoSlider(closestSong.tempo);
      setKeySlider(closestSong.key);
    }
  };


  // Site24x7 Infrastructure Monitoring Simulation
  const [pingTimes, setPingTimes] = useState<number[]>([15, 18, 14, 22, 19, 16, 17]);
  const [cpuLoad, setCpuLoad] = useState(42);
  const [ramUsage, setRamUsage] = useState(61);
  const [diskUsage, setDiskUsage] = useState(78.4);
  const [serverStatus, setServerStatus] = useState<'ONLINE' | 'WARN' | 'CRITICAL'>('ONLINE');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === 'infra') {
      interval = setInterval(() => {
        // Update live stats
        setPingTimes((prev) => {
          const next = [...prev.slice(1)];
          const variance = Math.floor(Math.random() * 10) - 5;
          next.push(Math.max(10, Math.min(120, prev[prev.length - 1] + variance)));
          return next;
        });

        setCpuLoad((prev) => {
          const change = Math.floor(Math.random() * 8) - 4;
          return Math.max(10, Math.min(95, prev + change));
        });

        setRamUsage((prev) => {
          const change = Math.random() * 2 - 1;
          return Math.max(40, Math.min(95, Number((prev + change).toFixed(1))));
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (cpuLoad > 85 || diskUsage > 90) {
      setServerStatus('CRITICAL');
    } else if (cpuLoad > 70 || ramUsage > 80) {
      setServerStatus('WARN');
    } else {
      setServerStatus('ONLINE');
    }
  }, [cpuLoad, ramUsage, diskUsage]);

  const triggerManualDiagnostics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPingTimes([14, 15, 13, 14, 16, 15, 14]);
      setCpuLoad(22);
      setRamUsage(54.2);
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <section id="proyek" className="relative py-24 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-850 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#C5A880]/5 dark:bg-[#C5A880]/10 blur-[120px] glow-bg" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#8c7355]/5 dark:bg-[#8c7355]/10 blur-[130px] glow-bg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-[#8c7355] uppercase tracking-widest bg-[#C5A880]/10 border border-[#C5A880]/20 px-4 py-1.5 rounded-full">
            PRESTASI DAN PORTFOLIO
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-white tracking-tight">
            Proyek Rekayasa Unggulan
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A880] mx-auto mt-2" aria-hidden="true" />
          <p className="text-stone-605 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Eksplorasi nyata yang menjembatani kecerdasan buatan, visual antarmuka seluler, dan ketersediaan infrastruktur jaringan secara komprehensif.
          </p>
        </div>

        {/* Tab Selector Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-stone-100/80 dark:bg-stone-850/80 border border-stone-200/80 dark:border-stone-800 p-1.5 rounded-full flex space-x-1">
            <button
              id="tab-btn-music"
              onClick={() => setActiveTab('music')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'music'
                  ? 'bg-[#8c7355] text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Smart Music Player</span>
            </button>
            <button
              id="tab-btn-infra"
              onClick={() => setActiveTab('infra')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'infra'
                  ? 'bg-[#8c7355] text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Infrastructure Monitoring</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'music' ? (
            <motion.div
              key="music-project"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* Left Side: Editorial description of project */}
              <div id="music-description" className="lg:col-span-6 flex flex-col justify-between space-y-6 bento-card p-6 sm:p-8 relative overflow-hidden bg-white dark:bg-stone-900 hover:scale-[1.01]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-2.5 text-[#8c7355] dark:text-[#C5A880] font-mono text-xs font-bold">
                    <span>Aplikasi Android</span>
                    <span>•</span>
                    <span>Machine Learning KNN</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-white leading-tight">
                    Smart Music Player
                  </h3>
                  <p className="text-stone-605 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                    Aplikasi Android premium berbasis <span className="text-[#8c7355] dark:text-[#C5A880] font-semibold">Kotlin</span> dan <span className="text-[#8c7355] dark:text-[#C5A880] font-semibold">Jetpack Compose</span> yang mendefinisikan ulang pemutaran musik cerdas lewat otomatisasi pencampuran transisi (automix).
                  </p>
                  <p className="text-stone-605 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                    Sistem ini mengintegrasikan pengenalan parameter gelombang suara (Energy, Tempo, Key) secara dinamis menggunakan algoritma <span className="text-[#8c7355] dark:text-[#C5A880] font-semibold font-mono">K-Nearest Neighbors (KNN)</span>. Saat lagu sedang diputar, model matematika KNN menghitung jarak Euclidean terdekat untuk meraba harmoni lagu berikutnya, mendapati transisi ketukan (BPM) yang sinkron dan memberikan efek crossfade transisi yang bersih.
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-left">
                  <p className="text-[11px] text-stone-450 dark:text-stone-500 font-mono italic">
                    * Verifikasi on-device dioptimasi secara paralel untuk menghindari penumpukan memori pada handphone Android.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Kotlin", "Jetpack Compose", "KNN", "Euclidean Metric", "Equalizer Host", "Automix"].map((tag) => (
                    <span key={tag} className="bento-skill-tag font-mono text-[9.5px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>              {/* Right Side: Interactive KNN Live Simulator */}
              <div id="music-simulator" className="lg:col-span-6 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-stone-900 hover:scale-[1.01] text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="font-mono text-[11px] text-[#8c7355] dark:text-[#C5A880] tracking-wider font-bold">LIVE KNN AUTOMIX SIMULATOR</h4>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Inference Engine Active
                    </span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-xs font-sans">Sesuaikan parameter gelombang lagu di bawah untuk mensimulasikan perhitungan KNN Euclidean mencari lagu rekomendasi automix berikutnya.</p>
                </div>
 
                {/* Adjustable Audio Sliders */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                        <span>Kandungan Energi Lagu (Energy)</span>
                      </span>
                      <span className="text-[#8c7355] dark:text-[#C5A880] font-bold">{energySlider}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={energySlider}
                      onChange={(e) => setEnergySlider(Number(e.target.value))}
                      className="w-full h-1 bg-stone-150 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#8c7355] border border-stone-200 dark:border-stone-750"
                    />
                  </div>
 
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                        <span>Kecepatan Tempo (BPM)</span>
                      </span>
                      <span className="text-[#8c7355] dark:text-[#C5A880] font-bold">{tempoSlider} BPM</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="160"
                      value={tempoSlider}
                      onChange={(e) => setTempoSlider(Number(e.target.value))}
                      className="w-full h-1 bg-stone-150 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#8c7355] border border-stone-200 dark:border-stone-750"
                    />
                  </div>
 
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                        <span>Acoustic Key & Skala Nada</span>
                      </span>
                      <span className="text-[#8c7355] dark:text-[#C5A880] font-bold">Nada {keySlider} (Mayor)</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="11"
                      value={keySlider}
                      onChange={(e) => setKeySlider(Number(e.target.value))}
                      className="w-full h-1 bg-stone-150 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#8c7355] border border-stone-200 dark:border-stone-750"
                    />
                  </div>
                </div>
 
                {/* Music Player Mock Interface */}
                <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-[20px] border border-stone-200 dark:border-stone-850 relative overflow-hidden">
                  <div className="flex space-x-4 items-center">
                    {/* Disk simulation */}
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr from-[#8c7355] to-[#C5A880] flex items-center justify-center border-4 border-white dark:border-stone-900 shadow-xl ${isPlaying ? 'animate-spin [animation-duration:4s]' : ''}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-stone-50 dark:bg-stone-950" />
                    </div>
 
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono tracking-wider">SEDANG DIPUTAR</p>
                      <p className="font-serif font-bold text-sm text-stone-800 dark:text-white truncate">{mockSongs[trackIndex].title}</p>
                      <p className="font-mono text-[10px] text-[#8c7355] dark:text-[#C5A880] mt-0.5">{mockSongs[trackIndex].genre} • {mockSongs[trackIndex].tempo} BPM</p>
                    </div>
 
                    {/* Interactive controls */}
                    <div className="flex items-center space-x-3 shrink-0">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 rounded-full bg-[#8c7355] hover:bg-[#70583b] text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md"
                        aria-label={isPlaying ? "Jeda" : "Putar"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white text-white" /> : <Play className="w-4 h-4 fill-white text-white ml-1" />}
                      </button>
                      <button
                        onClick={handleNextTrack}
                        className="w-8 h-8 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850 hover:border-[#C5A880]/50 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
                        title="Otomatis Automix ke Lagu Rekomendasi Terdekat"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
 
                  {/* Recommendation Queue Notification */}
                  <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-850 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 dark:text-stone-400 font-sans">KNN Rekomendasi Selanjutnya:</span>
                    <span className="text-[#8c7355] dark:text-[#C5A880] font-mono font-bold animate-pulse">{closestSong.title} ({closestSong.tempo} BPM)</span>
                  </div>
                </div>
 
                {/* Euclidean vector output list */}
                <div className="bg-stone-50 dark:bg-stone-950 rounded-xl p-3 border border-stone-200 dark:border-stone-850">
                  <span className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase block mb-2 font-bold tracking-wider">PENGHITUNGAN JARAK EUCLIDEAN KNN (k=1)</span>
                  <div className="space-y-1.5">
                    {mockSongs.map((song, idx) => {
                      const isTarget = song.title === closestSong.title;
                      const dist = euclideanDistances[idx] ? euclideanDistances[idx].toFixed(1) : "0.0";
                      
                      return (
                        <div key={song.title} className="flex justify-between items-center text-[10px] font-mono">
                          <span className={`truncate mr-3 ${isTarget ? 'text-[#8c7355] dark:text-[#C5A880] font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                            {isTarget ? "➔ " : "  "}{song.title}
                          </span>
                          <span className={isTarget ? 'text-[#8c7355] dark:text-[#C5A880] font-bold' : 'text-stone-550 dark:text-stone-400'}>
                            Jarak: {dist} {isTarget ? ' (Paling Dekat!)' : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
 
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="infra-project"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* Left Side: Editorial monitoring description */}
              <div id="infra-description" className="lg:col-span-6 flex flex-col justify-between space-y-6 bento-card p-6 sm:p-8 relative overflow-hidden bg-white dark:bg-stone-900 hover:scale-[1.01]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />
 
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-2.5 text-[#8c7355] dark:text-[#C5A880] font-mono text-xs font-bold">
                    <span>Cloud Management</span>
                    <span>•</span>
                    <span>Server Telemetry</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-white leading-tight">
                    Web Infrastructure Monitoring
                  </h3>
                  <p className="text-stone-605 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                    Pengelolaan ketersediaan server web dan penyimpanan log secara realtime menggunakan platform <span className="text-[#8c7355] dark:text-[#C5A880] font-semibold font-mono">Site24x7</span> untuk menjamin stabilitas deployment server hingga 99.9% uptime.
                  </p>
                  <p className="text-stone-605 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                    Infrastruktur ini dikonfigurasikan dengan push-alert webhook otomatis dan visualisasi grafik kustom untuk melacak kemampat-mulasan memory leak pada CPU, overload kapasitas penyimpanan SSD, serta fluktuasi ping respon jaringan global. Melindungi database backend dari potensi downtime tak terduga dengan notifikasi instan.
                  </p>
                </div>
 
                {/* Architecture parameters */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-lg border border-stone-200 dark:border-stone-850 text-left">
                    <span className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase block font-bold">Rata-rata Respon</span>
                    <span className="font-mono font-bold text-xs text-stone-800 dark:text-stone-200">16ms (Global CDN)</span>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-lg border border-stone-200 dark:border-stone-850 text-left">
                    <span className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase block font-bold">Target SLA</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-450 font-mono font-bold">99.99% Uptime</span>
                  </div>
                </div>
 
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Site24x7", "Server Telemetry", "Webhooks", "Network Audit", "SLA Monitor", "Nginx"].map((tag) => (
                    <span key={tag} className="bento-skill-tag font-mono text-[9.5px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
 
              {/* Right Side: Interactive Monitoring Panel Simulator */}
              <div id="infra-simulator" className="lg:col-span-6 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-stone-900 hover:scale-[1.01] text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="font-mono text-[11px] text-[#8c7355] dark:text-[#C5A880] tracking-wider font-bold">SITE24X7 TELEMETRY DASHBOARD</h4>
                    <span className={`font-mono text-[9px] px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 w-fit ${
                      serverStatus === 'ONLINE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      serverStatus === 'WARN' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                      'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 animate-pulse'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        serverStatus === 'ONLINE' ? 'bg-emerald-500' :
                        serverStatus === 'WARN' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      SERVER: {serverStatus}
                    </span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-xs font-sans">Simulasi pemantauan real-time ketersediaan node. Nilai CPU dan Jaringan berpindah secara dinamis di bawah.</p>
                </div>
 
                {/* Dashboard grid metrics */}
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-3 border border-stone-200 dark:border-stone-850 space-y-2">
                    <div className="flex items-center space-x-1.5 text-stone-500">
                      <Cpu className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                      <span className="font-mono text-[9px] uppercase font-bold text-stone-400 dark:text-stone-500">CPU Load</span>
                    </div>
                    <p className="font-serif tracking-tight text-xl font-bold text-stone-850 dark:text-white">{cpuLoad}%</p>
                    <div className="w-full bg-stone-150 dark:bg-stone-900 h-1 rounded">
                      <div className="bg-[#8c7355] h-full rounded transition-all duration-500" style={{ width: `${cpuLoad}%` }} />
                    </div>
                  </div>
 
                  <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-3 border border-stone-200 dark:border-stone-850 space-y-2">
                    <div className="flex items-center space-x-1.5 text-stone-500">
                      <Percent className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                      <span className="font-mono text-[9px] uppercase font-bold text-stone-400 dark:text-stone-500">RAM Cache</span>
                    </div>
                    <p className="font-serif tracking-tight text-xl font-bold text-stone-855 dark:text-white">{ramUsage}%</p>
                    <div className="w-full bg-stone-150 dark:bg-stone-900 h-1 rounded">
                      <div className="bg-[#C5A880]/90 h-full rounded transition-all duration-500" style={{ width: `${ramUsage}%` }} />
                    </div>
                  </div>
 
                  <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-3 border border-stone-200 dark:border-stone-850 space-y-2">
                    <div className="flex items-center space-x-1.5 text-stone-500">
                      <HardDrive className="w-3.5 h-3.5 text-[#8c7355] dark:text-[#C5A880]" />
                      <span className="font-mono text-[9px] uppercase font-bold text-stone-400 dark:text-stone-500">SSD Disk</span>
                    </div>
                    <p className="font-serif tracking-tight text-xl font-bold text-stone-855 dark:text-white">{diskUsage}%</p>
                    <div className="w-full bg-stone-150 dark:bg-stone-900 h-1 rounded">
                      <div className="bg-[#8c7355] h-full rounded transition-all duration-500" style={{ width: `${diskUsage}%` }} />
                    </div>
                  </div>
                </div>
 
                {/* Simulating Node Responses Network graph */}
                <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-4 border border-stone-200 dark:border-stone-850">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase block font-bold tracking-wider">DINAMIKA RESPONS PING JARINGAN (ms)</span>
                    <span className="font-mono text-[10px] text-[#8c7355] dark:text-[#C5A880] font-bold">{pingTimes[pingTimes.length - 1]}ms</span>
                  </div>
                  {/* Visual SVG mini graph */}
                  <div className="h-16 flex items-end justify-between gap-1 pt-2 px-1">
                    {pingTimes.map((ping, idx) => {
                      const maxVal = 100;
                      const heightPercent = Math.max(15, Math.min(100, (ping / maxVal) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <div
                            className={`w-full rounded-t-sm transition-all duration-300 ${
                              ping > 40 ? 'bg-red-500/40 border-t border-red-450' :
                              ping > 25 ? 'bg-yellow-500/40 border-t border-yellow-450' :
                              'bg-[#C5A880]/30 border-t border-[#8c7355]'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="font-mono text-[8px] text-stone-450 dark:text-stone-550 group-hover:text-stone-850 dark:group-hover:text-stone-200">{ping}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
 
                {/* Trigger Manual diagnostics */}
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono tracking-wider leading-tight text-left">Agent Installed: v2.1.84</span>
                  <button
                    onClick={triggerManualDiagnostics}
                    disabled={isRefreshing}
                    className="px-4 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 hover:border-[#C5A880]/50 text-stone-700 dark:text-stone-300 transition-colors flex items-center space-x-2 text-xs font-mono font-medium cursor-pointer shadow-xs"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 text-[#8c7355] ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? "Melakukan Diagnostik..." : "Jalankan Diagnostik Manual"}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Project Portfolio Showcase with Custom Screenshot Upload Verification */}
        <div id="bukti-portfolio-galeri" className="mt-24 pt-16 border-t border-[#27272A]/50 text-left space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-[#111113] border border-[#27272A]/50 px-3.5 py-1 rounded-full">
                Bukti Implementasi Nyata
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Galeri & Bukti Fisik Proyek
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Setiap rekayasa dilengkapi berkas screenshot bukti sebagai validasi otentisitas riset, keandalan fungsional, dan dokumentasi arsitektur sistem.
              </p>
            </div>
          </div>

          {dbProjects.length === 0 ? (
            <div className="bento-card p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-500">
                <ImageIcon className="w-5 h-5" />
              </div>
              <p className="text-zinc-500 text-xs font-mono">Belum ada proyek tambahan terdaftar di database local storage.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbProjects.map((project) => (
                <div 
                  key={project.id} 
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="bento-card overflow-hidden hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:border-[#C5A880]/40"
                >
                  {/* Card Image Cover / Dynamic Fallback Vector */}
                  <div className="relative">
                    {project.gambar ? (
                      <div className="w-full h-40 relative overflow-hidden bg-zinc-950 border-b border-[#27272A]/40">
                        <img 
                          src={project.gambar} 
                          alt={project.judul} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      // Render fallback category vectors
                      project.kategori === 'Mobile' ? (
                        <div className="w-full h-40 relative overflow-hidden bg-gradient-to-tr from-blue-950/40 via-indigo-950/40 to-slate-900 rounded-t-2xl border-b border-[#27272A]/40 flex flex-col items-center justify-center p-4">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
                          <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-2 shadow-lg">
                            <Cpu className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-[9px] text-blue-400 tracking-widest uppercase font-bold">Android Native Frame [Kotlin]</span>
                        </div>
                      ) : project.kategori === 'Machine Learning' ? (
                        <div className="w-full h-40 relative overflow-hidden bg-gradient-to-tr from-indigo-950/40 via-purple-950/40 to-slate-900 rounded-t-2xl border-b border-[#27272A]/40 flex flex-col items-center justify-center p-4">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none" />
                          <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-2 shadow-lg">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-[9px] text-purple-400 tracking-widest uppercase font-bold">On-Device CNN Engine</span>
                        </div>
                      ) : (
                        <div className="w-full h-40 relative overflow-hidden bg-gradient-to-tr from-emerald-950/40 via-teal-950/40 to-slate-900 rounded-t-2xl border-b border-[#27272A]/40 flex flex-col items-center justify-center p-4">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
                          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-2 shadow-lg">
                            <Server className="w-5 h-5 animate-pulse" />
                          </div>
                          <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase font-bold">Secure Telemetry Tunnel</span>
                        </div>
                      )
                    )}

                    {/* Verification ribbon */}
                    <span className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm select-none">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                      Bukti Terverifikasi
                    </span>
                  </div>

                  {/* Body description content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold bg-zinc-900 border border-zinc-805 text-zinc-400">
                          {project.kategori}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-white text-base tracking-tight capitalize group-hover:text-[#C5A880] transition-colors">
                        {project.judul}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 font-sans">
                        {project.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-[#27272A]/40 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="text-[#8c7355] dark:text-[#C5A880] hover:underline font-mono text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Studi Kasus Detail</span>
                      </button>

                      {project.url ? (
                        <a 
                          id={`link-${project.id}`}
                          href={project.url} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-400 hover:text-blue-300 font-mono text-[10px] font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <span>Kode Sumber</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-zinc-650 font-mono font-medium">Sistem Tertutup</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Modal Case Study overlay with custom backdrop and blur */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-stone-950/75 backdrop-blur-md cursor-pointer"
              id="modal-backdrop"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              id="project-case-study-modal"
              className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#151515] text-stone-900 dark:text-stone-100 rounded-[28px] border border-stone-200 dark:border-stone-850 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10 text-left"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:px-8 md:py-6 border-b border-stone-150 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-900/50 relative">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#8c7355] dark:text-[#C5A880] uppercase tracking-wider font-bold block">
                    {selectedProject.kategori}
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-955 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8c7355] dark:text-[#C5A880] shrink-0" />
                    <span>Laporan Studi Kasus: {selectedProject.judul}</span>
                  </h3>
                </div>
                
                {/* Close handle button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-500 dark:text-stone-300 transition-colors shadow-xs hover:text-stone-900 dark:hover:text-white cursor-pointer"
                  aria-label="Tutup Jendela Detail"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                
                {/* Top Grid: Cover & Technical parameters */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left block cover picture */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[4/3] bg-stone-900 border border-stone-200 dark:border-stone-800">
                      {selectedProject.gambar ? (
                        <img 
                          src={selectedProject.gambar} 
                          alt={selectedProject.judul} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-stone-950 to-stone-950">
                          <ImageIcon className="w-10 h-10 text-[#C5A880] mb-2" />
                          <span className="font-mono text-[9px] text-zinc-500 block uppercase font-bold">Dokumentasi Terverifikasi</span>
                        </div>
                      )}
                      
                      {/* Verification badge inside modal */}
                      <span className="absolute bottom-3 right-3 bg-emerald-950/90 border border-emerald-500/35 text-emerald-400 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs select-none">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                        Bukti Autentisitas: Aktif
                      </span>
                    </div>

                    {/* Meta info block */}
                    <div className="bg-stone-100/50 dark:bg-stone-900/50 rounded-2xl p-4 border border-stone-250 dark:border-stone-800 space-y-2.5">
                      <span className="font-mono text-[9.5px] text-stone-400 uppercase font-bold block tracking-wider text-left">Identifikasi Arsip</span>
                      <div className="space-y-1.5 text-xs text-stone-605 dark:text-stone-300 font-mono text-left">
                        <p className="flex justify-between">
                          <span className="text-stone-400">ID Registrasi:</span>
                          <span className="text-stone-800 dark:text-stone-100 font-semibold">{selectedProject.id}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-stone-400">Verifikator:</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">Admin Console ✓</span>
                        </p>
                        <p className="flex justify-between gap-1">
                          <span className="text-stone-400 shrink-0 font-sans">Katalog Fisik:</span>
                          <span className="text-stone-800 dark:text-stone-100 truncate flex-1 text-right">{getCaseStudy(selectedProject)?.galleryText}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Editorial case study */}
                  <div className="md:col-span-7 space-y-6">
                    {/* Tagline or description */}
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white">Deskripsi Umum</h4>
                      <p className="text-stone-650 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                        {selectedProject.deskripsi}
                      </p>
                    </div>

                    {/* Challenge Block */}
                    <div className="space-y-2.5">
                      <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                        <History className="w-4 h-4 text-red-500 shrink-0" />
                        <span>1. Masalah & Tantangan Utama</span>
                      </h4>
                      <p className="text-stone-650 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans p-3.5 bg-red-500/5 border-l-2 border-red-500/60 rounded-r-xl">
                        {getCaseStudy(selectedProject)?.challenge}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Section: Solution & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Solution block */}
                  <div className="space-y-2.5 p-5 bg-emerald-500/5 dark:bg-emerald-950/5 border border-emerald-500/20 dark:border-emerald-500/10 rounded-2xl">
                    <h4 className="font-serif font-bold text-base text-stone-950 dark:text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>2. Solusi Rekayasa Teknis</span>
                    </h4>
                    <p className="text-stone-650 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                      {getCaseStudy(selectedProject)?.solution}
                    </p>
                  </div>

                  {/* Impact block */}
                  <div className="space-y-2.5 p-5 bg-blue-500/5 dark:bg-blue-950/5 border border-blue-500/20 dark:border-blue-500/10 rounded-2xl">
                    <h4 className="font-serif font-bold text-base text-stone-950 dark:text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>3. Dampak & Hasil Terukur</span>
                    </h4>
                    <p className="text-stone-650 dark:text-stone-300 text-sm leading-relaxed text-justify font-sans">
                      {getCaseStudy(selectedProject)?.impact}
                    </p>
                  </div>
                </div>

                {/* Detailed Tech Stack tags */}
                <div className="space-y-3 pt-2 text-left">
                  <h4 className="font-serif font-bold text-xs text-stone-950 dark:text-white uppercase tracking-wider font-mono">Tumpukan Teknologi Komparatif (Full Tech Stack)</h4>
                  <div className="flex flex-wrap gap-2">
                    {getCaseStudy(selectedProject)?.techStackDetailed.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-stone-100 dark:bg-stone-900 border border-stone-250 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 font-mono text-[10px] sm:text-xs font-semibold hover:border-[#C5A880]/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer actions */}
              <div className="p-6 border-t border-stone-150 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-stone-450 dark:text-stone-550 text-[11px] font-mono leading-tight text-center sm:text-left select-none">
                  Direview oleh David Louis • Hak Cipta Komunitas & Riset Terbuka
                </p>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-4.5 py-2.5 rounded-xl bg-[#8c7355] text-white hover:bg-[#70583b] transition-all font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shadow-md"
                    >
                      <span>Kunjungi Repositori</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4.5 py-2.5 rounded-xl bg-stone-150 dark:bg-stone-850 hover:bg-stone-250 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all font-mono text-xs font-bold font-semibold cursor-pointer w-full sm:w-auto border border-stone-200 dark:border-stone-800 text-center"
                  >
                    Tutup
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
