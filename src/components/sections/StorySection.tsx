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
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
              <span className="text-foreground">CRAFTED WITH</span>
              <br />
              <span className="gradient-text-soda">PASSION</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Born from a vision to revolutionize the beverage industry, FizzCraft combines 
              traditional brewing mastery with cutting-edge innovation. Every bottle tells 
              a story of dedication, creativity, and the relentless pursuit of perfection.
            </p>
            <div className="flex gap-8">
              <div>
                <span className="font-display text-4xl text-primary">15+</span>
                <p className="text-muted-foreground text-sm">Years of Innovation</p>
              </div>
              <div>
                <span className="font-display text-4xl text-neon-cyan">50M+</span>
                <p className="text-muted-foreground text-sm">Bottles Crafted</p>
              </div>
              <div>
                <span className="font-display text-4xl text-soda-orange">30+</span>
                <p className="text-muted-foreground text-sm">Global Markets</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right visual placeholder - 3D bottle takes this space */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
            <div className="glass rounded-3xl p-8 text-center">
              <p className="text-foreground font-display text-2xl">The Cap Opens</p>
              <p className="text-muted-foreground mt-2">Innovation flows freely</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
