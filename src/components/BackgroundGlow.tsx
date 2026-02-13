import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BackgroundGlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Random movement for each blob
      blobRefs.current.forEach((blob, i) => {
        if (!blob) return;

        // Initial random position
        gsap.set(blob, {
          x: gsap.utils.random(0, window.innerWidth),
          y: gsap.utils.random(0, window.innerHeight),
          scale: gsap.utils.random(0.8, 1.2),
          opacity: gsap.utils.random(0.3, 0.6), // Subtle opacity
        });

        // Infinite wandering animation
        gsap.to(blob, {
          x: `random(0, ${window.innerWidth})`,
          y: `random(0, ${window.innerHeight})`,
          scale: `random(0.8, 1.5)`,
          opacity: `random(0.3, 0.6)`,
          duration: gsap.utils.random(20, 40), // Slow movement
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 2, // Stagger start
        });
      });
    },
    { scope: containerRef }
  );

  // Define blobs with different colors/sizes for a rich effect
  // Using shades of blue, purple, and neutral grey for that "Swiss" feel but with a "glow"
  const blobs = [
    "bg-blue-500/20",
    "bg-purple-500/15",
    "bg-neutral-500/10",
    "bg-indigo-500/15",
    "bg-slate-600/10",
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-50 bg-[#0A0A0A] overflow-hidden pointer-events-none"
    >
      {/* Base gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] z-10" />

      {blobs.map((colorClass, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          className={`absolute rounded-full blur-[80px] sm:blur-[120px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] ${colorClass}`}
        />
      ))}
    </div>
  );
};

export default BackgroundGlow;
