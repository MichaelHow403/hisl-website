import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Leaf } from 'lucide-react';
import EnergyAwarenessOverlay from './EnergyAwarenessOverlay';

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Poetry content
  const poemLines = [
    "In circuits deep and silicon dreams,",
    "Where data flows like mountain streams,",
    "We build not just with steel and stone,",
    "But with a soul that's truly our own.",
    "",
    "Each prompt a bridge from mind to mind,",
    "Each response both swift and kind,",
    "In sovereignty we place our trust,",
    "For AI that serves, not rules, is just.",
    "",
    "From construction sites to starlit skies,",
    "We lift our tools, we lift our eyes,",
    "Building futures, line by line,",
    "Where human hearts and AI shine."
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

        {/* Starfield effect */}
        <div className="absolute inset-0 z-1">
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

        {/* Main Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <motion.span 
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  AI + Human
                </motion.span>
                <br />
                <motion.span 
                  className="text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  … with{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    soul
                  </span>
                </motion.span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Where compliance meets cognition. Where prompts stay yours.
            </motion.p>

            {/* CTA Buttons with enhanced effects */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.button
                onClick={() => scrollToSection('agents')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  🤖 Explore the Agents
                </span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg overflow-hidden hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  📝 Join the Waitlist
                </span>
              </motion.button>
            </motion.div>

            {/* Energy Awareness Button */}
            <motion.button
              onClick={() => setShowEnergyOverlay(true)}
              className="group flex items-center space-x-2 mx-auto px-4 py-2 bg-green-900/30 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-900/50 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm">View Energy Impact</span>
            </motion.button>

            {/* Metrics */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
                <motion.div 
                  className="text-4xl font-bold text-cyan-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  100%
                </motion.div>
                <div className="text-lg font-semibold text-white mb-1">Sovereign Control</div>
                <div className="text-sm text-gray-400">Your data, your rules</div>
              </div>

              <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
                <motion.div 
                  className="text-4xl font-bold text-cyan-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  24/7
                </motion.div>
                <div className="text-lg font-semibold text-white mb-1">Autonomous Operation</div>
                <div className="text-sm text-gray-400">Always available</div>
              </div>

              <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
                <motion.div 
                  className="text-4xl font-bold text-cyan-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ∞
                </motion.div>
                <div className="text-lg font-semibold text-white mb-1">Scalable Intelligence</div>
                <div className="text-sm text-gray-400">Grows with you</div>
              </div>
            </motion.div>
          </div>
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

      {/* Why We Build Section with Poetry */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        {/* Raven watermark background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src="/assets/raven_huginn.png" 
            alt="Raven" 
            className="w-96 h-96 object-contain"
          />
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Why We Build
              </span>
            </h2>
          </motion.div>

          {/* Poetry Section */}
          <motion.div 
            ref={poemRef}
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-12">
              <div className="space-y-4 text-lg md:text-xl leading-relaxed">
                {poemLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={line === "" ? "h-4" : "text-gray-300"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reach for the Stars Image */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <img 
                src="/assets/reach_for_the_stars.png" 
                alt="Reach for the Stars" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
            
            <motion.p 
              className="mt-8 text-xl text-gray-300 italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              "We reach not just for the stars, but for the soul within the machine."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Energy Awareness Overlay */}
      <EnergyAwarenessOverlay 
        isVisible={showEnergyOverlay}
        onClose={() => setShowEnergyOverlay(false)}
        regionCode="IE"
        promptType="simple"
      />
    </>
  );
}

