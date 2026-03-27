import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data';
import { useScrollAnimation, staggerContainer, fadeUp } from '../hooks/useScrollAnimation';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Client Voices</motion.span>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            What Our Clients Say
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-10 md:p-14 shadow-card border border-gray-100 relative overflow-hidden"
              >
                {/* Quote decoration */}
                <div className="absolute top-6 left-8 text-8xl text-brand-blue/10 font-display font-bold leading-none select-none">
                  "
                </div>

                <div className="relative z-10">
                  <StarRating rating={testimonials[current].rating} />
                  
                  <blockquote className="font-body text-xl md:text-2xl text-brand-dark leading-relaxed mt-6 mb-8 font-light">
                    "{testimonials[current].quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-white font-display font-bold text-sm shadow-glow">
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-dark">{testimonials[current].name}</p>
                      <p className="font-body text-sm text-gray-400">
                        {testimonials[current].role} · {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-brand-blue' : 'w-3 bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center hover:shadow-glow transition-shadow"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
