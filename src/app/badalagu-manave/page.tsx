"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ArrowDown, Droplets, Wind, Activity, CheckCircle, Leaf, Users, Megaphone, Music, Headphones, Image as ImageIcon } from "lucide-react";
import Lenis from 'lenis';

export default function BadalaguManave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Parallax mappings
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const problemBgY = useTransform(scrollYProgress, [0.1, 0.4], ["-20%", "20%"]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const [activeRole, setActiveRole] = useState("Volunteer");
  const [formState, setFormState] = useState("idle"); // idle, submitting, success

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <main ref={containerRef} className="relative bg-[#020202] text-white overflow-hidden selection:bg-[#00e5ff] selection:text-black">
      {/* GLOBAL NOISE GRAIN */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}></div>

      {/* FLOATING NAVBAR */}
      <header className="fixed top-0 w-full z-50 px-6 py-8 mix-blend-difference flex justify-between items-center">
         <div className="font-cinzel tracking-[0.2em] font-bold text-xl md:text-2xl cursor-pointer">
           AATMAN YODHA
         </div>
         <nav className="hidden md:flex gap-8 font-dmsans text-xs uppercase tracking-widest text-white/50">
            <a href="#problem" className="hover:text-white transition-colors">The Crisis</a>
            <a href="#mission" className="hover:text-white transition-colors">Our Mission</a>
            <a href="#music" className="hover:text-white transition-colors">The Song</a>
            <a href="#join" className="text-[#00e5ff] font-bold tracking-[0.3em] ml-8 border-b border-[#00e5ff]/30 pb-1 hover:border-[#00e5ff] transition-all">Join Movement</a>
         </nav>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#020202] z-10"></div>
          <img src="/assets/hero_split_image.png" alt="Urban Pollution vs Youth Hope" className="w-full h-full object-cover scale-105" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-20">
          <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
             className="font-dmsans text-[#00e5ff] uppercase tracking-[0.5em] text-xs md:text-sm font-bold mb-6"
          >
             Change Begins Within Us
          </motion.p>
          
          <motion.h1 
             initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.5, ease: "easeOut" }}
             className="font-cinzel text-5xl md:text-[8rem] lg:text-[10rem] uppercase leading-[0.9] tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Badalagu<br />Manave
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
             className="mt-10 font-dmsans text-white/60 text-lg md:text-2xl max-w-2xl font-light leading-relaxed"
          >
             Our cities are choking. Our waters are dying. <br className="hidden md:block"/>But the greatest force of nature—<span className="text-white font-medium">the youth</span>—has just awakened. 
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
             className="flex flex-col md:flex-row gap-6 mt-16"
          >
             <button className="group flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-full font-dmsans uppercase text-xs tracking-widest font-bold hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <Play fill="currentColor" className="w-4 h-4" /> Watch Teaser
             </button>
             <a href="#join" className="group flex items-center justify-center gap-4 bg-transparent border border-white/20 text-white px-8 py-5 rounded-full font-dmsans uppercase text-xs tracking-widest hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-all duration-500 backdrop-blur-md">
                Join Movement <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
             </a>
             <a href="#partners" className="group flex items-center justify-center gap-4 bg-transparent text-white/50 px-8 py-5 font-dmsans uppercase text-xs tracking-widest hover:text-white transition-colors duration-500">
                Become a Partner
             </a>
          </motion.div>
        </div>

        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 text-white"
        >
           <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section id="problem" className="relative py-32 md:py-48 px-6 min-h-screen border-t border-white/5 flex flex-col items-center">
         <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#0a0505] to-[#020202] z-0"></div>
         
         <div className="relative z-10 w-full max-w-[100rem]">
            <motion.div 
               initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
               className="text-center mb-24 md:mb-40"
            >
               <h2 className="font-dmsans text-[#ff4500] uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-4">The Crisis</h2>
               <h3 className="font-cinzel text-5xl md:text-7xl uppercase text-white leading-tight">We Are Bleeding<br/>The Canvas</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
               {/* Air */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1 }}
                 className="group flex flex-col gap-8"
               >
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5">
                    <img src="/assets/air_pollution_image.png" alt="Air Pollution" className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <Wind className="absolute top-8 left-8 w-10 h-10 text-white/20 group-hover:text-white transition-colors duration-500" />
                 </div>
                 <div>
                    <h4 className="font-cinzel text-2xl md:text-3xl text-white mb-4 uppercase tracking-widest">Air Pollution</h4>
                    <p className="font-dmsans text-white/50 leading-relaxed font-light">The invisible poison settling in our lungs. We are breathing the ashes of our own relentless consumption.</p>
                 </div>
               </motion.div>

               {/* Water */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.3 }}
                 className="group flex flex-col gap-8 md:translate-y-20"
               >
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5">
                    <img src="/assets/water_pollution_image.png" alt="Water Pollution" className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <Droplets className="absolute top-8 left-8 w-10 h-10 text-white/20 group-hover:text-[#00e5ff] transition-colors duration-500" />
                 </div>
                 <div>
                    <h4 className="font-cinzel text-2xl md:text-3xl text-white mb-4 uppercase tracking-widest">Toxic Waters</h4>
                    <p className="font-dmsans text-white/50 leading-relaxed font-light">Rivers that once gave life now carry the industrial graves of our negligence. The lifeblood of the city is choking.</p>
                 </div>
               </motion.div>

               {/* Lifestyle */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.5 }}
                 className="group flex flex-col gap-8"
               >
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5">
                    <img src="/assets/unhealthy_lifestyle_image.png" alt="Unhealthy Lifestyle" className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <Activity className="absolute top-8 left-8 w-10 h-10 text-white/20 group-hover:text-[#ff4500] transition-colors duration-500" />
                 </div>
                 <div>
                    <h4 className="font-cinzel text-2xl md:text-3xl text-white mb-4 uppercase tracking-widest">Lethargic Rot</h4>
                    <p className="font-dmsans text-white/50 leading-relaxed font-light">Trapped in screens, fueled by synthetics. As the environment degrades, our physical and mental fortitudes disintegrate.</p>
                 </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section id="mission" className="relative py-32 md:py-48 px-6 bg-[#000]">
         <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" 
         />
         
         <div className="max-w-[90rem] mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 flex flex-col gap-12">
               <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h2 className="font-dmsans text-[#00e5ff] uppercase tracking-[0.4em] text-xs font-bold mb-4">The Solution</h2>
                  <h3 className="font-cinzel text-5xl md:text-6xl uppercase text-white leading-none">Awakening<br/>Action</h3>
                  <p className="font-dmsans text-white/50 mt-8 text-lg leading-relaxed max-w-lg font-light">
                     Despair is a virus. We counter it with momentum. This movement channels youth energy into highly structured, physical interventions across the city.
                  </p>
               </motion.div>

               <div className="flex flex-col gap-8 pl-4 border-l border-white/10">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex gap-6">
                     <Megaphone className="w-8 h-8 text-[#00e5ff] flex-shrink-0" />
                     <div>
                        <h4 className="font-cinzel text-xl text-white tracking-widest uppercase mb-2">College Infiltration</h4>
                        <p className="font-dmsans text-white/40 text-sm leading-relaxed">Aggressive awareness campaigns touring across 50+ college campuses, disrupting the apathy of the student body.</p>
                     </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="flex gap-6">
                     <ImageIcon className="w-8 h-8 text-[#00e5ff] flex-shrink-0" />
                     <div>
                        <h4 className="font-cinzel text-xl text-white tracking-widest uppercase mb-2">Viral Contagion</h4>
                        <p className="font-dmsans text-white/40 text-sm leading-relaxed">Producing high-fidelity, highly-shareable social media documentaries that force the city to look in the mirror.</p>
                     </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="flex gap-6">
                     <Leaf className="w-8 h-8 text-[#00e5ff] flex-shrink-0" />
                     <div>
                        <h4 className="font-cinzel text-xl text-white tracking-widest uppercase mb-2">Ground Zero Ops</h4>
                        <p className="font-dmsans text-white/40 text-sm leading-relaxed">Mobilizing thousands for massive tree-planting drives and tactical urban cleanups. Dirt on our hands.</p>
                     </div>
                  </motion.div>
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, filter: "blur(20px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 1 }}
               className="order-1 lg:order-2 relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_80px_rgba(0,229,255,0.1)]"
            >
               <img src="/assets/mission_hope_image.png" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Mission Hope" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent"></div>
            </motion.div>
         </div>
      </section>

      {/* 4. THE SONG SECTION */}
      <section id="music" className="relative py-32 md:py-48 px-6 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="/assets/song-poster.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xl scale-125" alt="Background Texture" />
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl"></div>
         </div>

         <div className="relative z-10 max-w-[80rem] mx-auto flex flex-col items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
               <h2 className="font-dmsans text-brand-orange uppercase tracking-[0.4em] text-xs font-bold mb-4">The Anthem</h2>
               <h3 className="font-cinzel text-4xl md:text-6xl uppercase text-white">The Sonic Awakening</h3>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
               className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center shadow-2xl"
            >
               <div className="w-full lg:w-1/2 aspect-square md:aspect-video lg:aspect-square relative rounded-2xl overflow-hidden group cursor-pointer bg-black">
                  <img src="/assets/song_thumbnail_image.png" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Song Video Thumbnail" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                     <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00e5ff] group-hover:border-[#00e5ff] group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                     </div>
                  </div>
               </div>

               <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <div className="flex gap-4 items-center mb-6">
                     <span className="bg-[#00e5ff]/20 text-[#00e5ff] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-[#00e5ff]/30">Unreleased</span>
                     <span className="text-white/40 text-xs font-dmsans tracking-widest uppercase flex items-center gap-2"><Headphones className="w-4 h-4"/> Collab</span>
                  </div>
                  <h4 className="font-cinzel text-3xl md:text-5xl text-white mb-6 uppercase tracking-widest">Badalagu Manave</h4>
                  <p className="font-dmsans text-white/50 text-base md:text-lg leading-relaxed font-light mb-8">
                     This is not just a song. It is a collaborative war-cry recorded by over 40+ student musicians, independent creators, and vocalists from across the city. The track serves as the beating heart of the movement, fusing cinematic orchestration with raw, street-level energy.
                  </p>
                  
                  <div className="flex gap-8 mb-10 w-full">
                     <div className="flex flex-col">
                        <span className="font-dmsans text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</span>
                        <span className="font-cinzel text-white text-lg tracking-widest">Mastering</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="font-dmsans text-[10px] uppercase tracking-widest text-white/30 mb-1">Collaborators</span>
                        <span className="font-cinzel text-white text-lg tracking-widest">47 Artists</span>
                     </div>
                  </div>

                  <button className="w-full md:w-auto px-10 py-4 bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-dmsans uppercase text-xs tracking-[0.3em] font-bold transition-all duration-500 rounded-full">
                     Pre-Save Track
                  </button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. COMMUNITY SECTION */}
      <section className="relative py-32 md:py-48 px-6 bg-[#020202] border-t border-white/5 overflow-hidden">
         <div className="max-w-[100rem] mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-2 lg:order-1">
               <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-4 md:gap-6 translate-y-12">
                     <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5">
                        <img src="/assets/community_grid_image.png" className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt="Students" />
                     </div>
                     <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                        <img src="/assets/cinematic_concert.png" className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt="Concert" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-4 md:gap-6">
                     <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                        <img src="/assets/main-dashboard.png" className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-60" alt="Action" />
                     </div>
                     <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#00e5ff]/5 border border-[#00e5ff]/20 flex flex-col items-center justify-center p-8 text-center text-[#00e5ff]">
                        <Users className="w-10 h-10 mb-4 opacity-50" />
                        <span className="font-cinzel text-4xl mb-2">5,000+</span>
                        <span className="font-dmsans text-[10px] uppercase tracking-widest font-bold">Youth United</span>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-1 lg:order-2 flex flex-col items-start lg:pl-12">
               <h2 className="font-dmsans text-[#00e5ff] uppercase tracking-[0.4em] text-xs font-bold mb-4">The Community</h2>
               <h3 className="font-cinzel text-5xl md:text-7xl uppercase text-white leading-tight mb-8">Together, We Are The Change</h3>
               <p className="font-dmsans text-white/50 text-lg leading-relaxed font-light mb-12 max-w-xl">
                  This isn't an organization; it's an organism. Driven entirely by the relentless passion of college students, volunteers, and underground artists who refuse to hand over a dead planet to the next generation.
               </p>
               <div className="flex gap-4 items-center pl-6 border-l-2 border-[#00e5ff]/50">
                  <p className="font-cinzel text-xl text-white italic tracking-widest">"No single drop of water thinks it is responsible for the flood."</p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 6. PARTNERS SECTION */}
      <section id="partners" className="relative py-32 md:py-48 px-6 bg-[#0a0a0a]">
         <div className="max-w-[90rem] mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
               <h2 className="font-dmsans text-white/30 uppercase tracking-[0.4em] text-xs font-bold mb-4">The Alliance</h2>
               <h3 className="font-cinzel text-4xl md:text-5xl uppercase text-white mb-8">Entities of Impact</h3>
               <p className="font-dmsans text-white/40 max-w-2xl mx-auto font-light leading-relaxed">The organizations, colleges, and sustainable brands that have pledged their resources to amplify this frequency.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-20">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                     key={i} 
                     className="aspect-video bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-center justify-center rounded-xl transition-all duration-500 group cursor-pointer"
                  >
                     <span className="font-cinzel text-white/20 group-hover:text-white/60 tracking-[0.3em] text-xs md:text-sm uppercase transition-colors duration-500">Partner 0{i}</span>
                  </motion.div>
               ))}
            </div>

            <div className="flex justify-center flex-col items-center">
               <p className="font-dmsans text-white/40 mb-8 text-sm uppercase tracking-widest text-center">Stand with us</p>
               <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-dmsans text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500">
                  Submit Partnership Inquiry
               </button>
            </div>
         </div>
      </section>

      {/* 7. STUDENT REGISTRATION */}
      <section id="join" className="relative py-32 md:py-48 px-6 bg-[#050505] overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00e5ff]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
         
         <div className="max-w-[80rem] mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
               <h2 className="font-dmsans text-[#00e5ff] uppercase tracking-[0.4em] text-xs font-bold mb-4">Enlist</h2>
               <h3 className="font-cinzel text-5xl md:text-7xl uppercase text-white mb-8">Join The<br/>Frequency</h3>
               <p className="font-dmsans text-white/50 text-lg leading-relaxed font-light mb-12 max-w-lg">
                  This movement requires mass. Whether you yield a microphone, a shovel, or simply your voice on social media, there is a position for you on the frontlines.
               </p>
               <div className="hidden lg:flex gap-6 items-center opacity-30 mt-20">
                  <span className="font-cinzel text-6xl">07</span>
                  <div className="h-[1px] w-20 bg-white"></div>
                  <span className="font-dmsans uppercase tracking-widest text-xs">Final Sector</span>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
               <form onSubmit={handleRegister} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col gap-8">
                  
                  {formState === "success" && (
                     <div className="absolute inset-0 bg-[#050505]/95 z-50 flex flex-col items-center justify-center text-center p-8 backdrop-blur-3xl">
                        <CheckCircle className="w-16 h-16 text-[#00e5ff] mb-6" />
                        <h4 className="font-cinzel text-3xl uppercase text-white mb-4">Transmission Received</h4>
                        <p className="font-dmsans text-white/60 tracking-widest text-sm uppercase">Stand by for deployment instructions.</p>
                     </div>
                  )}

                  <div>
                     <label className="block font-dmsans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Select Configuration</label>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Artist", "Volunteer", "Supporter"].map(role => (
                           <button 
                              key={role} type="button" onClick={() => setActiveRole(role)}
                              className={`py-4 rounded-xl border text-xs tracking-widest uppercase font-dmsans transition-all duration-300 ${activeRole === role ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]' : 'border-white/10 text-white/40 hover:bg-white/5'}`}
                           >
                              {role}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="flex flex-col gap-2">
                        <label className="font-dmsans text-[10px] uppercase tracking-[0.3em] text-white/50">Full Name</label>
                        <input required type="text" className="bg-transparent border-b border-white/20 py-3 text-white focus:border-[#00e5ff] focus:outline-none transition-colors font-dmsans" placeholder="JOHN DOE" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="font-dmsans text-[10px] uppercase tracking-[0.3em] text-white/50">College / Organization</label>
                        <input required type="text" className="bg-transparent border-b border-white/20 py-3 text-white focus:border-[#00e5ff] focus:outline-none transition-colors font-dmsans" placeholder="UNIVERSITY NAME" />
                     </div>
                     <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="font-dmsans text-[10px] uppercase tracking-[0.3em] text-white/50">Contact Interface (Email / Phone)</label>
                        <input required type="text" className="bg-transparent border-b border-white/20 py-3 text-white focus:border-[#00e5ff] focus:outline-none transition-colors font-dmsans" placeholder="CONTACT INFO" />
                     </div>
                  </div>

                  <button 
                     disabled={formState === "submitting"}
                     type="submit" 
                     className="mt-6 w-full py-5 bg-white text-black font-dmsans text-xs uppercase tracking-[0.4em] font-bold rounded-xl hover:bg-[#00e5ff] hover:text-black transition-all duration-500 disabled:opacity-50"
                  >
                     {formState === "submitting" ? "Initiating..." : "Initialize Profile"}
                  </button>
               </form>
            </motion.div>
         </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="w-full bg-[#020202] border-t border-white/10 py-16 px-6 font-dmsans">
         <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-2">
               <h4 className="font-cinzel text-2xl uppercase tracking-widest text-[#00e5ff] mb-6">Badalagu Manave</h4>
               <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
                  A sub-initiative of Aatman Yodha. Driving ecological awareness and mental health advocacy through the unparalleled power of sonic architecture and physical intervention.
               </p>
            </div>
            
            <div className="flex flex-col gap-4">
               <h4 className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">Navigation</h4>
               <a href="/" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">Main Hub</a>
               <a href="/about" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">About</a>
               <a href="/shop" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">The Vault</a>
            </div>

            <div className="flex flex-col gap-4">
               <h4 className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">Comms</h4>
               <a href="#" className="text-xs text-white/60 hover:text-[#00e5ff] uppercase tracking-widest transition-colors">Instagram</a>
               <a href="#" className="text-xs text-white/60 hover:text-[#00e5ff] uppercase tracking-widest transition-colors">Spotify</a>
               <a href="mailto:contact@aatmanyodha.com" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors mt-4">contact@aatmanyodha.com</a>
            </div>
         </div>
         
         <div className="max-w-[90rem] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-widest text-white/30">&copy; 2026 AATMAN YODHA PROJECT. ALL RIGHTS RESERVED.</p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-cinzel">Change Begins Within Us</p>
         </div>
      </footer>
    </main>
  );
}
