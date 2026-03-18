"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaSpotify, FaApple, FaTiktok, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-orange text-brand-white selection:bg-black selection:text-white pb-0 pt-0">
      <Header />
      
      <div id="home"><Hero /></div>
      <div className="w-full bg-brand-orange relative z-10 flex flex-col gap-12 lg:gap-24 overflow-hidden">
        <VideoSpotlight />
        <div id="about"><About /></div>
        <div id="listen"><Listen /></div>
        <div id="watch"><Watch /></div>
        <div id="shows"><Shows /></div>
        <div id="shop"><Shop /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </main>
  );
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["home", "about", "listen", "watch", "shows", "shop", "contact"];
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 sm:px-12 flex justify-between items-center ${scrolled ? 'bg-brand-orange/95 backdrop-blur-md shadow-xl py-4' : 'bg-transparent py-6'}`}>
      <nav className="hidden md:flex gap-6 uppercase font-oswald text-xl tracking-wider">
        {navLinks.map(link => (
          <a key={link} href={`#${link}`} className="hover:text-black transition-colors">{link}</a>
        ))}
      </nav>
      {/* Mobile Menu Icon Placeholder */}
      <div className="md:hidden font-oswald text-3xl uppercase font-bold text-white tracking-widest drop-shadow-md">
        SWAROOP
      </div>
      <div className="flex gap-4 text-2xl">
        <a href="#" className="hover:text-black transition-colors"><FaSpotify /></a>
        <a href="#" className="hover:text-black transition-colors"><FaApple /></a>
        <a href="#" className="hover:text-black transition-colors"><FaTiktok /></a>
        <a href="#" className="hover:text-black transition-colors"><FaInstagram /></a>
        <a href="#" className="hover:text-black transition-colors"><FaYoutube /></a>
        <a href="#" className="hover:text-black transition-colors"><FaFacebook /></a>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4">
      {/* Massive Background Text */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-full flex justify-center z-0 top-[15vh] md:top-[20vh]"
      >
        <h1 className="font-oswald text-[18vw] leading-none text-white/20 whitespace-nowrap uppercase tracking-tighter drop-shadow-2xl">
          Swaroop
        </h1>
      </motion.div>

      {/* Foreground Artist Image */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, filter: "brightness(0.5)" }}
        animate={{ scale: 1, opacity: 1, filter: "brightness(1)" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 w-full max-w-sm md:max-w-xl lg:max-w-2xl h-[50vh] md:h-[65vh] object-cover mt-8 pointer-events-none"
      >
        <div className="w-full h-full bg-cover bg-center md:bg-top rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10" style={{ backgroundImage: "url('/assets/main-dashboard.png')" }}>
        </div>
      </motion.div>

      {/* Polaroid Card Overlay */}
      <motion.div 
        initial={{ x: 100, opacity: 0, rotate: 10 }}
        animate={{ x: 0, opacity: 1, rotate: -6 }}
        transition={{ type: "spring", stiffness: 100, delay: 1 }}
        className="absolute z-20 bottom-[8vh] md:bottom-[15vh] right-4 md:right-32 polaroid w-48 md:w-72 shadow-2xl"
      >
        <div className="w-full aspect-square bg-gray-300 mb-4 flex flex-col items-center justify-center overflow-hidden border border-black/10">
          <img src="/assets/song-poster.jpeg" alt="New Song" className="w-full h-full object-cover filter contrast-[1.1]" />
        </div>
        <h3 className="font-oswald text-xl md:text-2xl uppercase font-bold text-center mb-2 tracking-wide">New Single Out Now</h3>
        <button className="w-full bg-brand-orange text-white py-2 font-bold uppercase tracking-wider hover:bg-black transition-colors">
          Pre-Save Now
        </button>
      </motion.div>
    </section>
  );
};

const VideoSpotlight = () => {
  return (
    <section className="pt-12 md:pt-24 px-6 w-full flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="font-oswald text-5xl md:text-7xl uppercase mb-8 md:mb-12 text-center drop-shadow-md"
      >
        Watch The 'Mess' Music Video
      </motion.h2>
      <div className="w-full max-w-5xl aspect-video bg-white p-2 md:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-1 transition-transform hover:rotate-0 duration-500">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1" 
          title="Mess Music Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 px-6 w-full flex justify-center bg-black/10 shadow-inner">
      <div className="max-w-4xl relative">
        <div className="absolute -top-6 -left-8 w-32 h-10 bg-white/70 rotate-[-12deg] z-10 shadow-sm border border-white/30 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="ripped-paper"
        >
          <h2 className="font-oswald text-4xl md:text-6xl uppercase mb-6 text-black drop-shadow-sm font-bold">About Swaroop</h2>
          <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-medium">
            Swaroop writes songs for the feelings we all have but rarely say out loud. The orange-donning artist, songwriter, and producer pairs an ear for catchy pop melodies with vivid folk-inspired storytelling, deeply rooted in eco-conscious themes. Embracing the elements of air, water, and soil, Swaroop brings sustainable pop-culture to live concerts in Gadag, making listeners cry, sing along, and say "that's so relatable."
          </p>
        </motion.div>
        <div className="absolute -bottom-6 -right-8 w-32 h-10 bg-white/70 rotate-[12deg] z-10 shadow-sm border border-white/30 backdrop-blur-sm" />
      </div>
    </section>
  );
};

const Listen = () => {
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto w-full">
      <h2 className="font-oswald text-5xl md:text-7xl uppercase mb-12 text-center font-bold drop-shadow-md">Listen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 justify-items-center">
        {[1,2,3].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="w-full polaroid max-w-sm"
          >
            {/* Spotify Embeds */}
            <iframe 
              src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="bg-gray-100"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Watch = () => {
  return (
    <section className="py-24 px-6 bg-black/5 flex flex-col items-center border-y border-white/10 shadow-inner">
      <h2 className="font-oswald text-5xl md:text-7xl uppercase mb-12 text-center font-bold drop-shadow-md">Watch</h2>
      <div className="w-full max-w-4xl flex flex-col gap-16 md:gap-24">
        {[1,2].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`w-full aspect-video bg-white p-2 md:p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} transition-transform hover:rotate-0 duration-500`}
          >
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" 
              title={`YouTube video ${i}`} 
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Shows = () => {
  const dates = [
    { date: "MAR 15", venue: "The Echo", city: "Los Angeles, CA" },
    { date: "MAR 22", venue: "Eco-Pop Fest", city: "Gadag, IN" },
    { date: "APR 05", venue: "Green Earth Stage", city: "Bangalore, IN" },
    { date: "APR 18", venue: "Nature Vibes Venue", city: "Hubli, IN" }
  ];

  return (
    <section className="py-12 md:py-24 px-6 max-w-5xl mx-auto w-full">
      <h2 className="font-oswald text-5xl md:text-7xl uppercase mb-16 text-center font-bold drop-shadow-md">Live Shows</h2>
      <div className="flex flex-col gap-6">
        {dates.map((show, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col md:flex-row justify-between items-center border-b-[3px] border-white/40 pb-6 hover:bg-black/10 hover:border-white transition-all duration-300 p-4 rounded-xl"
          >
            <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-center text-center md:text-left w-full">
              <span className="font-oswald text-4xl md:text-5xl font-bold w-32 tracking-wider">{show.date}</span>
              <span className="text-2xl md:text-3xl font-inter font-bold flex-1">{show.venue}</span>
              <span className="text-xl text-white/90 w-48 text-right hidden md:block">{show.city}</span>
              <span className="text-lg text-white/90 md:hidden mt-1">{show.city}</span>
            </div>
            <button className="mt-8 md:mt-0 font-oswald text-black bg-white px-8 py-3 text-xl md:text-2xl uppercase font-bold hover:bg-black hover:text-white transition-colors tracking-widest shadow-lg min-w-[160px]">
              Tickets
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Shop = () => {
  return (
    <section className="py-24 px-6 bg-white text-black text-center shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem] md:rounded-t-[5rem]">
      <h2 className="font-oswald text-5xl md:text-7xl uppercase mb-6 font-bold text-brand-orange mt-8">Merch Shop</h2>
      <p className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium text-gray-700">The merch store is now open! Get yourself the pop of orange you didn't know you needed today.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mb-16 flex-wrap">
        {[1,2,3,4].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10, rotate: i % 2 === 0 ? 3 : -3, scale: 1.05 }}
            className="relative w-full aspect-square bg-[#f8f8f8] rounded-3xl p-6 cursor-pointer border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400 font-bold font-oswald text-lg md:text-xl uppercase overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            <div className="relative z-10 text-center">
               <span className="text-4xl text-gray-300 block mb-2 opacity-50">👕</span>
               /assets/ <br/> merch-{i}.png
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="font-oswald bg-brand-orange text-white text-3xl md:text-4xl px-16 py-5 uppercase font-bold hover:bg-black hover:text-white transition-all transform hover:scale-105 shadow-2xl tracking-widest rounded-xl mb-12">
        Shop Merch
      </button>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto w-full">
      <h2 className="font-oswald text-5xl md:text-7xl uppercase mb-16 text-center font-bold drop-shadow-md">Contact</h2>
      <form className="flex flex-col gap-8 ripped-paper transform rotate-1 scale-100 md:scale-105" onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col gap-2 relative z-10">
          <label className="font-oswald text-2xl uppercase text-black font-bold tracking-wider">Name</label>
          <input type="text" className="border-4 border-black p-4 bg-white text-xl text-black focus:outline-none focus:ring-4 ring-brand-orange font-inter transition-all" />
        </div>
        <div className="flex flex-col gap-2 relative z-10">
          <label className="font-oswald text-2xl uppercase text-black font-bold tracking-wider">Email</label>
          <input type="email" className="border-4 border-black p-4 bg-white text-xl text-black focus:outline-none focus:ring-4 ring-brand-orange font-inter transition-all" />
        </div>
        <div className="flex flex-col gap-2 relative z-10">
          <label className="font-oswald text-2xl uppercase text-black font-bold tracking-wider">Message</label>
          <textarea rows={5} className="border-4 border-black p-4 bg-white text-xl text-black focus:outline-none focus:ring-4 ring-brand-orange font-inter transition-all resize-none"></textarea>
        </div>
        <button className="border-4 border-black font-oswald text-black bg-brand-orange text-3xl md:text-4xl px-12 py-5 uppercase font-bold hover:bg-black hover:text-brand-orange hover:border-black transition-all relative z-10 mt-6 tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
          Send Message
        </button>
      </form>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black text-white/60 py-16 text-center font-inter text-sm md:text-base px-6">
    <p>© {new Date().getFullYear()} Swaroop Music. All rights reserved.</p>
    <p className="mt-4">Created for Gadag with Eco-Conscious Vibes.</p>
  </footer>
);
