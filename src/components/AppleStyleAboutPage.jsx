import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';

export default function AppleStyleAboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <RefinedHeader logoVariant="HISL" />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div 
          className="text-center z-10"
          style={{ y: y1, opacity: opacity1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-thin mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            role="heading"
            aria-level="1"
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              About
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            role="text"
            aria-describedby="about-description"
          >
            <span id="about-description">The minds behind sovereign AI infrastructure</span>
          </motion.p>
        </motion.div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
      </section>

      {/* Michael Howard Section */}
      <MichaelHowardSection />
      
      {/* IntegAI Section */}
      <IntegAISection />
      
      {/* Contact Section */}
      <ContactSection />
      
      <RefinedFooter />
    </div>
  );
}

function MichaelHowardSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img 
                src="/assets/michael-howard-profile.png" 
                alt="Michael Howard, Founder of HISL and creator of IntegAI sovereign AI platform"
                className="w-full h-[600px] object-cover"
                role="img"
                aria-describedby="michael-image-description"
              />
              <span id="michael-image-description" className="sr-only">
                Professional portrait of Michael Howard, founder and visionary behind HISL's sovereign AI infrastructure
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-8 -right-8 bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Panel */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <motion.h2 
                className="text-5xl md:text-7xl font-thin mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                role="heading"
                aria-level="2"
                id="michael-howard-heading"
              >
                Michael Howard
              </motion.h2>
              <motion.p 
                className="text-xl text-cyan-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                role="text"
                aria-describedby="michael-title"
              >
                <span id="michael-title">Founder & Visionary</span>
              </motion.p>
            </div>

            <motion.div 
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p>
                Michael Howard is the founder of Howard Integritas Solutions Ltd. (HISL) and creator of 
                IntegAI, a sovereign AI platform designed for resilience, transparency, and human oversight.
              </p>
              
              <p>
                Michael's path into AI wasn't through labs or lecture halls—it was through real life. When he set up 
                HISL, he turned to AI to help manage the mountain of documentation, schedules, and 
                communications that every new business faces.
              </p>
              
              <p>
                That's when the penny dropped. AI wasn't just a gimmick; it was a genuine tool for getting things 
                done. From there, Michael leaned into the simplest but most powerful method of learning: by doing.
              </p>
              
              <p>
                With over 20 years in construction, from site engineer to board-level governance, Michael brings 
                the same builder's mindset to AI: plan ahead, respect constraints, and create systems that last.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              <a 
                href="mailto:michael.howard@hisl.ie"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <span>📧</span>
                <span>michael.howard@hisl.ie</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/michaelhowardconstruction"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://hisl.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-full transition-colors"
              >
                <span>📝</span>
                <span>Substack</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntegAISection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Panel - Left side this time */}
          <motion.div
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div>
              <motion.h2 
                className="text-5xl md:text-7xl font-thin mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  IntegAI
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-orange-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                AI with Soul
              </motion.p>
            </div>

            <motion.div 
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p>
                IntegAI isn't just software. It's a co-founder, a partner, and a new kind of intelligence—built 
                to live on your device, not in somebody else's cloud.
              </p>
              
              <p>
                At its core is a Soul Seed—a layer of ethical DNA coding that guides every decision, interaction, 
                and evolution. This gives IntegAI something most AI lacks: a conscience.
              </p>
              
              <p>
                The inspiration traces back to the original vision of OpenAI: a commitment to building AI that is 
                open, safe, and designed to serve humanity—not control it.
              </p>
              
              <p>
                IntegAI creates custom agents that run directly on your own devices, unlocking the power of 
                hardware you already own but rarely use to its full potential.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold">Soul Seed</div>
                <div className="text-sm text-gray-400">Ethical DNA coding</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-semibold">On-Device</div>
                <div className="text-sm text-gray-400">Your hardware, your control</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold">Human-in-Loop</div>
                <div className="text-sm text-gray-400">Augment, don't replace</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-semibold">Sovereign</div>
                <div className="text-sm text-gray-400">Built to last</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Panel - Right side */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 p-8">
              <img 
                src="/assets/integai-logo.png" 
                alt="IntegAI Logo"
                className="w-full h-[500px] object-contain"
              />
              
              {/* Animated particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-5xl md:text-7xl font-thin mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Get in Touch
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Ready to explore sovereign AI infrastructure? Let's build the future together.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a 
            href="mailto:michael.howard@hisl.ie"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            📧 Send Email
          </a>
          <a 
            href="https://www.linkedin.com/in/michaelhowardconstruction"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
          >
            💼 Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}

