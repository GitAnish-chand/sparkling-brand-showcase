import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const impactPoints = [
  {
<<<<<<< HEAD
    year: "2026",
    title: "Mineral water",
    description: "Recommended daily intake of mineral water for a healthy lifestyle."
  },
  {
    year: "2028",
    title: "Global Expansion",
    description: "Bringing refreshment innovation to 50 new markets worldwide."
=======
    number: "01",
    title: "Sustainability",
    description: "100% recyclable bottles made from ocean-recovered plastic. Carbon-neutral production."
  },
  {
    number: "02",
    title: "Community",
    description: "For every bottle sold, we provide clean water access to communities in need worldwide."
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
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
<<<<<<< HEAD
    <section ref={ref} className="section-container relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse-glow" />
      </div>

=======
    <section ref={ref} className="section-container relative py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-water-deep/5 to-transparent" />
      
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
<<<<<<< HEAD
          <span className="text-primary uppercase tracking-[0.3em] text-base md:text-lg font-semibold mb-4 block bg-black/20 backdrop-blur-sm text-glow">
            Our Vision
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6 flex flex-col">
            <span className="gradient-text-soda bg-black/20 backdrop-blur-sm text-glow">HYDRATING </span>
            <span className="text-foreground gradient-text bg-black/20 backdrop-blur-sm "> THE FUTURE</span>
          </h2>
          <p className=" text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body px-4 py-2 rounded-xl bg-black/20 backdrop-blur-sm">
            We're not just selling water – we're pioneering a sustainable future
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
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-glow-neon z-10" />

              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <span className="font-display text-4xl text-primary">{item.year}</span>
                <h3 className="font-display text-2xl text-foreground mt-2">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
=======
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
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
              </div>
            </motion.div>
          ))}
        </div>
<<<<<<< HEAD

        {/* Impact stats */}
=======
        
        {/* Stats row */}
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
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
