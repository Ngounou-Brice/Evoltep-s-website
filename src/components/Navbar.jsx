import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // For admin navigation

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  const navigate = useNavigate(); // Hook to navigate to admin page

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (label, href) => {
    setActive(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                <img src="/logo.png" alt="Evoltep Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-display font-bold text-xl text-brand-dark">
                Evolt<span className="text-brand-blue">ep</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.label, link.href)}
                  className={`relative px-4 py-2 font-body text-sm font-medium transition-colors duration-200 rounded-lg group ${
                    active === link.label ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-dark'
                  }`}
                >
                  {link.label}
                  {active === link.label && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-blue rounded-full"
                    />
                  )}
                </button>
              ))}

              {/* Admin Button */}
              <button
                onClick={() => navigate('/admin')}
                // className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Admin
              </button>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => handleNav('Contact', '#contact')} className="btn-primary text-sm">
                Start a Project
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNav(link.label, link.href)}
                  className="text-left py-4 text-2xl font-display font-semibold text-brand-dark border-b border-gray-100 hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Admin Button Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/admin');
                }}
                // className="mt-6 bg-red-600 text-white py-4 rounded text-center text-base hover:bg-red-700 transition"
              >
                Admin
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNav('Contact', '#contact')}
                className="mt-4 btn-primary text-center text-base py-4"
              >
                Start a Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}