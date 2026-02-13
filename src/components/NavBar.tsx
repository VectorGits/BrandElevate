import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white select-none">
    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
      <img 
          src="./Hubble-logo-sm.png" 
          alt="Miva Hubble Logo" 
          className="w-full h-full object-cover invert opacity-90"
      />
    </div>
    <span className="hidden md:block">
      <img 
          src="./Hubble-logo-text-sm.png" 
          alt="Miva Hubble Logo" 
          className="h-4 object-contain invert opacity-90"
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
    { title: "Contact", path: "#Contact", isNew: true },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/5 backdrop-blur-xl border-b border-white/5 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center z-50">
             <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-10">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    className="relative text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide"
                  >
                    {link.title}
                    {link.isNew && (
                      <span className="absolute -top-1.5 -right-2 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle - Monochrome */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            
            {/* CTA Button */}
            <motion.a
              href="#Contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
            >
              Contact
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVars}
              className="fixed top-24 left-4 right-4 z-50 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <motion.li key={i} variants={itemVars}>
                    <a
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-lg font-medium text-white/80 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
                    >
                      {link.title}
                      {link.isNew && (
                        <span className="text-[10px] font-bold uppercase bg-white/10 text-white/80 px-2 py-1 rounded-full border border-white/20">
                          New
                        </span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
               <motion.div variants={itemVars} className="mt-8 pt-6 border-t border-white/10">
                 <a 
                   href="#waitlist"
                   onClick={() => setIsOpen(false)}
                   className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] transition-transform"
                 >
                   Join Waitlist
                 </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
