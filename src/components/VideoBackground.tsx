'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// Import media assets so Vite bundles and resolves their paths correctly
import darkBgUrl from './background/dark-bg.gif';
import lightVideoUrl from './background/lighttt.mp4';

interface VideoBackgroundProps {
  darkMode: boolean;
}

export default function VideoBackground({ darkMode }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Slightly faster for a more dynamic "Fintra" feel
    }
  }, [darkMode]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.div
            key="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={darkBgUrl}
              alt="Dark Background Animation"
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
              className="absolute inset-0 w-full h-full object-cover opacity-[0.12] origin-center mix-blend-screen"
              loading="eager"
              aria-hidden="true"
            />
            
            <div className="absolute inset-0 bg-[#8EB69B]/50 dark:bg-black/20" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              ref={videoRef}
              src={lightVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-[0.35] origin-center"
              aria-hidden="true"
            />
            
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
