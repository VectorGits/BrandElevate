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
    color: "blue",
    title: "Campus Buzz in Your Pocket 📊✨",
    
  },
  {
    icon: Zap,
    color: "purple",
    title: "Speedy School Event Scoop",
    
  },
  {
    icon: BarChart3,
    color: "pink",
    title: "Resources Hub Magic",
   
  },
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const featureLeftRef = useRef<HTMLDivElement>(null);
  const featureMidRef = useRef<HTMLDivElement>(null);
  const featureRightRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);

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
        if (
          !leftDoorRef.current ||
          !rightDoorRef.current ||
          !buttonRef.current
        ) {
          requestAnimationFrame(initAnimation);
          return;
        }

        // Set initial states with GPU-accelerated transforms
        gsap.set(".word-anim, .subtext-anim", {
          opacity: 0,
          force3D: true,
        });

        gsap.set(leftDoorRef.current, {
          scaleX: 1,
          transformOrigin: "left center",
          force3D: true,
        });

        gsap.set(rightDoorRef.current, {
          scaleX: 1,
          transformOrigin: "right center",
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
          { opacity: 1, y: 0, duration: 0.5 }
        );

        // Word animation with GPU acceleration
        tl.to(
          ".word-anim",
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
            force3D: true,
          },
          "-=0.2"
        );

        // Door animation
        tl.to(
          [leftDoorRef.current, rightDoorRef.current],
          {
            scaleX: 0,
            duration: 1.4,
            ease: "power4.inOut",
            stagger: 0,
            force3D: true,
          },
          "-=0.2"
        );

        // Subtext animation
        tl.fromTo(
          ".subtext-anim",
          { x: 20, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.01, force3D: true },
          "-=0.4"
        );

        // Button animation
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            duration: 0.5,
            force3D: true,
          },
          "-=0.2"
        );

        // Feature animations based on screen size
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktop) {
          // Desktop: Animate features from sides
          if (featureLeftRef.current) {
            tl.fromTo(
              featureLeftRef.current,
              { x: -50, opacity: 0, force3D: true },
              { x: 0, opacity: 1, duration: 0.8, force3D: true },
              "-=0.2"
            );
          }

          if (featureMidRef.current) {
            tl.fromTo(
              featureMidRef.current,
              { y: 50, opacity: 0, force3D: true },
              { y: 0, opacity: 1, duration: 0.8, force3D: true },
              "-=0.6"
            );
          }

          if (featureRightRef.current) {
            tl.fromTo(
              featureRightRef.current,
              { x: 50, opacity: 0, force3D: true },
              { x: 0, opacity: 1, duration: 0.8, force3D: true },
              "-=0.6"
            );
          }
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
      className="relative w-full min-h-screen pt-24 sm:pt-24 sm:pb-12 flex flex-col items-center bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      <div className="badge-anim opacity-0 mb-4 sm:mb-8 inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 dark:border-blue-500/40 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-mono uppercase tracking-wide">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500"></span>
        </span>
        <span className="whitespace-nowrap">Miva Hubble Beta v1.0</span>
      </div>

      <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold text-center tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto z-10 leading-[1.1] px-3 sm:px-4">
        <SplitWords className="block mb-1 sm:mb-2">
          Elevating Your
        </SplitWords>
        <div className="relative block pb-1 sm:pb-2 px-2 sm:px-4 overflow-hidden align-bottom">
          <span
            className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #3b82f6 0%, #a21caf 50%, #2563eb 100%)",
            }}
          >
            Business.
          </span>
          <div
            ref={leftDoorRef}
            className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md border-r border-gray-300/30 dark:border-slate-700/30 will-change-transform"
          />
          <div
            ref={rightDoorRef}
            className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md border-l border-gray-300/30 dark:border-slate-700/30 will-change-transform"
          />
        </div>
      </h1>

      <div className="text-gray-600 dark:text-slate-400 text-lg md:text-xl text-center max-w-2xl mb-12 z-10 px-4 leading-relaxed">
        <span className="inline-block">
          {"".split("").map((c, i) => (
            <span key={i} className="subtext-anim inline-block opacity-0">
              {c}
            </span>
          ))}
        </span>
        <span className="subtext-anim opacity-0 mb-2 px-3 py-1 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 border-2 border-dashed border-purple-500/50 dark:border-purple-500 text-lg sm:text-base align-middle">
          Anonymity on your terms
        </span>
        <span className="subtext-anim inline-block mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed sm:leading-normal px-1 sm:px-2">
          past questions, slides, notes, handouts… all organized by level,
          department, course code. No more digging through old messages for that
          one file! Just search and grab what you need
        </span>
      </div>

      <div className="hidden md:grid grid-cols-3 gap-8 w-full max-w-6xl px-6 mb-16 relative z-10">
        <div
          ref={featureLeftRef}
          className="flex flex-col items-center text-center opacity-0 will-change-transform"
        >
          <div className="mb-4 p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/40">
            <Layout size={24} />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2">
            Campus Buzz in Your Pocket 📊✨
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Peek at top downloads, hot courses, trending resources, and speedy
            answers. Instant posts on orientations, workshops, clubs.
          </p>
        </div>

        <div
          ref={featureMidRef}
          className="flex flex-col items-center text-center opacity-0 will-change-transform"
        >
          <div className="mb-4 p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 border border-purple-500/30 dark:border-purple-500/40">
            <Zap size={24} />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2">
            Resources Hub Magic:
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Your one-stop academic treasure, Organized by level, dept, and
            course-mates, snag past questions, upload PDFs/Docs.
          </p>
        </div>

        <div
          ref={featureRightRef}
          className="flex flex-col items-center text-center opacity-0 will-change-transform"
        >
          <div className="mb-4 p-3 bg-pink-500/10 dark:bg-pink-500/20 rounded-xl text-pink-600 dark:text-pink-400 border border-pink-500/30 dark:border-pink-500/40">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2">
            Speedy School Event Scoop
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Stay in the loop with Campus Feed's School Updates & Events
            categories.
          </p>
        </div>
      </div>

      <div className="md:hidden w-full max-w-xs mx-auto mb-16 overflow-hidden relative z-10">
        <div
          ref={mobileTrackRef}
          className="flex w-full will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {[...FEATURES_DATA, ...FEATURES_DATA].map((feature, i) => {
            const colorClasses = {
              blue: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 dark:border-blue-500/40",
              purple:
                "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30 dark:border-purple-500/40",
              pink: "bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30 dark:border-pink-500/40",
            };

            return (
              <div
                key={i}
                className="min-w-full flex flex-col items-center text-center px-4 shrink-0"
              >
                <div
                  className={`mb-4 p-3 rounded-xl border ${
                    colorClasses[feature.color as keyof typeof colorClasses]
                  }`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">
                  {feature.title}
                </h3>
               
              </div>
            );
          })}
        </div>

        <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-white dark:from-slate-900 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white dark:from-slate-900 to-transparent z-20 pointer-events-none" />
      </div>

      <div ref={buttonRef} className="opacity-0 px-3 sm:px-0">
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
          className="group relative px-5 sm:px-8 py-2.5 sm:py-4 bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 text-white rounded-full font-bold text-sm sm:text-lg transition-all flex items-center gap-1.5 sm:gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)] sm:shadow-[0_0_40px_rgba(59,130,246,0.3)] w-full sm:w-auto"
        >
          <span className="whitespace-nowrap">Join the Waitlist</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform " />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-32  from-white dark:from-slate-900 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;
