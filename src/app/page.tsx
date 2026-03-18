"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
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
        
        {/* Main Wrapper with bottom margin to reveal the fixed footer */}
        <main className="relative z-10 bg-brand-dark text-brand-light font-inter selection:bg-brand-orange selection:text-black overflow-x-hidden mb-[100vh] shadow-[0_30px_100px_rgba(0,0,0,1)]">
          <Header />
          <Hero />
          <Marquee />
          <About />
          <HorizontalShows />
          <ListenWatch />
          <Merch />
        </main>
        
        {/* Fixed Footer permanently locked to the bottom background */}
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

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        if(prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Hold at 100 for a moment
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#020202] text-brand-orange flex flex-col justify-end p-12 overflow-hidden pointer-events-auto"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-10">
        <h1 className="font-oswald text-[40vw] text-outline leading-none blur-sm pointer-events-none">SWAROOP</h1>
      </div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex justify-between items-end w-full relative z-[10]"
      >
        <div className="font-oswald text-xl md:text-3xl uppercase tracking-widest text-brand-light/60 animate-pulse">
           Loading Soundscape...
        </div>
        <div className="font-oswald text-[clamp(4rem,15vw,20rem)] leading-none text-white tracking-tighter">
          {Math.min(counter, 100)}%
        </div>
      </motion.div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
         ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }
      requestAnimationFrame(animateRing);
    };
    
    requestAnimationFrame(animateRing);
    
    const applyHover = () => {
       ringRef.current?.classList.add("cursor-hover");
       dotRef.current?.classList.add("dot-hover");
    };
    const removeHover = () => {
       ringRef.current?.classList.remove("cursor-hover");
       dotRef.current?.classList.remove("dot-hover");
    };

    window.addEventListener("mousemove", moveCursor);
    
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", applyHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-orange rounded-full pointer-events-none z-[10000] mix-blend-difference"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-brand-orange/50 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out will-change-transform"
      >
          <style dangerouslySetInnerHTML={{__html: `
              .cursor-hover { width: 80px !important; height: 80px !important; transform: translate3d(-40px, -40px, 0) !important; background-color: #fff !important; border-color: transparent !important; mix-blend-mode: difference !important; }
              .dot-hover { opacity: 0 !important; }
          `}} />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="fixed top-0 w-full z-[50] flex justify-between items-center px-8 py-6 mix-blend-difference"
    >
      <div className="font-oswald text-2xl font-bold tracking-[0.2em] text-white">SWAROOP</div>
      <nav className="hidden md:flex gap-12 font-inter text-sm uppercase tracking-widest text-white">
        {["Home", "About", "Shows", "Music", "Shop"].map((link) => (
          <MagneticButton key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-brand-orange transition-colors">{link}</a>
          </MagneticButton>
        ))}
      </nav>
      <div className="hidden md:flex gap-6 text-xl text-white">
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
    <section ref={ref} id="home" className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        style={{ y: yImage, scale: scaleImage, opacity }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] origin-bottom"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-[#030303]/60 z-[10] mix-blend-multiply" />
        <img src="/assets/cinematic_concert.png" alt="Swaroop Live" className="w-full h-full object-cover opacity-90" />
      </motion.div>

      <motion.div 
        style={{ y: yText }}
        className="relative z-[20] flex flex-col items-center pointer-events-none"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="font-oswald text-[24vw] leading-[0.8] text-brand-light m-0 tracking-tighter mix-blend-overlay drop-shadow-2xl"
        >
          SWAROOP
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute -bottom-32 flex flex-col items-center gap-4"
        >
           <span className="font-oswald uppercase tracking-[0.4em] text-sm md:text-md text-brand-orange drop-shadow-lg animate-pulse">Scroll to Discover</span>
           <div className="w-[1px] h-32 bg-gradient-to-b from-brand-orange to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="relative w-full py-8 md:py-12 border-y border-white/5 bg-[#050505] overflow-hidden flex z-[30]">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center">
            <h2 className="text-outline font-oswald text-6xl md:text-9xl uppercase mx-6 md:mx-12">TRANSCEND THE SOUND</h2>
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-brand-orange mx-4 md:mx-6 shadow-[0_0_20px_rgba(231,81,20,0.8)]" />
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
    <section id="about" className="py-32 md:py-48 px-6 md:px-20 max-w-[90rem] mx-auto min-h-screen flex items-center relative z-[20]">
      <div className="w-full grid md:grid-cols-12 gap-16 md:gap-24 items-center">
        <div ref={ref} className="md:col-span-5 flex justify-center w-full">
          <motion.div 
            style={{ y: yImage }}
            className="w-full max-w-md aspect-square relative group pointer-events-none perspective-[1000px]"
          >
            <div className="absolute inset-0 bg-brand-orange/20 blur-3xl opacity-50 mix-blend-screen scale-110" />
            <img src="/assets/shattered_vinyl.png" className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[10] transform rotateY-12" alt="Surreal Shattered Vinyl" />
          </motion.div>
        </div>
        
        <div className="md:col-span-7 relative z-[20]">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="font-oswald text-6xl md:text-8xl uppercase mb-8 leading-none"
          >
            The Voice <br/>of <span className="text-brand-orange italic drop-shadow-[0_0_30px_rgba(231,81,20,0.3)]">Gadag</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-inter text-2xl md:text-4xl leading-[1.6] text-white/70 max-w-3xl font-light"
          >
            Swaroop writes songs for the feelings we all have but rarely say out loud. Blending infectious pop melodies with deep eco-conscious themes—air, water, and soil—Swaroop is redefining live concerts and sustainable artistry for a new generation.
          </motion.p>
          
          <MagneticButton>
             <motion.button 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="mt-16 group flex items-center gap-6 px-10 py-5 border border-white/20 hover:border-brand-orange hover:bg-brand-orange transition-all duration-500 rounded-full font-oswald uppercase tracking-widest shadow-2xl text-xl hover:text-black cursor-none"
             >
               <span>Experience The Journey</span>
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
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="shows" ref={targetRef} className="relative h-[400vh] bg-[#020202]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-full">
         <motion.div style={{ x }} className="flex gap-20 px-[10vw] w-[400vw] h-full items-center">
            
            <div className="w-[80vw] flex-shrink-0 flex items-center">
               <h2 className="font-oswald text-[15vw] uppercase leading-none whitespace-nowrap drop-shadow-2xl">
                 Live <br/><span className="text-outline text-brand-orange">Encounters</span>
               </h2>
            </div>
            
            {[1,2,3,4].map((i) => (
               <div key={i} className="w-[60vw] md:w-[45vw] flex-shrink-0 aspect-[4/3] md:aspect-video relative group overflow-hidden border border-white/10 rounded-xl shadow-2xl">
                  <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-40 transition duration-700 z-[10] mix-blend-overlay" />
                  <img src={`/assets/main-dashboard.png`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition duration-1000 origin-center" alt={`Tour Stop ${i}`} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[10]" />
                  
                  <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-[20] flex justify-between items-end w-[calc(100%-4rem)] md:w-[calc(100%-8rem)]">
                     <div>
                        <h3 className="font-oswald text-5xl md:text-7xl uppercase tracking-widest text-white group-hover:text-brand-orange transition-colors drop-shadow-md">Gadag, IN</h3>
                        <p className="font-inter text-2xl md:text-3xl mt-2 text-white/70">Eco-Pop Fest 2026</p>
                     </div>
                     <MagneticButton>
                        <button className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange hover:scale-110 transition-all cursor-none">
                           <ArrowDownRight className="text-white w-8 h-8 group-hover:rotate-[-45deg] transition-transform" />
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
    <section id="music" className="relative py-32 md:py-48 bg-black w-full overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[100vw] md:w-[70vw] opacity-[0.15] pointer-events-none mix-blend-screen blur-md">
          <img src="/assets/vintage_mic.png" alt="Vintage Mic Accent" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-[10]">
        <h2 className="font-oswald text-7xl md:text-[12vw] uppercase leading-[0.8] mb-24 text-outline opacity-80 backdrop-blur-md inline-block">
          Sonic <br/> Architecture
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-5 bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hover:border-brand-orange/50 transition-colors group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="overflow-hidden rounded-2xl mb-10 border border-white/10 relative shadow-2xl shadow-black">
              <img src="/assets/song-poster.jpeg" alt="New Song" className="w-full xl:h-[24rem] aspect-square object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out filter contrast-125" />
            </div>
            <h3 className="font-oswald text-4xl md:text-5xl uppercase mb-3">Midnight Echoes</h3>
            <p className="text-brand-orange mb-8 tracking-[0.3em] uppercase text-sm font-bold">The Latest Drop</p>
            <div className="pointer-events-auto">
              <iframe src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="opacity-80 hover:opacity-100 transition-opacity rounded-xl"></iframe>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-video bg-black shadow-[0_0_80px_rgba(231,81,20,0.15)] rounded-3xl overflow-hidden border border-white/10 group pointer-events-auto mb-16"
            >
               <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&theme=dark" title="Mess Music Video" frameBorder="0" allowFullScreen></iframe>
            </motion.div>
            
            <div className="bg-[#0a0a0a]/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5">
              <h3 className="font-oswald text-3xl uppercase text-white/50 mb-8 tracking-widest">Global Top Tracks</h3>
              <div className="flex flex-col gap-4">
                 {[1,2,3,4].map((item, idx) => (
                    <MagneticButton key={idx}>
                        <div className="flex justify-between items-center py-6 border-b border-white/5 hover:px-8 hover:bg-[#111] transition-all duration-300 rounded-xl" style={{ cursor: "none" }}>
                           <div className="flex gap-8 items-center">
                              <span className="font-oswald text-3xl text-white/20 font-light tracking-tighter">0{item}</span>
                              <span className="font-oswald uppercase tracking-widest md:text-2xl">Vibrations {item}</span>
                           </div>
                           <FaSpotify className="text-3xl text-white/20 hover:text-brand-orange transition-colors" />
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
    <section id="shop" onMouseMove={handleMouseMove} className="py-32 md:py-48 px-6 bg-[#0a0a0a] text-brand-light overflow-hidden relative min-h-screen flex items-center border-t border-white/5">
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.05]">
         <h2 className="font-oswald text-[25vw] leading-none whitespace-nowrap -ml-[10%] uppercase">MERCHANDISE</h2>
         <h2 className="font-oswald text-[25vw] leading-none whitespace-nowrap ml-[10%] uppercase text-outline">MERCHANDISE</h2>
      </div>

      <div className="max-w-[90rem] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-[10]">
        <div className="perspective-[1200px] flex justify-center order-2 lg:order-1">
          <motion.div 
             animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
             transition={{ type: "spring", stiffness: 60, damping: 20 }}
             className="w-full max-w-lg aspect-[4/5] bg-gradient-to-tr from-[#111] to-[#222] rounded-[3rem] p-10 shadow-[0_50px_100px_rgba(231,81,20,0.2)] relative border border-white/10"
          >
             <div className="absolute inset-x-0 bottom-12 h-16 bg-black/50 blur-2xl rounded-full scale-y-50 mix-blend-multiply drop-shadow-2xl"></div>
             <img src="/assets/merch_hoodie.png" alt="Swaroop Signature Hoodie" className="w-full h-full object-contain filter drop-shadow-2xl relative z-[10]" />
          </motion.div>
        </div>
        
        <div className="flex flex-col items-start px-4 lg:px-0 order-1 lg:order-2">
          <span className="uppercase font-bold tracking-[0.4em] text-brand-orange mb-6 bg-brand-orange/10 px-6 py-2 rounded-full text-sm shadow-[0_0_20px_rgba(231,81,20,0.5)]">Store Now Open</span>
          <h2 className="font-oswald text-7xl md:text-[8rem] uppercase leading-[0.85] mb-10 text-white">
            Signature <br/><span className="text-outline !text-white/5">Collection</span>
          </h2>
          <p className="text-2xl md:text-3xl text-white/60 font-light mb-16 max-w-xl leading-[1.6]">
            Ultra-premium heavyweight cotton with dark minimal branding. Eco-consciously sourced and manufactured with the earth in mind.
          </p>
          <MagneticButton>
            <button className="bg-brand-orange text-black rounded-full px-16 py-6 font-oswald uppercase tracking-widest text-2xl hover:bg-white hover:text-black transition-colors shadow-2xl w-full md:w-auto cursor-none">
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
    <footer className="w-full h-full flex flex-col justify-between pt-32 pb-12 px-8 overflow-hidden font-inter bg-[#050505] mix-blend-lighten">
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 z-[10] relative">
        <div className="col-span-1 md:col-span-2">
           <h4 className="font-oswald text-4xl uppercase tracking-widest text-brand-orange mb-6">Stay Tuned</h4>
           <p className="text-xl text-white/50 max-w-md font-light leading-relaxed">Join the inner circle to get early access to tour dates, exclusive merch drops, and new singles.</p>
           <div className="flex w-full max-w-md border-b border-white/20 focus-within:border-brand-orange transition-colors mt-8 pb-4 group">
              <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" className="bg-transparent outline-none flex-1 font-inter uppercase tracking-widest text-sm text-white focus:placeholder-white/30" style={{ cursor: "none" }} />
              <button className="uppercase font-bold tracking-widest text-md text-brand-orange group-hover:text-white transition-colors px-4 cursor-none">Subscribe</button>
           </div>
        </div>
        
        <div className="flex flex-col gap-6 lg:items-end">
          <h4 className="font-oswald text-2xl uppercase tracking-widest text-white/30">Inquiries</h4>
          <MagneticButton>
            <a href="mailto:mgmt@swaroopmusic.com" className="text-2xl text-white hover:text-brand-orange transition-colors cursor-none">mgmt@swaroopmusic.com</a>
          </MagneticButton>
          <MagneticButton>
            <a href="mailto:press@swaroopmusic.com" className="text-2xl text-white hover:text-brand-orange transition-colors cursor-none">press@swaroopmusic.com</a>
          </MagneticButton>
        </div>
        
        <div className="flex flex-col gap-6 lg:items-end">
          <h4 className="font-oswald text-2xl uppercase tracking-widest text-white/30">Socials</h4>
          <div className="flex flex-col items-start lg:items-end gap-4 text-xl text-white">
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-widest font-bold cursor-none">Spotify</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-widest font-bold cursor-none">Apple Music</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-widest font-bold cursor-none">Instagram</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-widest font-bold cursor-none">YouTube</a></MagneticButton>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-auto text-center relative z-0 opacity-80 mix-blend-plus-lighter">
        <h1 className="font-oswald text-[22vw] leading-none whitespace-nowrap pointer-events-none tracking-tighter text-outline select-none">
           SWAROOP
        </h1>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-sm tracking-widest uppercase font-oswald text-center">
         © 2026 Swaroop Music. All Rights Reserved. <br/> Design by Ultra God AI.
      </div>
    </footer>
  );
}
