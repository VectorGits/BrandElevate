import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  {
    id: "01",
    title: "Nexus Digital",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
  },
  {
    id: "02",
    title: "Mono Branding",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1964",
  },
  {
    id: "03",
    title: "Ethereal UI",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1974",
  },
  {
    id: "04",
    title: "Apex Agency",
    category: "Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
  },
];

const SelectedWork = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    <section className="bg-black text-white py-24 md:py-0">
      <div className="px-6 mb-12 md:hidden">
        <h2 className="text-sm md:text-base font-mono text-neutral-500 uppercase tracking-widest mb-4">
          Selected Work
        </h2>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-12 px-6">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group flex flex-col gap-4">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/10 rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-neutral-500">{project.id}</span>
              <h3 className="text-2xl font-bold font-['Syne'] uppercase">{project.title}</h3>
              <p className="text-sm text-neutral-400">{project.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - Pinned Horizontal Scroll */}
      <div ref={targetRef} className="hidden md:block relative h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-16 mb-8 absolute top-24 md:top-32">
            <h2 className="text-sm md:text-base font-mono text-neutral-500 uppercase tracking-widest">
              Selected Work
            </h2>
          </div>
          
          <motion.div style={{ x }} className="flex gap-12 px-16 w-fit">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative shrink-0 w-[40vw] h-[60vh] flex flex-col gap-6"
              >
                <div className="relative w-full h-full overflow-hidden bg-neutral-900 border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm text-neutral-500">{project.id}</span>
                    <h3 className="text-4xl font-bold font-['Syne'] uppercase tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider border border-white/10 px-4 py-2 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
