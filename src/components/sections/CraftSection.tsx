import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ingredients = [
  {
    title: "Pure Spring Water",
    description: "Sourced from pristine mountain springs, filtered through ancient rock formations.",
    icon: "💧"
  },
  {
    title: "Natural Botanicals",
    description: "Hand-selected herbs and fruits from sustainable farms around the world.",
    icon: "🌿"
  },
  {
    title: "Artisan Carbonation",
    description: "Micro-bubble technology for the perfect effervescent experience.",
    icon: "✨"
  },
  {
    title: "Zero Compromise",
    description: "No artificial flavors, colors, or preservatives. Pure craft excellence.",
    icon: "🏆"
  }
];

export const CraftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            The Craft
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            <span className="text-foreground">INGREDIENTS OF</span>
            <br />
            <span className="gradient-text">EXCELLENCE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every sip is a symphony of carefully curated ingredients, 
            crafted with precision and passion.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass rounded-2xl p-8 text-center group hover:bg-card/80 transition-all duration-500"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute right-10 top-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};
