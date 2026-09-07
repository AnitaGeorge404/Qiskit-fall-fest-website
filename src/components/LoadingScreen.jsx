import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a1a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="relative text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-accent to-blue-accent py-2"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          Qiskit Fall Fest 2025
        </motion.h1>
        <motion.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-pink-accent to-blue-accent"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
