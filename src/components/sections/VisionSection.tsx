import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const visionItems = [
  {
    year: "2024",
    title: "Carbon Neutral",
    description: "Achieving full carbon neutrality across all operations and supply chain."
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Bringing refreshment innovation to 50 new markets worldwide."
  },
  {
    year: "2030",
    title: "Zero Waste",
    description: "100% recyclable packaging and zero waste production facilities."
  }
];

export const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse-glow" />
      </div>
      
      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-soda-coral uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Our Vision
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            <span className="gradient-text-soda">SHAPING</span>
            <span className="text-foreground"> TOMORROW</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not just crafting beverages – we're pioneering a sustainable future 
            for the industry and the planet.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-neon-cyan to-primary" />
          
          {visionItems.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-glow-neon z-10" />
              
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <span className="font-display text-4xl text-primary">{item.year}</span>
                <h3 className="font-display text-2xl text-foreground mt-2">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { value: "95%", label: "Recycled Materials" },
            { value: "12K", label: "Trees Planted" },
            { value: "40%", label: "Energy Saved" },
            { value: "100+", label: "Partners Worldwide" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-4xl md:text-5xl gradient-text">{stat.value}</span>
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
