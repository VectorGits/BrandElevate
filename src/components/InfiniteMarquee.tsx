import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MarqueeItem = ({ text }: { text: string }) => (
  <span className="mx-4 text-base font-mono tracking-[0.2em] uppercase italic text-neutral-500/80">
    {text}
  </span>
);

const InfiniteMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const ITEMS = ["STRATEGY", "•", "DESIGN", "•", "DEVELOPMENT", "•", "BRANDING", "•"];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Get width of one full set of items
      const firstSet = track.firstElementChild as HTMLElement;
      if (!firstSet) return;
      
      // Calculate total width to move
      const moveDistance = firstSet.offsetWidth;

      // Reset position
      gsap.set(track, { x: -moveDistance });

      // Create seamless infinite scroll (left to right)
      gsap.to(track, {
        x: 0,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const num = parseFloat(x);
            return num >= 0 ? "-50%" : x; // Wrap logic might need adjustment based on direction
          }),
        },
      });
      
      // Simpler approach for infinite scroll without complex modifiers
      // Since we want Left -> Right, we start at -width and move to 0
      gsap.fromTo(track, 
        { x: -moveDistance },
        { 
          x: 0, 
          duration: 25, 
          ease: "none", 
          repeat: -1 
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      id="about" 
      ref={containerRef}
      className="w-full py-6 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden z-20 relative"
    >
      <div 
        ref={trackRef} 
        className="flex whitespace-nowrap will-change-transform"
      >
        {/* Render multiple copies to ensure seamless scrolling on large screens */}
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {ITEMS.map((item, i) => (
              <MarqueeItem key={i} text={item} />
            ))}
          </div>
        ))}
      </div>
      
      {/* Side fades for smoothness */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default InfiniteMarquee;
