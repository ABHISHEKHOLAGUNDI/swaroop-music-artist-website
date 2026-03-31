import { motion } from 'framer-motion';

const About = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      
      
      <div style={{ padding: '0 5%', maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
           <motion.h1 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             style={{ 
               fontSize: '5rem', 
               fontWeight: 900, 
               textTransform: 'uppercase', 
               letterSpacing: '8px',
               textAlign: 'center',
               color: '#fff',
               marginBottom: '4rem',
               textShadow: '0 15px 40px rgba(0,0,0,0.9)'
             }}
           >
             The Visionaries
           </motion.h1>

           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.3 }}
             className="glass-panel" 
             style={{ padding: '5rem', textAlign: 'center', background: 'rgba(2, 2, 2, 0.8)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 0 50px rgba(0,0,0,0.8)' }}
           >
              <h2 className="text-shiny-silver" style={{ fontSize: '3rem', marginBottom: '3rem', fontWeight: 800, letterSpacing: '4px' }}>Aatman Yodha</h2>
              <p style={{ fontSize: '1.4rem', color: '#ccc', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '900px', margin: '0 auto 3rem' }}>
                Aatman Yodha is not merely an artist; they are a voice for the voiceless and a catalyst for change. The project "Badalagu Manave" was born out of a desperate need to address the rampant pollution and degrading lifestyle choices facing modern society.
              </p>
              <p style={{ fontSize: '1.6rem', color: '#fff', lineHeight: 1.8, fontWeight: 600, maxWidth: '900px', margin: '0 auto', borderLeft: '4px solid var(--accent-fire)', paddingLeft: '2rem', textAlign: 'left' }}>
                "We use the universal language of music to penetrate the soul, and use community action to heal the world. Our ethos is built on transparency, impact, and an unyielding fire for a better tomorrow."
              </p>
              
              <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
                <a href="mailto:contact@aatmanyodha.com" className="hover-fire-text" style={{ fontSize: '1.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>[ Email Us ]</a>
              </div>
           </motion.div>
      </div>
    </div>
  );
};

export default About;
