import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-water-deep/20 via-neon-cyan/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo/Brand mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-neon-cyan to-water-deep flex items-center justify-center">
              <span className="font-display text-3xl text-background">PL</span>
            </div>
          </motion.div>
          
          <h2 className="font-display text-6xl md:text-8xl mb-6">
<<<<<<< HEAD
            <span className="gradient-text-water">white</span>
            <span className="text-foreground text-glow">up</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground font-body mb-4
           text-primary  tracking-[0.1em] text-base md:text-lg font-semibold mb-4 block bg-black/20 backdrop-blur-sm text-glow">
            Hydration Reimagined
          </p>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12
          text-white  mx-auto mb-12 font-body px-4 py-2 rounded-xl bg-black/20 backdrop-blur-sm">
=======
            <span className="gradient-text-water">PURE</span>
            <span className="text-foreground">LIFE</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-muted-foreground font-body mb-4">
            Hydration Reimagined
          </p>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
            Experience the perfect blend of nature's minerals and modern wellness. 
            Every sip brings you closer to optimal health.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="btn-premium text-lg px-10 py-4">
              Find a Store
            </button>
            <button className="btn-outline-neon text-lg px-10 py-4">
              Learn More
            </button>
          </div>
          
          {/* Mineral badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['B12', 'Ca', 'Mg', 'K', 'Zn', 'Na'].map((mineral) => (
              <span
                key={mineral}
                className="px-4 py-2 rounded-full glass text-neon-cyan text-sm font-semibold border border-neon-cyan/30"
              >
                {mineral}
              </span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm"
        >
<<<<<<< HEAD
          <p>© 2024 WhiteUp Mineral Water. All rights reserved.</p>
=======
          <p>© 2024 PureLife Mineral Water. All rights reserved.</p>
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
          <div className="flex gap-6">
            <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};