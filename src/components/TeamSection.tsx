import { motion, type Variants } from "framer-motion";

const TEAM = [
  {
    id: 1,
    name: "John Evaristus",
    role: "Punani Searcher",
    image: "/John-headshot.webp",
  },
  {
    id: 2,
    name: "Joju Evaristus",
    role: "Punani",
    image: "/Joju-headshot.webp",
  },
  // {
  //   id: 3,
  //   name: "Julian Thorne",
  //   role: "Lead Developer",
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  // },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const TeamSection = () => {
  return (
    <section id="team" className="bg-brand-black py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex justify-center mb-24">
          <span className="text-sm md:text-base font-mono text-neutral-500 uppercase tracking-[0.3em]">
            THE TEAM
          </span>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {TEAM.map((member) => (
            <motion.div key={member.id} variants={itemVariants} className="group">
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-900 mb-8 rounded-sm">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-[1.2] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-[0.4] group-hover:brightness-110"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                  {member.name}
                </h3>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  {member.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
