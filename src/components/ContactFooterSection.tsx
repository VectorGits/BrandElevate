import { motion } from "framer-motion";

const ContactFooterSection = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-32 pb-12 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Contact Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight mb-12">
                Let's build <br />
                <span className="italic">your legacy.</span>
              </h2>
              <a 
                href="mailto:hello@brandelevate.com" 
                className="text-2xl md:text-3xl font-light text-white/90 hover:text-white transition-all duration-300 relative group"
              >
                hello@brandelevate.com
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            </div>
          </div>

          {/* Right Column - Brutalist Form */}
          <div className="flex flex-col">
            <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2 group">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors duration-500 text-lg placeholder:text-neutral-700"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors duration-500 text-lg placeholder:text-neutral-700"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Project Details</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors duration-500 text-lg placeholder:text-neutral-700 resize-none"
                />
              </div>

              <div className="mt-8">
                <button className="px-12 py-5 border border-white/20 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 font-medium">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Edge */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Copyright */}
          <div className="order-3 md:order-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              © 2026 Brandelevate. All rights reserved.
            </span>
          </div>

          {/* Center: Location & Availability */}
          <div className="order-1 md:order-2 flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Based in Lekki, Lagos
            </span>
          </div>

          {/* Right: Social Links */}
          <div className="order-2 md:order-3 flex gap-8">
            {['Instagram', 'X (Twitter)', 'LinkedIn'].map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-[10px] font-mono text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooterSection;
