import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer, useScrollAnimation } from '../hooks/useScrollAnimation';

const footerLinks = {
  Services: ['Web Development', 'Full-Stack Apps', 'UI/UX Design', 'Maintenance', 'Digital Transformation'],
  Company: ['About Us', 'Projects', 'Process', 'Contact', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socials = [
  { icon: Github, href: 'https://github.com/Ngounou-Brice', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/evoltep', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/evoltep', label: 'Twitter' },
];

export default function Footer() {
  const { ref, isInView } = useScrollAnimation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="pt-16 pb-12 grid lg:grid-cols-5 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center shadow-glow">
                <span className="text-white font-display font-bold text-base"><img
                  src="/logo.png"
                  alt="Evoltep Logo"
                  className="w-6 h-6 object-contain"
                /></span>
              </div>
              <span className="font-display font-bold text-xl">
                Evolt<span className="text-brand-blue">ep</span>
              </span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Evolving Technology, Empowering People. We build high-performance digital solutions for businesses across Africa and beyond.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 hover:shadow-glow group"
                >
                  <Icon size={15} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeUp}>
              <h4 className="font-display font-semibold text-sm text-white mb-5 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-gray-400 hover:text-white transition-colors duration-200 group flex items-center gap-1"
                    >
                      {link}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-display font-semibold text-white text-sm">Stay in the loop</p>
            <p className="font-body text-gray-400 text-xs">Tech insights and updates from Evoltep</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
            />
            <button className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-gray-500 text-xs">
            © {year} Evoltep. All rights reserved. Built with ❤️ in Cameroon 🇨🇲
          </p>
          <p className="font-body text-gray-600 text-xs">
            Evolving Technology, Empowering People , let's innovate together! <a href="#contact" className="text-brand-blue hover:underline">Get in touch</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
