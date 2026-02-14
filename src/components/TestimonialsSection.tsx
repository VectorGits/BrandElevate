import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Their approach to minimalist design isn't just aesthetic; it's a fundamental shift in how we communicate our value to clients.",
    author: "Sarah Jenkins",
    role: "CEO, Nexus Digital",
  },
  {
    id: 2,
    quote: "The technical precision and attention to detail in the final product exceeded every expectation. Truly world-class development.",
    author: "Marcus Thorne",
    role: "CTO, Mono Branding",
  },
  {
    id: 3,
    quote: "They have a rare ability to strip away the noise and find the core essence of a brand. The results speak for themselves.",
    author: "Elena Rossi",
    role: "Creative Director, Ethereal UI",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-black min-h-[80vh] flex flex-col items-center justify-center relative px-6 py-24 overflow-hidden">
      {/* Section Label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <span className="text-sm md:text-base font-mono text-neutral-500 uppercase tracking-[0.3em]">
          WHAT THEY SAY
        </span>
      </div>

      {/* Main Quote Content */}
      <div className="max-w-5xl w-full text-center relative h-100 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-serif italic leading-tight tracking-tight px-4">
              "{TESTIMONIALS[currentIndex].quote}"
            </h2>
            
            <div className="flex flex-col gap-1 mt-4">
              <span className="text-white font-bold text-lg uppercase tracking-wider">
                {TESTIMONIALS[currentIndex].author}
              </span>
              <span className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                {TESTIMONIALS[currentIndex].role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-4 mt-12">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group relative w-12 h-1 px-0 py-4 flex items-center focus:outline-none"
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <div 
              className={`w-full h-0.5 transition-all duration-500 ${
                index === currentIndex ? "bg-white" : "bg-neutral-800 group-hover:bg-neutral-600"
              }`} 
            />
          </button>
        ))}
      </div>

      {/* Background Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white/3 to-transparent" />
      </div>
    </section>
  );
};

export default TestimonialsSection;
