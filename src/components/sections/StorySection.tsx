import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-water-deep/50 to-transparent" />
      </div>
      
      <div className="container relative z-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-neon-cyan uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
              Our Story
            </span>
            <h2 className="font-display text-5xl md:text-7xl mb-6">
              <span className="text-foreground">SOURCED FROM</span>
              <br />
              <span className="gradient-text-water">NATURE</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Deep beneath pristine mountain ranges, our water begins its journey through 
              ancient mineral-rich rock formations. This natural filtration process enriches 
              every drop with essential minerals and vitamins that your body craves.
            </p>
            <div className="flex gap-8">
              <div>
                <span className="font-display text-4xl text-water-deep">500m</span>
                <p className="text-muted-foreground text-sm">Deep Source</p>
              </div>
              <div>
                <span className="font-display text-4xl text-neon-cyan">8+</span>
                <p className="text-muted-foreground text-sm">Essential Minerals</p>
              </div>
              <div>
                <span className="font-display text-4xl text-water-light">100%</span>
                <p className="text-muted-foreground text-sm">Natural Purity</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-radial from-water-deep/20 via-transparent to-transparent" />
            <div className="glass rounded-3xl p-8 text-center">
              <p className="text-foreground font-display text-2xl">Pure Hydration</p>
              <p className="text-muted-foreground mt-2">Watch the purity flow</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
