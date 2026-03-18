"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
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
          <StoryCause />
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
    setTimeout(onComplete, 5500);
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
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 3.5 }}
      className="fixed top-0 w-full z-[50] flex justify-between items-center px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]"
    >
      <div className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] text-white overflow-hidden">
         <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 4, ease: [0.16, 1, 0.3, 1] }}>AATMAN YODHA</motion.div>
      </div>
      <nav className="hidden md:flex gap-12 font-dmsans text-xs uppercase tracking-widest text-white">
        {["Home", "About", "Shows", "Music", "Shop"].map((link, i) => (
          <MagneticButton key={link}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 4 + i * 0.1 }}>
               <a href={`#${link.toLowerCase()}`} className="hover:text-brand-orange transition-colors duration-500">{link}</a>
            </motion.div>
          </MagneticButton>
        ))}
      </nav>
      <div className="hidden md:flex gap-6 text-lg text-white">
        <MagneticButton>
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 4.5 }}>
            <a href="#" className="hover:text-brand-orange transition-colors"><FaSpotify /></a>
          </motion.div>
        </MagneticButton>
        <MagneticButton>
           <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 4.6 }}>
            <a href="#" className="hover:text-brand-orange transition-colors"><FaInstagram /></a>
           </motion.div>
        </MagneticButton>
        <MagneticButton>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 4.7 }}>
               <a href="#" className="hover:text-brand-orange transition-colors"><FaYoutube /></a>
            </motion.div>
        </MagneticButton>
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
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yTextFront = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] max-w-[100vw]">
      
      {/* Background Image Parallax Layer */}
      <motion.div 
        style={{ y: yImage, scale: scaleImage, opacity }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] origin-bottom"
      >
        {/* Extreme Contrast Overlays to Ensure Text Readability */}
        <div className="absolute inset-0 bg-black/40 z-[10]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] z-[10]" />
        
        {/* Subtle dynamic noise on the main image */}
        <div className="absolute inset-0 bg-brand-orange/5 mix-blend-screen z-[5] pointer-events-none" />
        
        {/* Primary User Image */}
        <img src="/assets/Whisk_0d1bae8d8eeb5efb5784232fae13a5e3eg.png" alt="Aatman Yodha Main" className="w-full h-full object-cover object-top opacity-90 filter contrast-110 saturate-100" />
      </motion.div>

      {/* Typography Parallax Layer */}
      <div className="relative z-[20] flex flex-col items-center pointer-events-none mt-16 md:mt-24 h-full justify-center w-full">

        {/* Front Text (Moves Faster) */}
        <motion.h1 
          style={{ y: yTextFront }}
          initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)", rotateX: -30 }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)", rotateX: 0 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 2.5 }} 
          className="font-cinzel text-[10vw] md:text-[8vw] leading-[0.8] tracking-widest flex flex-col items-start justify-center w-full px-8 md:px-24 uppercase relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] perspective-[1000px] transform-style-3d origin-bottom pointer-events-auto"
        >
          <span className="text-white block drop-shadow-[0_10px_30px_rgba(0,0,0,1)] fire-text cursor-crosshair">AATMAN</span>
          <span className="text-[8vw] md:text-[6.5vw] text-brand-orange drop-shadow-[0_10px_30px_rgba(0,0,0,1)] block mt-2 fire-text cursor-crosshair">YODHA</span>
        </motion.h1>
        
      </div>
    </section>
  );
};

const Marquee = () => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], { clamp: false });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -1 * (delta / 1000) * 3;
    
    // Add scroll velocity to base movement
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    // Reverse direction based on scrolling up/down
    if (velocityFactor.get() < 0) { directionFactor.current = -1; } 
    else if (velocityFactor.get() > 0) { directionFactor.current = 1; }

    baseX.set(baseX.get() + moveBy);
    
    // Reset seamless loop (rough calculation based on 8 elements width)
    if (baseX.get() <= -50) { baseX.set(0); }
    else if (baseX.get() > 0) { baseX.set(-50); }
  });

  return (
    <div className="relative w-full py-6 md:py-10 border-y border-white/5 bg-[#0a0a0a] overflow-hidden flex z-[30] max-w-[100vw]">
      <motion.div 
        style={{ x: useTransform(baseX, v => `${v}%`) }}
        className="flex whitespace-nowrap"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0 group">
            <h2 className="text-outline font-cinzel text-3xl md:text-6xl uppercase mx-6 md:mx-12 tracking-widest group-hover:text-brand-orange transition-colors duration-700">TRANSCEND THE SOUND</h2>
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
  
  // Base Movement
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "35%"]);
  
  // Advanced Entrance (Scroll Down / Top Entrance) [0.1 to 0.3]
  const rotateXIn = useTransform(scrollYProgress, [0.1, 0.3], [90, 0]);
  const scaleIn = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);
  const opacityIn = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const filterIn = useTransform(scrollYProgress, [0.1, 0.3], ["brightness(2) blur(20px)", "brightness(1) blur(0px)"]);

  // Advanced Exit (Scroll Up / Bottom Exit) -> The Fire Burn [0.65 to 0.85]
  const opacityOut = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);
  const burnOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  // Combine transforms map
  const finalOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.65, 0.8], [0, 1, 1, 0]);
  const finalScale = useTransform(scrollYProgress, [0.1, 0.3, 0.65, 0.8], [0.5, 1, 1, 1.2]);
  
  // Generate massive Fire Particles (25 highly optimized pieces to save GPU memory)
  const fireParticles = Array.from({ length: 25 });
  const getFireOriginX = (i: number) => (Math.sin(i * 7) * 45 + 50) + "%"; // Spread across 5% to 95% width
  const getFireOriginY = (i: number) => (Math.cos(i * 5) * 40 + 50) + "%"; // Spread across 10% to 90% height
  const getFireDestX = (i: number) => (Math.sin(i * 3.1) * 300) + "px"; // Wild horizontal drift
  const getFireDestY = (i: number) => (-300 - (i * 12)) + "px"; // Massive vertical ascension

  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-20 max-w-[90rem] mx-auto min-h-screen flex items-center relative z-[20] overflow-hidden bg-[#0a0a0a]">
      <div className="w-full grid md:grid-cols-12 gap-16 md:gap-24 items-center">
        <div ref={ref} className="md:col-span-5 flex justify-center w-full">
          <motion.div 
            style={{ y: yImage }}
            className="w-full max-w-sm md:max-w-xl aspect-square relative group pointer-events-none perspective-[1000px] mt-12 md:mt-0"
          >
            {/* Pulsing neon aura - OPTIMIZED FOR GPU */}
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }} 
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 bg-brand-orange/20 blur-3xl scale-125 rounded-full will-change-transform transform-gpu" 
            />

            {/* The Masterpiece Asset with 3D Entrance and Burning Exit separated into OPACITY layers safely */}
            <motion.div 
               style={{ 
                 opacity: finalOpacity,
                 scale: finalScale,
                 rotateX: rotateXIn
               }}
               className="absolute inset-0 w-full h-full transform-style-3d origin-bottom will-change-transform transform-gpu"
            >
               {/* Base Normal Image */}
               <img src="/assets/main-dashboard.png" className="absolute inset-0 w-full h-full object-cover rounded-2xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[20] border border-white/10" alt="Aatman Yodha Journey Normal" />
               
               {/* Zero-Lag Burn Image Layer (Crossfades automatically on scroll) */}
               <motion.img 
                  style={{ opacity: burnOpacity }} 
                  src="/assets/main-dashboard.png" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl z-[21] mix-blend-color-dodge filter brightness-150 contrast-125 sepia hue-rotate-[-10deg] saturate-200 blur-[4px]" 
                  alt="Aatman Yodha Journey Burn Layer" 
               />
            </motion.div>
            
            {/* Outgoing Fire Explosion Particles (Volumetric Full-Image Spread - GPU OPTIMIZED) */}
            {fireParticles.map((_, i) => (
              <motion.div
                 key={`fire-${i}`}
                 style={{ 
                    opacity: useTransform(scrollYProgress, [0.65, 0.75, 0.9], [0, 1, 0]), 
                    left: getFireOriginX(i),
                    top: getFireOriginY(i),
                    x: useTransform(scrollYProgress, [0.65, 0.9], ["0px", getFireDestX(i)]),
                    y: useTransform(scrollYProgress, [0.65, 0.9], ["0px", getFireDestY(i)]),
                    rotate: useTransform(scrollYProgress, [0.65, 0.9], [0, (i % 2 === 0 ? 1 : -1) * 360]),
                    scale: useTransform(scrollYProgress, [0.65, 0.75, 0.9], [0.5, i % 3 === 0 ? 5 : 2.5, 0]),
                    backgroundColor: useTransform(scrollYProgress, [0.65, 0.75, 0.9], ["#ffff00", "#ff3300", "#110000"])
                 }}
                 className="absolute w-8 h-8 md:w-16 md:h-16 rounded-full drop-shadow-xl shadow-brand-orange z-[30] pointer-events-none will-change-transform transform-gpu"
              />
            ))}

          </motion.div>
        </div>
        
        <div className="md:col-span-7 relative z-[20]">
          <div className="mb-10 lg:mb-16 overflow-hidden inline-[block]">
             <SplitText text="THE JOURNEY" delay={0.1} className="font-cinzel text-5xl md:text-[6rem] uppercase block leading-[0.9]" />
             <SplitText text="OF AATMAN YODHA" delay={0.4} className="font-cinzel text-2xl md:text-[3rem] uppercase block leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff9e75] drop-shadow-[0_0_40px_rgba(231,81,20,0.3)] mt-4 tracking-wider" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p className="font-dmsans text-lg md:text-2xl leading-[1.8] text-white/80 max-w-3xl font-light">
              Aatman Yodha crafts sonic experiences for the feelings we all have but rarely say out loud. Blending infectious modern melodies with deep eco-conscious themes—<span className="text-white font-normal">air, water, and soil</span>.
            </p>
            <p className="font-dmsans text-lg md:text-xl leading-[1.8] text-white/40 max-w-2xl font-light">
               We are redefining live concerts and sustainable artistry for a new generation. Every show is a testament to the earth, minimizing carbon footprint while maximizing human connection.
            </p>
          </motion.div>
          
          <MagneticButton>
             <motion.button 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 1, type: "spring", stiffness: 100 }}
               className="mt-12 md:mt-20 group flex items-center gap-6 md:gap-8 px-10 py-5 border border-white/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 backdrop-blur-md transition-all duration-700 rounded-full font-cinzel uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(0,0,0,0.5)] text-xs md:text-sm hover:text-brand-orange cursor-none relative overflow-hidden"
             >
               <span className="relative z-10 font-bold">Experience The Path</span>
               <MoveRight className="relative z-10 group-hover:translate-x-4 transition-transform duration-500 ease-out" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
             </motion.button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const StoryCause = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  const storyCards = [
    {
      subtitle: "The Genesis",
      title: "Shattered Canvas",
      desc: "Every great masterpiece begins with destruction. 'Parts of Yourself' was born from the raw chaos of dismantling past identities to build an indestructible sonic foundation."
    },
    {
      subtitle: "The Cause",
      title: "Global Clarity",
      desc: "This isn't just music; it's a crusade against silence. A percentage of all streaming revenue is aggressively redirected to global mental health and ecological regeneration."
    },
    {
      subtitle: "The Awakening",
      title: "Unified Symphony",
      desc: "We don't just perform; we transform. Every note played live is biologically engineered to resonate with the earth's natural frequencies, uniting the audience into a single breathing entity."
    }
  ];

  return (
    <section id="shows" ref={targetRef} className="relative h-[400vh] bg-[#0a0a0a] w-[100vw] left-1/2 -ml-[50vw] right-1/2">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-[100vw]">
         <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-[10vw] w-[350vw] md:w-[350vw] h-full items-center">
            
            <div className="w-[80vw] md:w-[60vw] flex-shrink-0 flex items-center group cursor-none pointer-events-auto pr-8">
               <span className="font-cinzel text-[14vw] md:text-[10vw] uppercase leading-none whitespace-nowrap drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] block mr-4 md:mr-8 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-none">The</span>
               <span className="font-cinzel text-[14vw] md:text-[10vw] uppercase leading-none whitespace-nowrap encounter-text block cursor-none">Ethos</span>
            </div>
                       {storyCards.map((card, i) => (
               <div key={i} className="w-[85vw] md:w-[50vw] flex-shrink-0 aspect-[4/5] md:aspect-video relative group overflow-hidden border border-white/10 rounded-xl md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#050505] p-6 md:p-12 flex items-end">
                  <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-[10] mix-blend-screen pointer-events-none" />
                  
                  {/* Subtle Background Graphic */}
                  <img src={`/assets/cinematic_concert.png`} className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-1000 origin-center pointer-events-none" alt="" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[10] pointer-events-none" />
                  <div className="relative z-[20] w-full">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
                       <div className="max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <p className="font-dmsans text-brand-orange text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-2 md:mb-4">{card.subtitle}</p>
                         <h3 className="font-cinzel text-3xl md:text-6xl text-white mb-2 md:mb-6">{card.title}</h3>
                         <p className="font-dmsans text-white/60 text-sm md:text-lg leading-[1.8] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{card.desc}</p>
                       </div>
                       <MagneticButton>
                          <button className="hidden lg:flex flex-shrink-0 w-16 h-16 rounded-full border border-white/20 text-white items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-black transition-all duration-500 cursor-none drop-shadow-[0_0_15px_rgba(255,100,0,0)] group-hover:drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] opacity-0 group-hover:opacity-100">
                             <MoveRight className="w-6 h-6" />
                          </button>
                       </MagneticButton>
                     </div>
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
    <section id="music" className="relative py-24 md:py-48 bg-[#0a0a0a] w-full overflow-hidden border-t border-white/5 max-w-[100vw]">
      <div className="absolute top-0 right-0 w-[100vw] md:w-[70vw] opacity-[0.10] pointer-events-none blur-md will-change-transform transform-gpu">
          <img src="/assets/vintage_mic.png" alt="Vintage Mic Accent" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-[10]">
        
        <div className="mb-16 md:mb-32 group cursor-none w-fit pr-10">
           <SplitText text="Sonic" className="font-cinzel text-5xl md:text-[10vw] uppercase leading-[0.9] encounter-text block mr-4 md:mr-10 transition-all duration-500 cursor-none" />
           <SplitText text="Architecture" delay={0.2} className="font-cinzel text-5xl md:text-[10vw] uppercase leading-[0.9] opacity-90 drop-shadow-xl block mt-2 md:mt-0 transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-none" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-5 bg-[#050505] p-6 md:p-10 rounded-3xl border border-white/5 hover:border-brand-orange/30 transition-colors group shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden will-change-transform transform-gpu"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="overflow-hidden rounded-[2rem] mb-8 md:mb-12 border border-white/10 relative shadow-2xl shadow-black">
              <img src="/assets/song-poster.jpeg" alt="New Song" className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out filter contrast-125" />
            </div>
            <h3 className="font-cinzel text-2xl md:text-4xl uppercase mb-2 md:mb-4 tracking-widest">Transcendence</h3>
            <p className="text-brand-orange mb-6 md:mb-10 tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold">The Latest Drop</p>
            <div className="relative group cursor-none">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-colors duration-500 rounded-xl opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                 <a href="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" target="_blank" rel="noopener noreferrer" className="font-dmsans text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center gap-3 text-white bg-black px-6 py-3 rounded-full border border-white/20 hover:border-[#1DB954] hover:text-[#1DB954] transition-all duration-300 scale-90 group-hover:scale-100 cursor-none">
                    <FaSpotify className="text-xl" /> Listen on Spotify
                 </a>
              </div>
              <iframe src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="opacity-60 transition-opacity rounded-xl pointer-events-none w-full"></iframe>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full aspect-video bg-black shadow-[0_0_80px_rgba(231,81,20,0.1)] rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/5 group mb-10 md:mb-16 relative cursor-none"
            >
               <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-700 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="font-cinzel text-sm md:text-lg uppercase tracking-[0.2em] flex items-center gap-3 text-white bg-red-600/90 hover:bg-red-600 px-8 py-4 rounded-full shadow-2xl transition-all duration-500 scale-90 group-hover:scale-100 cursor-none">
                     <FaYoutube className="text-2xl" /> Watch on YouTube
                  </a>
               </div>
               <iframe className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-1000" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&theme=dark" title="Aatman Yodha Music Video" frameBorder="0" allowFullScreen></iframe>
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
    <section id="shop" onMouseMove={handleMouseMove} className="py-24 md:py-48 px-6 bg-[#0a0a0a] text-brand-light overflow-hidden relative min-h-screen flex items-center border-t border-white/5 max-w-[100vw]">
      
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
    <footer className="w-full h-full flex flex-col justify-between pt-24 md:pt-40 pb-8 md:pb-12 px-6 md:px-16 overflow-hidden font-dmsans bg-[#0a0a0a] relative">
      {/* Decorative large glowing sphere in background - OPTIMIZED FOR GPU */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-orange/5 blur-3xl rounded-full pointer-events-none will-change-transform transform-gpu" />

      <div className="max-w-[100rem] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 z-[10] relative">
        <div className="col-span-1 md:col-span-6">
           <SplitText text="STAY TUNED" className="font-cinzel text-3xl md:text-5xl uppercase tracking-[0.3em] text-brand-orange mb-6 md:mb-10 block" />
           <p className="text-sm md:text-lg text-white/50 max-w-lg font-light leading-[2]">Join the inner circle to get early access to tour dates, exclusive merch drops, and new single announcements.</p>
           
           <div className="flex w-full max-w-lg border-b border-white/20 hover:border-brand-orange transition-colors duration-500 mt-10 md:mt-16 pb-4 md:pb-6 group relative">
              <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent outline-none flex-1 font-dmsans uppercase tracking-[0.3em] text-[10px] md:text-xs text-white placeholder-white/20 transition-all duration-300" style={{ cursor: "none" }} />
              <button className="uppercase font-bold tracking-[0.4em] text-xs md:text-sm text-brand-orange group-hover:text-white transition-colors px-4 cursor-none">Submit</button>
           </div>
        </div>
        
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6 md:gap-10 lg:items-end mt-8 md:mt-0">
          <h4 className="font-cinzel text-xs md:text-sm uppercase tracking-[0.5em] text-white/20">Inquiries</h4>
          <MagneticButton>
            <a href="mailto:mgmt@aatmanyodha.com" className="text-xs md:text-sm text-white/80 hover:text-brand-orange transition-colors cursor-none break-all tracking-[0.2em] uppercase font-light">mgmt@aatmanyodha.com</a>
          </MagneticButton>
          <MagneticButton>
            <a href="mailto:press@aatmanyodha.com" className="text-xs md:text-sm text-white/80 hover:text-brand-orange transition-colors cursor-none break-all tracking-[0.2em] uppercase font-light">press@aatmanyodha.com</a>
          </MagneticButton>
        </div>
        
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6 md:gap-10 lg:items-end mt-4 md:mt-0">
          <h4 className="font-cinzel text-xs md:text-sm uppercase tracking-[0.5em] text-white/20">Socials</h4>
          <div className="flex flex-col items-start lg:items-end gap-4 md:gap-6 text-xs md:text-sm text-white/80">
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.3em] font-light cursor-none">Spotify</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.3em] font-light cursor-none">Apple Music</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.3em] font-light cursor-none">Instagram</a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors uppercase tracking-[0.3em] font-light cursor-none">YouTube</a></MagneticButton>
          </div>
        </div>
      </div>

      {/* Massive Background Text Drop */}
      <div className="w-full flex justify-center mt-auto text-center relative z-0 mix-blend-overlay pt-32 pb-12 overflow-hidden">
         <motion.h1 
           initial={{ y: "100%", opacity: 0 }}
           whileInView={{ y: "0%", opacity: 0.8 }}
           viewport={{ once: false, margin: "20%" }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="font-cinzel text-[20vw] md:text-[23vw] leading-[0.7] whitespace-nowrap pointer-events-none tracking-tighter text-outline select-none opacity-50"
         >
           AATMAN YODHA
         </motion.h1>
      </div>
      
      {/* Absolute strict credits */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-dmsans text-center w-full px-4 font-bold mix-blend-difference">
         © 2026 Aatman Yodha. All Rights Reserved. <br className="md:hidden" /> Developed & Engineered By <span className="text-brand-orange">ABHISHEK H & TEAM</span>.
      </div>
    </footer>
  );
}
