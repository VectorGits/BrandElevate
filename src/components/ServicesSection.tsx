import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "Brand Strategy",
    description: "We dive deep into your business DNA to define a positioning that cuts through the noise. From market research to voice development, we build the strategic foundation that makes your brand impossible to ignore. We don't just create brands; we create legacies that stand the test of time.",
  },
  {
    id: "02",
    title: "Content Creation",
    description: "More than just a logo. We craft comprehensive design systems including typography, color palettes, and visual assets that create a cohesive and memorable brand experience across every touchpoint. Every pixel is purposeful, every color is calculated.",
  },
  {
    id: "03",
    title: "Social Media Mgmt",
    description: "Performance-driven digital experiences. We build lightning-fast, scalable websites using modern technologies like React and Tailwind, ensuring your digital presence is as powerful as your brand. Clean code, seamless animations, and intuitive user interfaces.",
  },
  {
    id: "04",
    title: "Digital Marketing",
    description: "Growth-focused campaigns that convert. From SEO to social media strategy, we amplify your message and connect you with your ideal audience using data-backed methodologies. We turn passive visitors into loyal advocates.",
  },
  {
    id: "05",
    title: "Graphics & Creative Design",
    description: "Growth-focused campaigns that convert. From SEO to social media strategy, we amplify your message and connect you with your ideal audience using data-backed methodologies. We turn passive visitors into loyal advocates.",
  },
  {
    id: "06",
    title: "Business & Brand Consulting",
    description: "Growth-focused campaigns that convert. From SEO to social media strategy, we amplify your message and connect you with your ideal audience using data-backed methodologies. We turn passive visitors into loyal advocates.",
  },
];

const ServicesSection = () => {
  return (
    <section id="expertise" className="bg-black text-white relative scroll-mt-24 md:scroll-mt-32">
      {/* Mobile Layout: Sticky Stack */}
      <div className="md:hidden">
        <div className="sticky top-20 bg-black z-20 py-12 px-6 border-b border-white/20">
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Our Expertise</h2>
          <p className="text-3xl font-bold max-w-xl leading-tight">
            Comprehensive solutions for ambitious brands.
          </p>
        </div>
        <div className="flex flex-col pb-24">
          {SERVICES.map((service, index) => (
            <MobileServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Desktop Layout: Sticky Sidebar */}
      <div className="hidden md:block">
         <DesktopLayout />
      </div>
    </section>
  );
};

// --- Mobile Component ---
const MobileServiceCard = ({ 
  service, 
  index 
}: { 
  service: typeof SERVICES[0]; 
  index: number 
}) => {
  return (
    <div 
      id={`expertise-${service.id}`}
      className="sticky border-t border-white/20 overflow-hidden bg-black flex flex-col z-10"
      style={{ 
        top: `${280 + index * 60}px`, 
        minHeight: "80vh",
      }}
    >
      <div className="px-4 py-4 h-15 flex items-center justify-between bg-neutral-900 z-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-neutral-500">{service.id}</span>
          <h3 className="text-xl font-bold font-['Syne'] uppercase tracking-wide">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="p-6 pt-12">
        <p className="text-lg text-neutral-300 leading-relaxed font-light">
          {service.description}
        </p>
      </div>
    </div>
  );
};

// --- Desktop Component ---
const DesktopLayout = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  return (
    <div className="flex items-start">
      {/* Left Sidebar (Sticky) */}
      <div className="w-1/2 sticky top-0 self-start h-screen flex flex-col justify-center px-16 border-r border-white/10 z-10">
        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-12 absolute top-24">
          Our Expertise
        </h2>
        
        <div className="flex flex-col gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className={`transition-all duration-500 cursor-pointer group ${
                activeId === service.id ? "opacity-100 translate-x-4" : "opacity-30 hover:opacity-60"
              }`}
              onClick={() => {
                const element = document.getElementById(`expertise-${service.id}`);
                if (element) {
                  const offset = element.offsetTop;
                  window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                  });
                }
              }}
            >
              <div className="flex items-baseline gap-4">
                <span className={`font-mono text-sm transition-colors duration-500 ${
                  activeId === service.id ? "text-white" : "text-neutral-500"
                }`}>
                  {service.id}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold font-['Syne'] uppercase tracking-tight">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content (Scrollable) */}
      <div className="w-1/2 flex flex-col">
        {SERVICES.map((service) => (
          <DesktopServiceContent 
            key={service.id} 
            service={service} 
            setActiveId={setActiveId} 
          />
        ))}
        {/* Extra space at bottom to allow last item to scroll nicely */}
        <div className="h-[50vh]" />
      </div>
    </div>
  );
};

const DesktopServiceContent = ({ 
  service, 
  setActiveId 
}: { 
  service: typeof SERVICES[0]; 
  setActiveId: (id: string) => void; 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveId(service.id);
    }
  }, [isInView, service.id, setActiveId]);

  return (
    <div 
      id={`expertise-${service.id}`}
      ref={ref}
      className="min-h-screen flex items-center px-16 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-2xl lg:text-3xl text-neutral-300 leading-relaxed font-light">
          {service.description}
        </p>
        <div className="mt-12">
            <button className="px-8 py-4 border border-white/20 rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
                Learn More
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesSection;
