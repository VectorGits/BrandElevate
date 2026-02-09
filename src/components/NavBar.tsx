import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-slate-950 dark:text-white">
    <div className="w-8 h-8 rounded-full flex items-center justify-center">
      <img 
          src="./Hubble-logo-sm.png" 
          alt="Miva Hubble Logo" 
          className="w-full h-full object-cover dark:invert"
      />
    </div>
    <span className="hidden md:block">
      <img 
          src="./Hubble-logo-text-sm.png" 
          alt="Miva Hubble Logo" 
          className="h-4 object-contain dark:invert"
      />
    </span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { title: "Home", path: "#" },
    { title: "Features", path: "#features" },
    { title: "About", path: "#about" },
    { title: "Waitlist", path: "#waitlist", isNew: true },
  ];

  const containerVars = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4`}
      >
        <div 
          className={`
            relative w-full max-w-[1240px] rounded-full 
            /* Light: White / Dark: Surface (#1E293B / slate-800) */
            bg-white/80 dark:bg-slate-800/80 backdrop-blur-md 
            /* Border: #334155 / slate-700 */
            border border-slate-200 dark:border-slate-700
            shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]
            px-4 py-3 flex items-center justify-between
            transition-all duration-300
            ${scrolled ? "py-2 shadow-lg" : "py-3"}
          `}
        >

          {/* 1. Left: Logo (Moved here from center) */}
          <div className="flex items-center">
             <Logo />
          </div>

          {/* 2. Center: Desktop Navigation (Moved here, added absolute centering) */}
          <div className="hidden lg:flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {/* Inner Pill - Light: Gray-100 / Dark: Input Fill (#020617 / slate-950) */}
            <ul className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 rounded-full px-2 py-1 border border-transparent dark:border-slate-700">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    className="relative px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-white dark:hover:bg-slate-800 block"
                  >
                    {link.title}
                    {link.isNew && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          {/* Accent Teal #06B6D4 / cyan-500 */}
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Right: Actions (Unchanged) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 rounded-full border border-transparent dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* CTA: Primary Blue #3B82F6 -> Hover Blue #2563EB */}
            <a
              href="#waitlist"
              className="hidden lg:flex items-center gap-2 bg-primary-blue hover:bg-hover-blue text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Join Waitlist
              <ArrowRight size={16} />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 rounded-full border border-transparent dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVars}
              // Dark BG: Surface (#1E293B / slate-800)
              className="fixed top-24 left-4 right-4 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <motion.li key={i} variants={itemVars}>
                    <a
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-lg font-medium text-slate-700 dark:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      {link.title}
                      {link.isNew && (
                        // Accent Teal text + subtle bg
                        <span className="text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded-full border border-cyan-500/20">
                          New
                        </span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* <motion.div variants={itemVars} className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                 <a 
                   href="#signin"
                   className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                 >
                   Sign In
                 </a>
                 <a 
                   href="#waitlist"
                   className="w-full py-3 rounded-xl bg-primary-blue text-center text-white font-semibold hover:bg-hover-blue transition-colors shadow-lg shadow-blue-500/20"
                 >
                   Get Started
                 </a>
              </motion.div> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;