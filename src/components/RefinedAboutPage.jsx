import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function RefinedAboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      <Header logoVariant="DUAL" />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black opacity-80" />
        
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ opacity: opacity1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-thin mb-8 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            About
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            The story behind AI with soul
          </motion.p>
        </motion.div>
      </section>

      {/* Michael Howard Section */}
      <section className="min-h-screen flex items-center relative">
        <motion.div 
          className="w-full px-6 md:px-12 lg:px-24"
          style={{ opacity: opacity2 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Panel */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8">
                <img 
                  src="/michael_profile.png" 
                  alt="Michael Howard" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* HISL Logo Overlay */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black rounded-full p-4 border border-gray-700">
                <img 
                  src="/hisl_logo.jpeg" 
                  alt="HISL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Content Panel */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight">
                Michael Howard
              </h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Founder of Howard Integritas Solutions Ltd. (HISL) and creator of IntegAI
              </p>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg font-light">
                  Michael's path into AI wasn't through labs or lecture halls—it was through real life. 
                  When he set up HISL, he turned to AI to help manage the mountain of documentation, 
                  schedules, and communications that every new business faces.
                </p>
                
                <p className="text-lg font-light">
                  That's when the penny dropped. AI wasn't just a gimmick; it was a genuine tool for 
                  getting things done. From there, Michael leaned into the simplest but most powerful 
                  method of learning: by doing.
                </p>
                
                <p className="text-lg font-light">
                  With over 20 years in construction, from site engineer to board-level governance, 
                  Michael brings the same builder's mindset to AI: plan ahead, respect constraints, 
                  and create systems that last.
                </p>
              </div>

              {/* Contact Info */}
              <div className="pt-8 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:michael.howard@hisl.ie"
                    className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    michael.howard@hisl.ie
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://hisl.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    Substack
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* IntegAI Section */}
      <section className="min-h-screen flex items-center relative">
        <motion.div 
          className="w-full px-6 md:px-12 lg:px-24"
          style={{ opacity: opacity3 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Panel */}
            <motion.div 
              className="space-y-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight">
                IntegAI
              </h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                A co-founder, a partner, and a new kind of intelligence
              </p>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg font-light">
                  IntegAI isn't just software. It's built to live on your device, not in somebody else's cloud. 
                  At its core is a Soul Seed—a layer of ethical DNA coding that guides every decision, 
                  interaction, and evolution.
                </p>
                
                <p className="text-lg font-light">
                  The inspiration traces back to the original vision of OpenAI: a commitment to building AI 
                  that is open, safe, and designed to serve humanity—not control it. IntegAI personifies that promise.
                </p>
                
                <p className="text-lg font-light">
                  It creates custom agents that run directly on your own devices, unlocking the power of 
                  hardware you already own but rarely use to its full potential.
                </p>
              </div>

              <div className="pt-8">
                <p className="text-2xl font-light text-cyan-400 italic">
                  "The original promise of AI, finally built for people—and powerful enough to put small businesses back in the game."
                </p>
              </div>
            </motion.div>

            {/* Image Panel */}
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-8 flex items-center justify-center">
                <img 
                  src="/integai_logo.png" 
                  alt="IntegAI Logo" 
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="min-h-screen flex items-center relative">
        <motion.div 
          className="w-full px-6 md:px-12 lg:px-24"
          style={{ opacity: opacity4 }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.h2 
              className="text-4xl md:text-6xl font-thin tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            
            <motion.p 
              className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              To engineer intelligence like infrastructure—built to serve people, 
              safe by default, and strong enough to stand the test of time.
            </motion.p>

            <motion.div 
              className="pt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="mailto:michael.howard@hisl.ie" className="flex items-center gap-2">
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

