import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Leaf } from 'lucide-react';
import EnergyAwarenessOverlay from './EnergyAwarenessOverlay';
import MiniGlobe from './MiniGlobe';
import AINewsSection from './AINewsSection';
import HeroClarity from './HeroClarity';

export default function ParallaxHeroSection() {
  const [showEnergyOverlay, setShowEnergyOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const poemRef = useRef(null);
  const isInView = useInView(poemRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // HISL Manifesto Poetry content
  const poemLines = [
    "Then prove we now with best endeavour,",
    "What from our efforts yet may spring,",
    "He justly is despised who never,",
    "Did thought to aid his labours bring.",
    "",
    "For this is Art's true indication,",
    "When skill is minister to thought,",
    "When types that are the mind's creation,",
    "The hand to perfect form has wrought."
  ];

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Parallax Background Layers */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1, opacity }}
        >
          <div 
            className="w-full h-[120vh] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/assets/AI_Construction_Bridge_banner.png')`
            }}
          />
        </motion.div>

        {/* Secondary parallax layer with construction imagery */}
        <motion.div 
          className="absolute inset-0 z-1"
          style={{ y: y2, opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 0]) }}
        >
          <div 
            className="w-full h-[110vh] bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('/assets/AI_in_construction.PNG')`,
              backgroundBlendMode: 'overlay'
            }}
          />
        </motion.div>

        {/* Animated DNA/Feather overlay */}
        <motion.div 
          className="absolute top-20 right-10 w-32 h-32 opacity-20 z-2"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img src="/assets/AIDNA.webp" alt="AI DNA" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div 
          className="absolute bottom-20 left-10 w-24 h-24 opacity-15 z-2"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <img src="/assets/Feather.PNG" alt="Feather" className="w-full h-full object-contain" />
        </motion.div>

        {/* Reduced brightness starfield */}
        <div className="absolute inset-0 z-1 opacity-25">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Subtle particle drift */}
        <div className="absolute inset-0 z-1 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Hero Clarity Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <HeroClarity />
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* HISL Manifesto Section with Poetry */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Manifesto
              </span>
            </h2>
          </motion.div>

          {/* Poetry Section with Reaching for Stars Background */}
          <motion.div 
            ref={poemRef}
            className="max-w-6xl mx-auto text-center mb-16 relative min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url('/assets/reach_for_the_stars.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Poetry Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-8">
              <div className="space-y-8 text-2xl md:text-3xl lg:text-4xl leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                {poemLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={line === "" ? "h-6" : "text-yellow-400 font-medium text-shadow-lg"}
                    style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.3)',
                      color: '#FFD700',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.4,
                      ease: "easeOut"
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
              
              {/* Attribution Quote */}
              <motion.div
                className="mt-16 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 4 }}
              >
                <p 
                  className="text-xl md:text-2xl text-yellow-300 italic font-light"
                  style={{ 
                    fontFamily: 'Times New Roman, serif',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.2)',
                    color: '#FFED4E'
                  }}
                >
                  "We reach not just for the stars, but for the soul within the machine."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Energy Awareness Overlay */}
      {/* AI & Tech News Section */}
      <AINewsSection />

      <EnergyAwarenessOverlay 
        isVisible={showEnergyOverlay}
        onClose={() => setShowEnergyOverlay(false)}
        regionCode="IE"
        promptType="simple"
      />
    </>
  );
}

