import { motion } from 'framer-motion';
import { Play, Volume2, SkipBack, SkipForward } from 'lucide-react';

const Music = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      
      
      <div style={{ padding: '0 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 className="text-shiny-silver" style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>The Voice of Change</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel"
          style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(2, 2, 2, 0.7)' }}
        >
          <div style={{ 
            height: '40vh', 
            backgroundImage: "url('/assets/song_thumbnail_image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255, 69, 0, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 50px rgba(255, 69, 0, 0.5)' }}
                >
                  <Play size={50} color="#fff" fill="#fff" style={{ marginLeft: '8px' }} />
                </motion.div>
             </div>
          </div>

          <div style={{ padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,5,5,0.9)' }}>
             <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flex: 1 }}>
               <div>
                 <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Badalagu Manave</h2>
                 <p style={{ color: 'var(--text-muted)'}}>Aatman Yodha</p>
               </div>
               
               <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative', cursor: 'pointer' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                    style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-fire))', borderRadius: '4px', boxShadow: '0 0 15px var(--accent-fire-glow)' }}
                  />
               </div>
             </div>

             <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginLeft: '4rem', color: '#fff' }}>
                <SkipBack size={30} style={{ cursor: 'pointer', opacity: 0.7 }} className="hover-fire-text" />
                <Play size={36} style={{ cursor: 'pointer' }} className="hover-fire-text" />
                <SkipForward size={30} style={{ cursor: 'pointer', opacity: 0.7 }} className="hover-fire-text" />
                <Volume2 size={30} style={{ cursor: 'pointer', marginLeft: '1.5rem', opacity: 0.7 }} />
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Music;
