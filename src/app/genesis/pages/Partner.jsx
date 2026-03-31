import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Film, Award } from 'lucide-react';

const Partner = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      
      
      <div style={{ padding: '0 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1400px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}
        >
          <h1 className="text-shiny-silver" style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>Become A Partner</h1>
          <p style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '1px' }}>We invite responsible leaders and organizations to support this movement and create real, measurable impact.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', width: '100%' }}>
          {/* Perks Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}
          >
            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(10,10,15,0.7)', transition: 'transform 0.4s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(15px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
              <Globe size={45} color="var(--accent-blue)" />
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Website Recognition</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Logo placement and link on our official partners page.</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(10,10,15,0.7)', transition: 'transform 0.4s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(15px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
              <Film size={45} color="var(--accent-fire)" />
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Credits in Music Video</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Official credit placement in the cinematic music video release.</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(10,10,15,0.7)', transition: 'transform 0.4s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(15px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
              <Award size={45} color="#d500f9" />
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Public Acknowledgment</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Shoutouts during our college events and campaigns.</p>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="glass-panel"
             style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid rgba(255, 69, 0, 0.4)', background: 'rgba(5, 5, 5, 0.8)', boxShadow: '0 0 60px rgba(255, 69, 0, 0.1)' }}
          >
             <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Initiate Contact</h2>
             
             <input type="text" placeholder="Organization / Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', outline: 'none' }} />
             <input type="email" placeholder="Email Address" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', outline: 'none' }} />
             <textarea placeholder="How would you like to partner with us?" rows="5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', outline: 'none', resize: 'none' }}></textarea>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                <ShieldCheck size={24} color="var(--accent-green)" />
                <span>We ensure 100% transparency. Funds are used responsibly for campaigns.</span>
             </div>

             <button className="btn-magnetic hover-fire-text" style={{ alignSelf: 'flex-start', marginTop: '1.5rem', border: '1px solid var(--accent-fire)', color: '#fff', fontSize: '1.1rem', padding: '1.2rem 3rem' }}>
                Submit Request
             </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
