"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ReactLenis } from 'lenis/react';
import { FaSpotify, FaApple, FaInstagram, FaYoutube } from "react-icons/fa";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <CustomCursor />
      <main className="relative min-h-screen bg-brand-dark text-brand-light font-inter selection:bg-brand-orange selection:text-black overflow-hidden">
        <Header />
        <Hero />
        <Marquee />
        <About />
        <ListenWatch />
        <Shows />
        <Merch />
        <Footer />
      </main>
    </ReactLenis>
  );
}

// -----------------------------
// COMPONENTS
// -----------------------------

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      // Subtract half width/height to center the dot
      cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    };
    
    const applyHover = () => cursorRef.current?.classList.add("cursor-hover");
    const removeHover = () => cursorRef.current?.classList.remove("cursor-hover");

    window.addEventListener("mousemove", moveCursor);
    
    // Add hover effect listeners to interactive elements
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", applyHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", applyHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-brand-orange rounded-full pointer-events-none z-[10000] mix-blend-difference transition-all duration-300 ease-out will-change-transform"
      style={{
         transitionProperty: 'width, height, background-color'
      }}
    >
        <style dangerouslySetInnerHTML={{__html: `
            .cursor-hover { width: 60px !important; height: 60px !important; transform: translate3d(-30px, -30px, 0) !important; background-color: #fff !important; mix-blend-mode: difference !important; }
        `}} />
    </div>
  );
};

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference"
    >
      <div className="font-oswald text-2xl font-bold tracking-[0.2em] text-white">SWAROOP</div>
      <nav className="hidden md:flex gap-12 font-inter text-sm uppercase tracking-widest text-white">
        {["Home", "Music", "Shows", "Shop"].map((link) => (
          <MagneticButton key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-brand-orange transition-colors">{link}</a>
          </MagneticButton>
        ))}
      </nav>
      <div className="hidden md:flex gap-6 text-xl text-white">
        <MagneticButton><a href="#"><FaSpotify className="hover:text-brand-orange transition-colors" /></a></MagneticButton>
        <MagneticButton><a href="#"><FaInstagram className="hover:text-brand-orange transition-colors" /></a></MagneticButton>
        <MagneticButton><a href="#"><FaYoutube className="hover:text-brand-orange transition-colors" /></a></MagneticButton>
      </div>
    </motion.header>
  );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
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
      className="relative px-2 py-1"
      style={{ cursor: "none" }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Parallax effects
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Parallax */}
      <motion.div 
        style={{ y: yImage, opacity }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/60 z-10" />
        {/* Render generated asset */}
        <img src="/assets/cinematic_concert.png" alt="Swaroop Live" className="w-full h-full object-cover opacity-80" />
      </motion.div>

      {/* Massive Forensic Text */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 flex flex-col items-center pointer-events-none"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-oswald text-[22vw] leading-[0.8] text-brand-light m-0 tracking-tighter mix-blend-overlay"
        >
          SWAROOP
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute -bottom-24 md:-bottom-32 flex flex-col items-center gap-4"
        >
           <span className="font-oswald uppercase tracking-[0.4em] text-sm md:text-md text-brand-orange drop-shadow-lg">Discover The Sound</span>
           <div className="w-[1px] h-24 md:h-32 bg-gradient-to-b from-brand-orange to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="relative w-full py-6 md:py-8 border-y border-white/5 bg-brand-dark overflow-hidden flex z-30">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            <h2 className="text-outline font-oswald text-5xl md:text-8xl uppercase mx-6 md:mx-8">NEW SINGLE OUT NOW</h2>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand-orange mx-4 md:mx-4 shadow-[0_0_15px_rgba(231,81,20,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto min-h-[80vh] flex items-center relative z-20">
      <div className="w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 flex justify-center perspective-[1000px]">
          <motion.div 
            ref={ref}
            initial={{ rotateY: 30, opacity: 0, x: -50 }}
            animate={isInView ? { rotateY: 0, opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-sm aspect-[3/4] relative group"
          >
            <div className="absolute inset-0 bg-brand-orange transform translate-x-4 translate-y-4 rounded-sm shadow-2xl" />
            <img src="/assets/main-dashboard.png" className="absolute inset-0 w-full h-full object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700" alt="Swaroop portrait" />
          </motion.div>
        </div>
        
        <div className="md:col-span-8">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-oswald text-5xl md:text-7xl uppercase mb-8"
          >
            The Voice of <br/><span className="text-brand-orange">Gadag</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-inter text-xl md:text-3xl leading-relaxed text-white/70 max-w-3xl font-light"
          >
            Swaroop writes songs for the feelings we all have but rarely say out loud. Blending infectious pop melodies with deep eco-conscious themes—air, water, and soil—Swaroop is redefining live concerts and sustainable artistry.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 group flex items-center gap-4 px-8 py-4 border border-white/20 hover:border-brand-orange hover:bg-brand-orange transition-all duration-300 rounded-full font-oswald uppercase tracking-widest shadow-lg"
          >
            <span style={{ cursor: "none" }}>Read Full Story</span>
            <MoveRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const ListenWatch = () => {
  return (
    <section id="music" className="relative py-24 md:py-32 bg-black w-full overflow-hidden">
      {/* Background Accent Image from AI */}
      <div className="absolute top-0 right-0 w-[80vw] md:w-[60vw] opacity-30 pointer-events-none mix-blend-lighten blur-sm">
          <img src="/assets/vintage_mic.png" alt="Vintage Mic Accent" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="font-oswald text-6xl md:text-[8vw] uppercase leading-none mb-16 text-outline drop-shadow-2xl">
          Listen
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          {/* New Release Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-orange/50 transition-colors group shadow-2xl relative overflow-hidden backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="overflow-hidden rounded-xl mb-8 border border-white/10 relative">
              <img src="/assets/song-poster.jpeg" alt="New Song" className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-oswald text-3xl md:text-4xl uppercase mb-2">Midnight Echoes</h3>
            <p className="text-brand-orange/80 mb-6 tracking-widest uppercase text-sm font-bold">Latest Single</p>
            <div className="pointer-events-auto">
              <iframe src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="opacity-90 hover:opacity-100 transition-opacity"></iframe>
            </div>
          </motion.div>

          {/* Videos and Tracks */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="font-oswald text-2xl md:text-4xl uppercase text-brand-orange border-b border-white/10 pb-4 mb-8">Music Video</h3>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full aspect-video bg-black shadow-[0_0_50px_rgba(231,81,20,0.1)] rounded-xl overflow-hidden border border-white/10 group pointer-events-auto"
              >
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&theme=dark" title="Mess Music Video" frameBorder="0" allowFullScreen></iframe>
              </motion.div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-oswald text-2xl uppercase text-white/50 mb-6">Top Tracks</h3>
              <div className="flex flex-col gap-2">
                 {[1,2,3].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-white/5 hover:px-6 hover:bg-white/5 transition-all duration-300" style={{ cursor: "none" }}>
                       <div className="flex gap-6 items-center">
                          <span className="font-oswald text-2xl text-white/20">0{item}</span>
                          <span className="font-inter font-bold uppercase tracking-wider md:text-xl">Song Title {item}</span>
                       </div>
                       <FaSpotify className="text-2xl text-white/30 hover:text-brand-orange transition-colors" />
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Shows = () => {
  const dates = [
    { date: "MAR 15", venue: "The Echo", city: "Los Angeles, CA" },
    { date: "MAR 22", venue: "Eco-Pop Fest", city: "Gadag, IN" },
    { date: "APR 05", venue: "Green Earth Stage", city: "Bangalore, IN" },
    { date: "MAY 12", venue: "Global Sound", city: "Mumbai, IN" }
  ];

  return (
    <section id="shows" className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
        <h2 className="font-oswald text-5xl md:text-8xl uppercase tracking-tighter">Live<br/><span className="text-brand-orange">Shows</span></h2>
        <a href="#" className="uppercase tracking-widest text-sm font-bold pb-2 border-b border-brand-orange hover:text-brand-orange transition-colors">All Dates</a>
      </div>
      
      <div className="flex flex-col">
        {dates.map((show, idx) => (
          <ShowRow key={idx} show={show} index={idx} />
        ))}
      </div>
    </section>
  );
};

const ShowRow = ({ show, index }: { show: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col md:flex-row justify-between md:items-center py-8 md:py-12 border-b border-white/10 hover:bg-[#111] transition-colors px-4 overflow-hidden" style={{ cursor: "none" }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-center relative z-10 w-full">
        <span className="font-oswald text-4xl md:text-6xl text-brand-orange group-hover:text-white transition-colors w-32 md:w-40">{show.date}</span>
        <span className="font-oswald text-2xl md:text-5xl uppercase tracking-wide group-hover:translate-x-4 transition-transform">{show.venue}</span>
      </div>
      <div className="flex justify-between w-full md:w-auto items-center mt-6 md:mt-0 relative z-10">
        <span className="text-sm md:text-xl text-white/50 group-hover:text-white/90 md:mr-12 font-inter tracking-widest uppercase">{show.city}</span>
        <button className="rounded-full border border-white/30 px-6 py-2 md:px-8 md:py-3 uppercase tracking-widest text-xs md:text-sm font-bold group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white hover:scale-105 transition-all duration-300">
          RSVP
        </button>
      </div>
    </motion.div>
  );
};

const Merch = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30; // Tilt intensity
    const y = (clientY / innerHeight - 0.5) * -30; 
    setMousePos({ x, y });
  };

  return (
    <section id="shop" onMouseMove={handleMouseMove} className="py-24 md:py-32 px-6 bg-brand-light text-brand-dark overflow-hidden relative min-h-screen flex items-center">
      {/* Background massive text */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.03]">
         <h2 className="font-oswald text-[25vw] leading-none whitespace-nowrap -ml-[10%] uppercase">MERCH SHOP</h2>
         <h2 className="font-oswald text-[25vw] leading-none whitespace-nowrap ml-[10%] uppercase">MERCH SHOP</h2>
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
        <div className="perspective-[1200px] flex justify-center">
          <motion.div 
             animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
             transition={{ type: "spring", stiffness: 70, damping: 20 }}
             className="w-full max-w-sm md:max-w-md aspect-[4/5] bg-gradient-to-tr from-[#e5e5e5] to-[#f4f4f5] rounded-[2rem] p-6 shadow-2xl relative border border-white/50"
          >
             {/* Uses our new AI generated isolated hoodie */}
             <div className="absolute inset-x-0 bottom-10 h-12 bg-black/10 blur-xl rounded-full scale-y-50"></div>
             <img src="/assets/merch_hoodie.png" alt="Swaroop Signature Hoodie" className="w-full h-full object-contain filter drop-shadow-2xl relative z-10" />
          </motion.div>
        </div>
        
        <div className="flex flex-col items-start px-4 md:px-0">
          <span className="uppercase font-bold tracking-[0.3em] text-brand-orange mb-4 inline-block bg-brand-orange/10 px-4 py-1 rounded-full text-sm">Store Open</span>
          <h2 className="font-oswald text-5xl md:text-8xl uppercase leading-[0.9] mb-8 drop-shadow-sm">
            Signature <br/><span className="text-black/20 text-outline">Collection</span>
          </h2>
          <p className="text-xl md:text-2xl text-black/60 font-light mb-12 max-w-lg leading-relaxed">
            Ultra-premium heavyweight cotton with dark minimal branding. Eco-consciously sourced and manufactured with the earth in mind.
          </p>
          <MagneticButton>
            <button className="bg-brand-dark text-white rounded-full px-12 py-5 font-oswald uppercase tracking-widest text-xl hover:bg-brand-orange transition-colors shadow-xl w-full md:w-auto">
              Shop Now
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark pt-24 md:pt-32 pb-8 px-6 flex flex-col items-center border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24 z-10 relative">
        <div className="flex flex-col gap-4">
          <h4 className="font-oswald text-2xl md:text-3xl uppercase tracking-widest">Bookings</h4>
          <MagneticButton>
            <a href="mailto:mgmt@swaroopmusic.com" className="text-lg md:text-xl text-white/50 hover:text-brand-orange transition-colors inline-block pb-1 border-b border-transparent hover:border-brand-orange">mgmt@swaroopmusic.com</a>
          </MagneticButton>
        </div>
        <div className="flex flex-col gap-4 md:items-center">
          <h4 className="font-oswald text-2xl md:text-3xl uppercase tracking-widest">Socials</h4>
          <div className="flex gap-6 text-2xl text-white/50">
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaSpotify /></a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaApple /></a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaInstagram /></a></MagneticButton>
            <MagneticButton><a href="#" className="hover:text-brand-orange transition-colors"><FaYoutube /></a></MagneticButton>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end w-full">
           <h4 className="font-oswald text-2xl md:text-3xl uppercase tracking-widest">Newsletter</h4>
           <div className="flex w-full md:w-auto border-b border-white/30 focus-within:border-brand-orange transition-colors pb-2 group">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent outline-none flex-1 font-inter uppercase tracking-widest text-sm text-white focus:placeholder-white/30" style={{ cursor: "none" }} />
              <button className="uppercase font-bold tracking-widest text-sm text-white/50 group-hover:text-brand-orange transition-colors px-2">Join</button>
           </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-auto md:-mb-12 text-center relative z-0">
        <h1 className="font-oswald text-[18vw] leading-none text-outline whitespace-nowrap pointer-events-none opacity-50 selection:bg-transparent">SWAROOP</h1>
      </div>
    </footer>
  );
};
