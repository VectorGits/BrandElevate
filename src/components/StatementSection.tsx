import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const TEXT = "In a world crowded with noise, true clarity is a luxury. We strip away the non-essential to reveal the profound, crafting digital experiences that resonate with purpose, precision, and absolute anonymity.";

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const color = useTransform(progress, range, ["#333333", "#ffffff"]);
  
  return (
    <motion.span
      style={{ color }}
      className="inline-block mr-[0.25em] transition-colors"
    >
      {children}
    </motion.span>
  );
};

const StatementSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"], // Animation starts when top enters 80% viewport, ends when bottom is at 50%
  });

  const words = TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative z-10"
    >
      <p className="flex flex-wrap justify-center text-4xl md:text-7xl font-bold max-w-5xl leading-[1.1] tracking-tight font-sans">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
};

export default StatementSection;
