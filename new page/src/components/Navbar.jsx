import { motion } from 'framer-motion';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'The Crisis', id: 'problem' },
    { name: 'The Music', id: 'music' },
    { name: 'Impact', id: 'impact' },
    { name: 'Partner', id: 'partner' },
    { name: 'About', id: 'about' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'transparent',
        borderBottom: '1px solid rgba(255, 255, 255, 0.02)'
      }}
    >
      <div style={{ fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
        <a href="#home" className="text-shiny-silver" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>Aatman Yodha</a>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <a 
            key={link.id} 
            href={`#${link.id}`}
            className="hover-fire-text"
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-main)',
              transition: 'var(--transition-smooth)',
              textDecoration: 'none'
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
