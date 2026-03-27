import { motion } from 'framer-motion';
import { useScrollAnimation, staggerContainer, fadeUp } from '../hooks/useScrollAnimation';

const techStack = [
  { name: 'React', emoji: '⚛️' },
  { name: 'Python', emoji: '🐍' },
  { name: 'Flask', emoji: '🔥' },
  { name: 'Next.js', emoji: '▲' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'PostgreSQL', emoji: '🐘' },
  { name: 'AWS', emoji: '☁️' },
  { name: 'Figma', emoji: '🎨' },
  { name: 'Node.js', emoji: '💚' },
  { name: 'TypeScript', emoji: '🔷' },
];

export default function TechBanner() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center font-body text-sm text-gray-400 mb-8 tracking-widest uppercase"
        >
          Technologies We Master
        </motion.p>

        {/* Marquee-style scroll */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2 bg-brand-light border border-gray-200 rounded-xl px-5 py-3 flex-shrink-0 hover:border-brand-blue/30 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-lg">{tech.emoji}</span>
                <span className="font-display font-semibold text-sm text-brand-dark whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
