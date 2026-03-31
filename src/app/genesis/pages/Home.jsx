import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const letterAnimation = {
  hidden: { y: 100, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  })
};

const AnimatedText = ({ text, className, style }) => {
  return (
    <div style={{ overflow: "hidden", display: "flex", justifyContent: "center" }} className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          custom={index}
          variants={letterAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={index}
          style={style}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div 
      ref={ref} 
      style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      
      
      <div style={{ textAlign: 'center', zIndex: 1, padding: '0 2rem' }}>
        <AnimatedText 
          text="BADALAGU MANAVE" 
          className="text-shiny-silver" 
          style={{ fontSize: '7vw', fontWeight: 900, letterSpacing: '8px', lineHeight: 1.1, marginBottom: '2rem', textShadow: '0 10px 30px rgba(0,0,0,0.8)', display: 'inline-block' }} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 style={{ fontSize: '2vw', letterSpacing: '4px', color: '#fff', textTransform: 'uppercase', marginBottom: '4rem' }}>
            Change Begins Within Us
          </h2>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="#problem" className="btn-magnetic" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              Watch Teaser
            </a>
            <a href="#music" className="btn-magnetic hover-fire-text">
              Enter The Movement
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ delay: 2, duration: 1 }}
         style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
      >
         <span style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll to Explore</span>
         <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--accent-fire), transparent)' }}
         />
      </motion.div>
    </div>
  );
};

export default Home;
