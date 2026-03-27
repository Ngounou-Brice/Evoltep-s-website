import { motion } from 'framer-motion';
import { values } from '../data';
import { useScrollAnimation, staggerContainer, fadeUp, scaleIn } from '../hooks/useScrollAnimation';

export default function WhyUs() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block font-body text-brand-blue font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Our Advantage
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4"
          >
            Why Choose{' '}
            <span className="text-gradient">Evoltep?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-gray-400 text-lg max-w-xl mx-auto">
            We're not just developers — we're strategic partners invested in your success.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              variants={scaleIn}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-brand-blue/30 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-2xl mb-5 group-hover:shadow-glow transition-shadow duration-300">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="font-body text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary py-4 px-10 text-base"
          >
            Let's Build Together
          </button>
        </motion.div>
      </div>
    </section>
  );
}
