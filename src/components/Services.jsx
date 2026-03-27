import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../data';
import { useScrollAnimation, staggerContainer, fadeUp, slideLeft, slideRight } from '../hooks/useScrollAnimation';

export default function Services() {
  const { ref, isInView } = useScrollAnimation(0.05);

  return (
    <section id="services" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="section-label">What We Do</motion.span>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Services Built for{' '}
            <span className="text-gradient">Growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-gray-500 text-lg max-w-xl mx-auto">
            From concept to deployment we cover every layer of your digital product.
          </motion.p>
        </motion.div>

        {/* Services list alternating layout */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.id}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual side */}
                <motion.div
                  variants={isEven ? slideLeft : slideRight}
                  className="flex-1 relative"
                >
                  <div className="relative bg-white rounded-3xl p-8 shadow-card border border-gray-100 overflow-hidden group hover:shadow-card-hover transition-all duration-500">
                    {/* Glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      {/* Emoji icon */}
                      <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>

                      {/* Feature chips */}
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 bg-brand-light rounded-xl p-3 border border-gray-100"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                            <span className="font-body text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step number decoration */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-brand-blue text-white font-display font-bold flex items-center justify-center text-sm shadow-glow">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>

                {/* Text side */}
                <motion.div
                  variants={isEven ? slideRight : slideLeft}
                  className="flex-1"
                >
                  <span className="section-label">{`Service 0${index + 1}`}</span>
                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-body text-gray-500 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <button className="group flex items-center gap-2 font-display font-semibold text-brand-blue hover:gap-4 transition-all duration-300">
                    Learn More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
