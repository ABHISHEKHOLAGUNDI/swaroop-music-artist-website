import { motion } from 'framer-motion';
import { AirVent, Droplet, Flame } from 'lucide-react';

const Problem = () => {
  const problems = [
    { title: 'Air', desc: 'The air we breathe is slowly becoming poison.', icon: <AirVent size={40} color="#ccc" /> },
    { title: 'Water', desc: 'Water is life... but what are we turning it into?', icon: <Droplet size={40} color="#00e5ff" /> },
    { title: 'Habits', desc: 'Our fragile habits today are shaping a weaker tomorrow.', icon: <Flame size={40} color="#ff4500" /> }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      
      
      <div style={{ padding: '0 5%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}
        >
           <h3 style={{ color: 'var(--accent-fire)', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>The Crisis</h3>
           <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1 }}>The Reality We<br/><span className="hover-fire-text text-shiny-silver" style={{ animationDuration: '6s' }}>Cannot Ignore</span></h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', width: '100%', maxWidth: '1200px' }}>
          {problems.map((prob, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "0px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-panel"
              style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(5, 5, 8, 0.6)' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(0,0,0,0.8)' }}>
                {prob.icon}
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>{prob.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.1rem' }}>{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problem;
