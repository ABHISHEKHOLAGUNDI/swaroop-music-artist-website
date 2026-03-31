import { motion } from 'framer-motion';
import { Target, Users, Plane as Plant } from 'lucide-react';

const Impact = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      
      
      <div style={{ padding: '0 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1400px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h3 style={{ color: 'var(--accent-fire)', fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>The Movement</h3>
          <h1 className="text-shiny-silver" style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', lineHeight: 1 }}>Together We Are<br/>The Change</h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '5rem', alignItems: 'center', width: '100%' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '4rem', position: 'relative', overflow: 'hidden', background: 'rgba(5, 5, 8, 0.7)' }}
          >
             <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--accent-blue-glow)', filter: 'blur(70px)', zIndex: 0 }} />
             
             <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', zIndex: 1, position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>By The Numbers</h2>
             
             <div style={{ display: 'grid', gap: '3rem', position: 'relative', zIndex: 1 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 230, 118, 0.3)' }}>
                     <Plant size={40} color="var(--accent-green)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>1,250<span style={{color: 'var(--accent-fire)'}}>+</span></h3>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', marginTop: '0.2rem' }}>Trees Planted</p>
                  </div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 229, 255, 0.3)' }}>
                     <Users size={40} color="var(--accent-blue)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>5,000<span style={{color: 'var(--accent-fire)'}}>+</span></h3>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', marginTop: '0.2rem' }}>Students Joined</p>
                  </div>
               </div>
               
               <div style={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 69, 0, 0.3)' }}>
                     <Target size={40} color="var(--accent-fire)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>12</h3>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', marginTop: '0.2rem' }}>Campaigns Initiated</p>
                  </div>
               </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ width: '100%', height: '100%' }}
          >
            <img src="/assets/community_grid_image.png" style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.05)' }} alt="Community" />
          </motion.div>
        
        </div>
      </div>
    </div>
  );
};

export default Impact;
