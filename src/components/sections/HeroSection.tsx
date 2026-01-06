// import { motion } from 'framer-motion';

// export const HeroSection = () => {
//   return (
//     <section className="section-container relative">
//       {/* Background gradient orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
//       </div>
      
//       {/* Content */}
//       <div className="container relative z-20 text-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//         >
//           <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-none mb-6">
//             <span className="gradient-text">FIZZ</span>
//             <span className="text-foreground">CRAFT</span>
//           </h1>
//         </motion.div>
        
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body"
//           className="text-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body px-4 py-2 rounded-xl bg-black/20 backdrop-blur-sm"
//           // className="text-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body drop-shadow-lg"
//           // className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body px-6 py-4 rounded-2xl bg-black/40 backdrop-blur-md shadow-xl"

//         >
//           Where innovation meets refreshment. Experience the future of craft beverages.
//         </motion.p>
        
        
//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1.5 }}
//           className="absolute bottom-10 left-1/2 -translate-x-1/2"
//         >
//           <div className="flex flex-col items-center gap-10">
//             {/* <span className="text-sm uppercase tracking-widest backdrop-blur-sm  bg-black/20 text-soda-orange text-lg md:text-xl">Scroll to explore</span> */}
//             <span className="
//   text-sm uppercase tracking-widest
//   px-4 py-2 rounded-full
//   backdrop-blur-sm bg-black/30
//   text-orange-300
//   drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]
// ">
//   Scroll to explore
// </span>


//             <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//                 className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
//               />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };


import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  setRotationY: (value: number) => void;
}

export const HeroSection = ({ setRotationY }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Section-based scroll (SAFE)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Map scroll → rotation (0 → ~160deg)
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 0.9]
  );

  // Bridge scroll value → Three.js
  useEffect(() => {
    return rotateY.on("change", (v) => {
      if (!Number.isFinite(v)) return;
      setRotationY(v);
    });
  }, [rotateY, setRotationY]);

  return (
    <section ref={sectionRef} className="section-container relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
<<<<<<< HEAD
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
=======
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-water-light/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-water-deep/10 rounded-full blur-3xl" />
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
      </div>

      {/* Content */}
      <div className="container relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-none mb-6">
<<<<<<< HEAD
            <span className="gradient-text">White</span>
            <span className="text-foreground text-glow">up</span>
=======
            <span className="gradient-text-dark">PURE</span>
            <span className="gradient-text-dark">LIFE</span>
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body px-4 py-2 rounded-xl bg-black/20 backdrop-blur-sm"
        >
          Premium mineral water enriched with essential vitamins and minerals. 
          Experience hydration at its finest.
        </motion.p>
<<<<<<< HEAD

=======
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="btn-premium">
            Discover Our Water
          </button>
          <button className="btn-outline-neon">
            View Minerals
          </button>
        </motion.div>
        
>>>>>>> 044bfd692a81951bdf99d3050199db6a1b95e641
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-10">
            <span
              className="
                text-sm uppercase tracking-widest
                px-4 py-2 rounded-full
                backdrop-blur-sm bg-black/30
                text-orange-300
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]
              "
            >
              Scroll to explore
            </span>

            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
