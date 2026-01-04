import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-cyan/15 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Logo mark */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-soda-orange shadow-glow-primary">
            <span className="font-display text-4xl text-primary-foreground">FC</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6">
            <span className="text-foreground">TASTE THE</span>
            <br />
            <span className="gradient-text">REVOLUTION</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join us on a journey of flavor, innovation, and sustainability. 
            The future of refreshment starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="btn-premium text-lg">
              Partner With Us
            </button>
            <button className="btn-outline-neon text-lg">
              View Portfolio
            </button>
          </div>
          
          {/* Social links */}
          <div className="flex gap-6 justify-center items-center">
            {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 pt-8 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 FizzCraft. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
