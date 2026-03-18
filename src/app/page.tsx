"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ReactLenis } from 'lenis/react';
import { FaSpotify, FaApple, FaInstagram, FaYoutube } from "react-icons/fa";
import { MoveRight, ArrowDownRight } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} key="preloader" />}
      </AnimatePresence>

      <ReactLenis root options={{ lerp: 0.04, duration: 1.8, smoothWheel: true }}>
        <CustomCursor />
        
        <main className="relative z-10 bg-brand-dark text-brand-light font-dmsans selection:bg-brand-orange selection:text-black mb-[100vh] shadow-[0_30px_100px_rgba(0,0,0,1)] max-w-[100vw]">
          <Header />
          <Hero />
          <Marquee />
          <About />
          <HorizontalShows />
          <ListenWatch />
          <Merch />
        </main>
        
        <div className="fixed bottom-0 left-0 w-full h-screen -z-[10] bg-[#020202]">
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
}

// -----------------------------
// COMPONENTS
// -----------------------------

const SplitText = ({ text, className, delay = 0, el: Wrapper = "h2" }: { text: string, className?: string, delay?: number, el?: any }) => {
  return (
    <Wrapper className={className}>
      <motion.span 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
           visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
           hidden: {}
        }}
        className="inline-block"
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
               visible: { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", scale: 1 },
               hidden: { y: "100%", opacity: 0, rotateX: -90, filter: "blur(10px)", scale: 0.8 }
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block origin-top"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    setTimeout(onComplete, 3500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto overflow-hidden">
       <motion.div 
         exit={{ y: "-100%" }}
         transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
         className="absolute top-0 left-0 w-full h-[50vh] bg-[#030303]"
       />
       <motion.div 
         exit={{ y: "100%" }}
         transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
         className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#030303]"
       />

       <motion.div 
         exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
         transition={{ duration: 0.8, ease: "easeIn" }}
         className="relative z-10 flex flex-col items-center px-6 text-center w-full"
       >
         <div className="overflow-hidden py-2">
           <SplitText 
              text="AATMAN YODHA" 
              el="h1" 
              className="font-cinzel text-4xl md:text-[6rem] text-white tracking-[0.3em] uppercase mb-4 drop-shadow-2xl font-light leading-none" 
           />
         </div>
         
         <div className="w-full flex justify-center overflow-hidden">
            <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: "min(400px, 80vw)" }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
               className="h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent"
            />
         </div>

         <div className="overflow-hidden mt-6 md:mt-8">
            <motion.p 
               initial={{ opacity: 0, letterSpacing: "0.1em", y: "100%" }}
               animate={{ opacity: 1, letterSpacing: "0.4em", y: "0%" }}
               transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
               className="font-dmsans uppercase text-white/40 text-[10px] md:text-xs font-light whitespace-nowrap"
            >
               Sonic Architecture
            </motion.p>
         </div>
       </motion.div>
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.1 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsHovering(false);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    
    const applyHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    const elements = document.querySelectorAll("a, button, input, textarea");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", applyHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", applyHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block">
      <motion.div 
        className={`fixed top-0 left-0 bg-brand-orange rounded-full pointer-events-none z-[10000] mix-blend-difference transition-opacity duration-300 ease-out ${isHovering ? 'w-0 h-0 opacity-0' : 'w-2 h-2 -ml-1 -mt-1 opacity-100'}`}
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div 
        className={`fixed top-0 left-0 border border-brand-orange/50 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out ${isHovering ? 'w-20 h-20 -ml-10 -mt-10 bg-white border-transparent' : 'w-10 h-10 -ml-5 -mt-5'}`}
        style={{ x: ringX, y: ringY }}
      />
    </div>
  );
};

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="fixed top-0 w-full z-[50] flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference"
    >
      <div className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] text-white">AATMAN YODHA</div>
      <nav className="hidden md:flex gap-12 font-dmsans text-xs uppercase tracking-widest text-white">
        {["Home", "About", "Shows", "Music", "Shop"].map((link) => (
          <MagneticButton key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-brand-orange transition-colors">{link}</a>
          </MagneticButton>
        ))}
      </nav>
      <div className="hidden md:flex gap-6 text-lg text-white">
        <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaSpotify /></a></MagneticButton>
        <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaInstagram /></a></MagneticButton>
        <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaYoutube /></a></MagneticButton>
      </div>
    </motion.header>
  );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if(!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative px-2 py-1 inline-block"
      style={{ cursor: "none" }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black max-w-[100vw]">
      <motion.div 
        style={{ y: yImage, scale: scaleImage, opacity }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] origin-bottom"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-[#030303]/60 z-[10] mix-blend-multiply" />
        <img src="/assets/cinematic_concert.png" alt="Aatman Yodha Live" className="w-full h-full object-cover opacity-80" />
      </motion.div>

      <motion.div 
        style={{ y: yText }}
        className="relative z-[20] flex flex-col items-center pointer-events-none mt-16 md:mt-20"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="font-cinzel text-[16vw] md:text-[14vw] leading-[0.9] tracking-widest mix-blend-overlay drop-shadow-2xl flex flex-col items-center uppercase"
        >
          <span className="text-white text-outline block ml-8">AATMAN</span>
          <span className="text-[12vw] text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-white to-brand-orange drop-shadow-lg block md:ml-32">YODHA</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="absolute -bottom-24 md:-bottom-48 flex flex-col items-center gap-4"
        >
           <span className="font-dmsans uppercase tracking-[0.4em] text-[10px] md:text-xs text-brand-orange drop-shadow-lg animate-pulse">Scroll to Discover</span>
           <div className="w-[1px] h-24 md:h-32 bg-gradient-to-b from-brand-orange to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="relative w-full py-8 md:py-12 border-y border-white/5 bg-[#050505] overflow-hidden flex z-[30] max-w-[100vw]">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center">
            <h2 className="text-outline font-cinzel text-3xl md:text-6xl uppercase mx-6 md:mx-12 tracking-widest">TRANSCEND THE SOUND</h2>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand-orange mx-4 md:mx-6 shadow-[0_0_20px_rgba(231,81,20,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-20 max-w-[90rem] mx-auto min-h-screen flex items-center relative z-[20] overflow-hidden">
      <div className="w-full grid md:grid-cols-12 gap-16 md:gap-24 items-center">
        <div ref={ref} className="md:col-span-5 flex justify-center w-full">
          <motion.div 
            style={{ y: yImage }}
            className="w-full max-w-sm md:max-w-md aspect-square relative group pointer-events-none perspective-[1000px] mt-12 md:mt-0"
          >
            <div className="absolute inset-0 bg-brand-orange/10 blur-3xl opacity-50 mix-blend-screen scale-110" />
            <img src="/assets/shattered_vinyl.png" className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[10] transform rotateY-12" alt="Surreal Shattered Vinyl" />
          </motion.div>
        </div>
        
        <div className="md:col-span-7 relative z-[20]">
          <div className="mb-8 overflow-hidden inline-[block]">
             <SplitText text="The Journey" delay={0.2} className="font-cinzel text-4xl md:text-8xl uppercase block leading-none" />
             <SplitText text="of Aatman Yodha" delay={0.4} className="font-cinzel text-2xl md:text-6xl uppercase block leading-none text-brand-orange italic drop-shadow-[0_0_30px_rgba(231,81,20,0.2)] mt-2" />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ delay: 0.6, duration: 1.5 }}
            className="font-dmsans text-lg md:text-2xl leading-[1.8] text-white/60 max-w-3xl font-light"
          >
            Aatman Yodha crafts sonic experiences for the feelings we all have but rarely say out loud. Blending infectious modern melodies with deep eco-conscious themes—air, water, and soil—Aatman Yodha is redefining live concerts and sustainable artistry for a new generation.
          </motion.p>
          
          <MagneticButton>
             <motion.button 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8 }}
               className="mt-12 md:mt-16 group flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-6 border border-white/20 hover:border-brand-orange hover:bg-brand-orange/10 backdrop-blur-sm transition-all duration-500 rounded-full font-cinzel uppercase tracking-[0.2em] shadow-2xl text-xs md:text-sm hover:text-brand-orange cursor-none"
             >
               <span>Experience The Path</span>
               <MoveRight className="group-hover:translate-x-3 transition-transform duration-300" />
             </motion.button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const HorizontalShows = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section id="shows" ref={targetRef} className="relative h-[400vh] bg-[#020202] w-[100vw] left-1/2 -ml-[50vw] right-1/2">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-[100vw]">
         <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-[10vw] w-[350vw] md:w-[350vw] h-full items-center">
            
            <div className="w-[80vw] md:w-[60vw] flex-shrink-0 flex items-center">
               <SplitText text="Live" className="font-cinzel text-[14vw] md:text-[10vw] uppercase leading-none whitespace-nowrap drop-shadow-2xl block" />
               <SplitText text="Encounters" delay={0.3} className="font-cinzel text-[14vw] md:text-[10vw] uppercase leading-none whitespace-nowrap text-outline text-brand-orange block" />
            </div>
            
            {[1,2,3].map((i) => (
               <div key={i} className="w-[75vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] md:aspect-video relative group overflow-hidden border border-white/10 rounded-xl md:rounded-[2rem] shadow-2xl">
                  <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-40 transition duration-700 z-[10] mix-blend-overlay" />
                  <img src={`/assets/cinematic_concert.png`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition duration-1000 origin-center" alt={`Tour Stop ${i}`} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[10]" />
                  
                  <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16 z-[20] flex justify-between items-end w-[calc(100%-3rem)] md:w-[calc(100%-8rem)]">
                     <div>
                        <h3 className="font-cinzel text-2xl md:text-5xl uppercase tracking-[0.2em] text-white group-hover:text-brand-orange transition-colors drop-shadow-md">Global, {i}</h3>
                        <p className="font-dmsans text-sm md:text-xl mt-1 md:mt-2 text-white/50 font-light tracking-widest uppercase">Sonic Fest 2026</p>
                     </div>
                     <MagneticButton>
                        <button className="hidden md:flex w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange hover:scale-110 transition-all cursor-none backdrop-blur-md">
                           <ArrowDownRight className="text-white w-6 h-6 md:w-8 md:h-8 group-hover:rotate-[-45deg] transition-transform" />
                        </button>
                     </MagneticButton>
                  </div>
               </div>
            ))}
         </motion.div>
      </div>
    </section>
  );
};

const ListenWatch = () => {
  return (
    <section id="music" className="relative py-24 md:py-48 bg-black w-full overflow-hidden border-t border-white/5 max-w-[100vw]">
      <div className="absolute top-0 right-0 w-[100vw] md:w-[70vw] opacity-[0.10] pointer-events-none mix-blend-screen blur-md">
          <img src="/assets/vintage_mic.png" alt="Vintage Mic Accent" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-[10]">
        
        <div className="mb-16 md:mb-32">
           <SplitText text="Sonic" className="font-cinzel text-5xl md:text-[10vw] uppercase leading-[0.9] text-outline opacity-80 backdrop-blur-md inline-block mr-4 md:mr-10" />
           <SplitText text="Architecture" delay={0.2} className="font-cinzel text-5xl md:text-[10vw] uppercase leading-[0.9] opacity-80 backdrop-blur-md inline-block" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-5 bg-[#050505]/90 backdrop-blur-3xl p-6 md:p-10 rounded-3xl border border-white/5 hover:border-brand-orange/30 transition-colors group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="overflow-hidden rounded-[2rem] mb-8 md:mb-12 border border-white/10 relative shadow-2xl shadow-black">
              <img src="/assets/song-poster.jpeg" alt="New Song" className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out filter contrast-125" />
            </div>
            <h3 className="font-cinzel text-2xl md:text-4xl uppercase mb-2 md:mb-4 tracking-widest">Transcendence</h3>
            <p className="text-brand-orange mb-6 md:mb-10 tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold">The Latest Drop</p>
            <div className="pointer-events-auto">
              <iframe src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="opacity-60 hover:opacity-100 transition-opacity rounded-xl"></iframe>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full aspect-video bg-black shadow-[0_0_80px_rgba(231,81,20,0.1)] rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/5 group pointer-events-auto mb-10 md:mb-16"
            >
               <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&theme=dark" title="Aatman Yodha Music Video" frameBorder="0" allowFullScreen></iframe>
            </motion.div>
            
            <div className="bg-[#050505]/80 backdrop-blur-xl p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-white/5">
              <h3 className="font-cinzel text-xl md:text-2xl uppercase text-white/50 mb-6 md:mb-10 tracking-[0.3em]">Global Top Tracks</h3>
              <div className="flex flex-col gap-2 md:gap-4">
                 {[1,2,3].map((item, idx) => (
                    <MagneticButton key={idx}>
                        <div className="flex justify-between items-center py-4 md:py-6 border-b border-white/5 hover:px-4 md:hover:px-8 hover:bg-[#111] transition-all duration-500 rounded-xl w-full" style={{ cursor: "none" }}>
                           <div className="flex gap-4 md:gap-8 items-center">
                              <span className="font-dmsans text-lg md:text-xl text-white/20 font-light">0{item}</span>
                              <span className="font-cinzel uppercase tracking-[0.2em] md:text-xl text-xs whitespace-nowrap overflow-hidden text-ellipsis">Vibrations {item}</span>
                           </div>
                           <FaSpotify className="text-lg md:text-2xl text-white/20 hover:text-brand-orange transition-colors" />
                        </div>
                    </MagneticButton>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Merch = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40; 
    const y = (clientY / innerHeight - 0.5) * -40; 
    setMousePos({ x, y });
  };

  return (
    <section id="shop" onMouseMove={handleMouseMove} className="py-24 md:py-48 px-6 bg-[#030303] text-brand-light overflow-hidden relative min-h-screen flex items-center border-t border-white/5 max-w-[100vw]">
      
      <div className="max-w-[90rem] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-[10]">
        <div className="perspective-[1200px] flex justify-center order-2 lg:order-1">
          <motion.div 
             animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
             transition={{ type: "spring", stiffness: 40, damping: 20 }}
             className="w-full max-w-sm md:max-w-lg aspect-[4/5] bg-gradient-to-tr from-[#0a0a0a] to-[#1a1a1a] rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 shadow-[0_50px_100px_rgba(231,81,20,0.1)] relative border border-white/5"
          >
             <div className="absolute inset-x-0 bottom-8 md:bottom-12 h-16 bg-black/80 blur-2xl rounded-full scale-y-50 drop-shadow-2xl"></div>
             <img src="/assets/merch_hoodie.png" alt="Aatman Yodha Signature Hoodie" className="w-full h-full object-contain filter drop-shadow-2xl relative z-[10]" />
          </motion.div>
        </div>
        
        <div className="flex flex-col items-start px-2 lg:px-0 order-1 lg:order-2">
          <span className="uppercase font-bold tracking-[0.4em] text-brand-orange mb-4 md:mb-8 border border-brand-orange/30 px-6 py-2 rounded-full text-[10px] md:text-xs">Store Now Open</span>
          
          <div className="mb-8 md:mb-12">
             <SplitText text="Signature" className="font-cinzel text-5xl md:text-[6rem] uppercase leading-none text-white drop-shadow-lg block" />
             <SplitText text="Vault" delay={0.2} className="font-cinzel text-5xl md:text-[6rem] uppercase leading-none text-outline !text-white/5 block" />
          </div>

          <p className="text-sm md:text-xl text-white/50 font-light mb-10 md:mb-16 max-w-xl leading-[1.8] font-dmsans">
            Ultra-premium heavyweight cotton with meticulous minimal branding. Eco-consciously sourced and manufactured with the earth in mind. A true piece of sonic architecture.
          </p>
          <MagneticButton>
            <button className="bg-transparent border border-white/30 text-white rounded-full px-12 py-4 md:px-16 md:py-6 font-cinzel uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-brand-orange hover:border-brand-orange transition-all duration-500 shadow-2xl w-full md:w-auto cursor-none">
              Secure Yours
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full h-full flex flex-col justify-between pt-24 md:pt-32 pb-8 md:pb-12 px-6 md:px-12 overflow-hidden font-dmsans bg-[#020202] mix-blend-lighten">
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 z-[10] relative">
        <div className="col-span-1 md:col-span-2">
           <h4 className="font-cinzel text-2xl md:text-3xl uppercase tracking-[0.3em] text-brand-orange mb-4 md:mb-8">Stay Tuned</h4>
           <p className="text-sm md:text-md text-white/40 max-w-md font-light leading-[1.8]">Join the inner circle to get early access to tour dates, exclusive merch drops, and new single announcements.</p>
           <div className="flex w-full max-w-md border-b border-white/10 focus-within:border-brand-orange transition-colors mt-6 md:mt-10 pb-4 group">
              <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent outline-none flex-1 font-dmsans uppercase tracking-[0.2em] text-[10px] md:text-xs text-white focus:placeholder-white/20" style={{ cursor: "none" }} />
              <button className="uppercase font-bold tracking-[0.3em] text-xs text-brand-orange group-hover:text-white transition-colors px-4 cursor-none">Submit</button>
           </div>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 lg:items-end mt-8 md:mt-0">
          <h4 className="font-cinzel text-sm md:text-md uppercase tracking-[0.3em] text-white/30">Inquiries</h4>
          <MagneticButton>
            <a href="mailto:mgmt@aatmanyodha.com" className="text-xs md:text-sm text-white hover:text-brand-orange transition-colors cursor-none break-all tracking-widest uppercase font-light">mgmt@aatmanyodha.com</a>
          </MagneticButton>
          <MagneticButton>
            <a href="mailto:press@aatmanyodha.com" className="text-xs md:text-sm text-white hover:text-brand-orange transition-colors cursor-none break-all tracking-widest uppercase font-light">press@aatmanyodha.com</a>
          </MagneticButton>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 lg:items-end mt-4 md:mt-0">
          <h4 className="font-cinzel text-sm md:text-md uppercase tracking-[0.3em] text-white/30">Socials</h4>
          <div className="flex flex-col items-start lg:items-end gap-2 md:gap-3 text-xs md:text-sm text-white">
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.2em] font-light cursor-none">Spotify</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.2em] font-light cursor-none">Apple Music</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.2em] font-light cursor-none">Instagram</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.2em] font-light cursor-none">YouTube</a></MagneticButton>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-auto text-center relative z-0 opacity-80 mix-blend-plus-lighter pt-20">
        <h1 className="font-cinzel text-[20vw] md:text-[18vw] leading-none whitespace-nowrap pointer-events-none tracking-tighter text-outline select-none">
           AATMAN YODHA
        </h1>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-dmsans text-center w-full px-4">
         © 2026 Aatman Yodha. All Rights Reserved. <br className="md:hidden" /> Engineering by Ultra God Architecture.
      </div>
    </footer>
  );
}
