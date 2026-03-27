import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation, staggerContainer, fadeUp, slideLeft, slideRight } from '../hooks/useScrollAnimation';

const highlights = [
  'Founded in Cameroon, building for the world',
  'Obsessed with performance and clean code',
  'Client-focused: your goals are our goals',
  'Transparent communication throughout',
  'Post-launch support included in every project',
];

export default function About() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-blue/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Visual */}
          <motion.div variants={slideLeft} className="relative">
            <div className="relative bg-brand-dark rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />

              <div className="relative z-10 space-y-4">
                {/* Metrics */}
                {[
                  { label: 'Years of Experience', value: '5+', color: 'text-brand-blue' },
                  { label: 'Projects Delivered', value: '50+', color: 'text-green-400' },
                  { label: 'Client Satisfaction', value: '98%', color: 'text-yellow-400' },
                  { label: 'Countries Served', value: '10+', color: 'text-cyan-400' },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                    <span className="font-body text-white/70 text-sm">{m.label}</span>
                    <span className={`font-display font-bold text-2xl ${m.color}`}>{m.value}</span>
                  </div>
                ))}

                {/* Mission statement */}
                <div className="bg-brand-blue/20 border border-brand-blue/30 rounded-xl p-5 mt-2">
                  <p className="font-body text-white/90 text-sm leading-relaxed italic">
                    "Our mission is to democratize access to world-class software engineering across Africa and beyond."
                  </p>
                  <p className="font-display font-semibold text-brand-blue text-xs mt-2">— Evoltep Team</p>
                </div>
              </div>
            </div>

            {/* Floating detail */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card border border-gray-100 p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🌍</div>
              <div>
                <p className="font-display font-bold text-sm text-brand-dark">African-rooted</p>
                <p className="font-body text-xs text-gray-400">Globally competitive</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div variants={slideRight}>
            <span className="section-label">About Us</span>
            <h2 className="section-title mb-6">
              We're Engineers Who{' '}
              <span className="text-gradient">Care</span>
            </h2>
            <div className="space-y-4 font-body text-gray-500 text-base leading-relaxed mb-8">
              <p>
                Evoltep was born from a simple belief: <strong className="text-brand-dark">businesses in Africa deserve world-class software</strong> — built by people who understand the local context and global standards.
              </p>
              <p>
                We're a passionate team of engineers, designers, and strategists who care deeply about the products we build. We don't cut corners, we don't use bloated templates, and we don't disappear after launch.
              </p>
              <p>
                From Cameroon to the world — we help startups, SMEs, and enterprises turn their digital ambitions into high-performing reality.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-gray-600">{h}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Work With Us
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
