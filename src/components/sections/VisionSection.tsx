import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const impactPoints = [
  {
    number: "01",
    title: "Sustainability",
    description: "100% recyclable bottles made from ocean-recovered plastic. Carbon-neutral production."
  },
  {
    number: "02",
    title: "Community",
    description: "For every bottle sold, we provide clean water access to communities in need worldwide."
  },
  {
    number: "03",
    title: "Innovation",
    description: "Pioneering mineral enrichment technology that preserves natural water integrity."
  }
];

export const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="section-container relative py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-water-deep/5 to-transparent" />
      
      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-neon-cyan uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Our Vision
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            <span className="text-foreground">HYDRATING</span>
            <br />
            <span className="gradient-text-water">THE FUTURE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe in a world where premium hydration meets environmental responsibility. 
            Every drop counts in our mission for a healthier planet.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {impactPoints.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 text-8xl font-display text-water-deep/20 group-hover:text-neon-cyan/30 transition-colors duration-500">
                {point.number}
              </div>
              <div className="glass rounded-2xl p-8 pt-12 relative z-10 h-full border border-water-deep/10 group-hover:border-neon-cyan/30 transition-all duration-500">
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50M+", label: "Bottles Produced" },
            { value: "25K+", label: "Communities Served" },
            { value: "100%", label: "Natural Source" },
            { value: "Zero", label: "Carbon Footprint" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-4xl md:text-5xl gradient-text-water">{stat.value}</span>
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
