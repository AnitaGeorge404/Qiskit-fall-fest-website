import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { schedule } from '../data/schedule';

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="pt-32 pb-24 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-6">About the Event</h2>
        <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
          From Quantum Fundamentals to Real-World Quantum Applications. A five-day online event designed to introduce students to quantum computing, provide hands-on experience with Qiskit, connect participants with experts from academia and industry, and foster collaborative learning through a virtual hackathon.
        </p>
      </div>

      <div className="relative min-h-[800px] py-10">
        {/* The central vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[var(--muted)] md:transform md:-translate-x-1/2 rounded-full" />
        
        {/* Animated progressive line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-pink-accent to-blue-accent md:transform md:-translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(236,30,130,0.5)]"
          style={{ height: lineHeight }}
        />

        {/* Nodes */}
        <div className="relative z-10 space-y-8 md:space-y-12">
          {schedule.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <Node 
                key={idx} 
                item={item} 
                isLeft={isLeft} 
                progress={scrollYProgress} 
                index={idx} 
                total={schedule.length} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Node({ item, isLeft, progress, index, total }) {
  const nodeTriggerPoint = (index + 0.5) / total;
  
  const opacity = useTransform(
    progress,
    [nodeTriggerPoint - 0.2, nodeTriggerPoint],
    [0, 1]
  );
  
  const y = useTransform(
    progress,
    [nodeTriggerPoint - 0.2, nodeTriggerPoint],
    [50, 0]
  );
  
  const scale = useTransform(
    progress,
    [nodeTriggerPoint - 0.1, nodeTriggerPoint],
    [0, 1]
  );

  return (
    <div className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} items-center relative pl-12 md:pl-0`}>
      {/* Node Dot */}
      <motion.div 
        className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-accent rounded-full border-4 border-[var(--bg-primary)] shadow-[0_0_15px_rgba(0,180,216,0.8)] z-20"
        style={{ scale }}
      />
      
      {/* Wave pulse effect (horizontal line) - hidden on mobile */}
      <motion.div
        className={`hidden md:block absolute top-1/2 h-0.5 bg-gradient-to-r ${isLeft ? 'from-transparent to-pink-accent right-1/2' : 'from-pink-accent to-transparent left-1/2'} z-0`}
        style={{ 
          width: useTransform(progress, [nodeTriggerPoint - 0.15, nodeTriggerPoint], ["0%", "50%"]),
          opacity
        }}
      />

      <motion.div 
        className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 text-left'}`}
        style={{ opacity, y }}
      >
        <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-5 md:p-6 rounded-md hover:border-[var(--accent-blue)] transition-colors">
          <div className="text-[var(--accent-pink)] font-mono text-sm mb-2 text-left md:text-inherit">{item.time}</div>
          <h3 className="text-xl font-bold mb-4 text-left md:text-inherit">{item.title}</h3>
          
          <div className="bg-[var(--muted)] p-4 rounded-md mt-4 border-l-2 border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[var(--background)] flex-shrink-0 flex items-center justify-center text-[10px] text-center border border-[var(--border-color)] font-mono">
              {item.speaker.image}
            </div>
            <div>
              <div className="font-bold text-left text-sm">{item.speaker.name}</div>
              <div className="text-xs text-[var(--muted-foreground)] text-left leading-relaxed mt-1">{item.speaker.bio}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
