import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const minerals = [
  {
    title: "Vitamin B12",
    description: "Essential for energy production and nervous system health. Supports cognitive function.",
    icon: "💎",
    amount: "2.4μg"
  },
  {
    title: "Calcium (Ca)",
    description: "Strengthens bones and teeth. Supports muscle function and heart health.",
    icon: "🦴",
    amount: "80mg"
  },
  {
    title: "Magnesium (Mg)",
    description: "Aids muscle relaxation and energy metabolism. Reduces fatigue and stress.",
    icon: "⚡",
    amount: "25mg"
  },
  {
    title: "Potassium (K)",
    description: "Regulates fluid balance and blood pressure. Essential for heart function.",
    icon: "❤️",
    amount: "10mg"
  },
  {
    title: "Zinc (Zn)",
    description: "Boosts immune system and wound healing. Supports skin health.",
    icon: "🛡️",
    amount: "1.5mg"
  },
  {
    title: "Sodium (Na)",
    description: "Maintains fluid balance and supports nerve function. Natural electrolyte.",
    icon: "💧",
    amount: "15mg"
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
          <span className="text-neon-cyan uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Essential Minerals
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            <span className="text-foreground">VITAMINS &</span>
            <br />
            <span className="gradient-text-water">MINERALS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every bottle is enriched with nature's finest minerals and vitamins, 
            carefully balanced for optimal hydration and wellness.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {minerals.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass rounded-2xl p-8 group hover:bg-card/80 transition-all duration-500 border border-water-deep/20 hover:border-neon-cyan/40"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-neon-cyan font-display text-xl">{item.amount}</span>
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
      <div className="absolute right-10 top-1/3 w-48 h-48 bg-water-deep/15 rounded-full blur-3xl" />
    </section>
  );
};
