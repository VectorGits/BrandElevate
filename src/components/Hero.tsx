import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Layout, Zap, BarChart3 } from "lucide-react";

const SplitWords = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => {
  return (
    <span className={`inline-block ${className}`}>
      {children.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-anim inline-block mr-[0.25em] will-change-transform"
          style={{ opacity: 0, transform: "translate3d(0, 1rem, 0)" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

const FEATURES_DATA = [
  {
    icon: Layout,
    title: "Campus Buzz in Your Pocket",
    description: "Peek at top downloads, hot courses, trending resources, and speedy answers. Instant posts on orientations, workshops, clubs.",
  },
  {
    icon: Zap,
    title: "Resources Hub Magic",
    description: "Your one-stop academic treasure. Organized by level, dept, and course-mates, snag past questions, upload PDFs/Docs.",
  },
  {
    icon: BarChart3,
    title: "Speedy School Event Scoop",
    description: "Stay in the loop with Campus Feed's School Updates & Events categories.",
  },
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const featureLeftRef = useRef<HTMLDivElement>(null);
  const featureMidRef = useRef<HTMLDivElement>(null);
  const featureRightRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
  
  // Background blob refs removed in favor of global background
  
  // Cleanup scroll animation on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
      }
    };
  }, []);

  useGSAP(
    () => {
      // SSR/Hydration safety - only run on client
      if (typeof window === "undefined") return;

      // Wait for next frame to ensure DOM is fully ready
      const initAnimation = () => {
        // Check all refs are available
        if (!buttonRef.current) {
          requestAnimationFrame(initAnimation);
          return;
        }

        // Set initial states with GPU-accelerated transforms
        gsap.set(".word-anim, .subtext-anim", {
          opacity: 0,
          force3D: true,
        });

        gsap.set(buttonRef.current, {
          opacity: 0,
          force3D: true,
        });

        // Create main timeline
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", force3D: true },
        });

        // Badge animation
        tl.fromTo(
          ".badge-anim",
          { opacity: 0, y: -20, force3D: true },
          { opacity: 1, y: 0, duration: 0.8 }
        );

        // Word animation with GPU acceleration
        tl.to(
          ".word-anim",
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            force3D: true,
          },
          "-=0.4"
        );

        // Subtext animation
        tl.fromTo(
          ".subtext-anim",
          { y: 20, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, force3D: true },
          "-=0.6"
        );

        // Button animation
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            duration: 0.8,
            force3D: true,
          },
          "-=0.4"
        );

        // Feature animations based on screen size
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktop) {
          // Desktop: Animate features from bottom
          const features = [featureLeftRef.current, featureMidRef.current, featureRightRef.current];
          tl.fromTo(
            features,
            { y: 40, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, force3D: true },
            "-=0.4"
          );
        } else {
          // Mobile: Animate track and setup infinite scroll
          if (mobileTrackRef.current) {
            tl.fromTo(
              mobileTrackRef.current,
              { opacity: 0, y: 30, force3D: true },
              { opacity: 1, y: 0, duration: 0.8, force3D: true },
              "-=0.5"
            );

            // Setup smooth infinite scroll after initial animation
            const setupInfiniteScroll = () => {
              const track = mobileTrackRef.current;
              if (!track) return;

              // Get the width of one slide
              const firstSlide = track.firstElementChild as HTMLElement;
              if (!firstSlide) return;

              const slideWidth = firstSlide.offsetWidth;
              const totalSlides = FEATURES_DATA.length;
              const totalWidth = slideWidth * totalSlides;

              // Reset position
              gsap.set(track, {
                x: 0,
                force3D: true,
              });

              // Create seamless infinite scroll
              scrollAnimationRef.current = gsap.to(track, {
                x: -totalWidth,
                duration: 20,
                ease: "none",
                repeat: -1,
                force3D: true,
                modifiers: {
                  x: gsap.utils.unitize((x) => {
                    const num = parseFloat(x);
                    return num <= -totalWidth ? "0px" : x;
                  }),
                },
              });
            };

            // Wait a bit for layout to settle
            setTimeout(setupInfiniteScroll, 100);
          }
        }
      };
    
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(initAnimation);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen pt-24 sm:pt-32 pb-12 flex flex-col items-center justify-center bg-transparent text-white overflow-hidden selection:bg-white/20"
    >
      {/* Animated Background Blobs removed - handled globally */}

      {/* Badge */}
      {/* <div className="badge-anim opacity-0 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] sm:text-xs font-medium uppercase tracking-widest backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/80"></span>
        </span>
        <span className="whitespace-nowrap">Miva Hubble Beta v1.0</span>
      </div> */}

      {/* Main Heading */}
      <h1 className="relative z-10 text-5xl sm:text-6xl md:text-8xl font-bold text-center tracking-[-0.04em] leading-[1.1] mb-8 max-w-5xl px-4">
        <SplitWords className="block text-white mb-2">
          Elevating Your
        </SplitWords>
        <div className="block overflow-hidden pb-4">
          <span className="word-anim inline-block bg-clip-text text-6xl md:text-9xl text-transparent bg-gradient-to-b from-white to-neutral-400">
            Business.
          </span>
        </div>
      </h1>

      {/* Subtext */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mb-20 px-4 space-y-8">
        <div className="subtext-anim opacity-0 inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 text-neutral-400 text-sm font-medium">
          Anonymity on your terms
        </div>
        <p className="subtext-anim opacity-0 text-neutral-400 text-lg leading-relaxed max-w-xl mx-auto">
          We Transform Ideas Into Impactful Brands and Memorable Digital Experiences.
        </p>
      </div>

      {/* Desktop Feature Cards */}
      {/* <div className="hidden md:grid grid-cols-3 gap-12 w-full max-w-6xl px-8 relative z-10 mb-20">
        {FEATURES_DATA.map((feature, index) => {
          const ref = index === 0 ? featureLeftRef : index === 1 ? featureMidRef : featureRightRef;
          return (
            <div
              key={index}
              ref={ref}
              className="flex flex-col items-center text-center opacity-0 group"
            >
              <div className="mb-8 p-0 text-white/80 group-hover:text-white transition-colors duration-300">
                <feature.icon size={32} strokeWidth={1} />
              </div>
              <h3 className="text-white font-medium text-lg mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-[280px]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div> */}

      {/* Mobile Feature Track */}
      {/* <div className="md:hidden w-full max-w-xs mx-auto mb-16 overflow-hidden relative z-10">
        <div
          ref={mobileTrackRef}
          className="flex w-full will-change-transform"
        >
          {[...FEATURES_DATA, ...FEATURES_DATA].map((feature, i) => (
            <div
              key={i}
              className="min-w-full flex flex-col items-center text-center px-6 shrink-0"
            >
              <div className="mb-6 text-white/80">
                <feature.icon size={28} strokeWidth={1} />
              </div>
              <h3 className="text-white font-medium text-lg mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
      </div> */}

      {/* CTA Button */}
      <div ref={buttonRef} className="relative z-10 opacity-0 px-4">
        <button
          onClick={() => {
            const waitlistElement = document.getElementById("waitlist");
            if (waitlistElement) {
              waitlistElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className="group relative px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-medium text-base transition-all flex items-center gap-2"
        >
          <span className="whitespace-nowrap">Start a Project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;
