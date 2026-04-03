import React from 'react';
import GeometricBackground from './geometric';

export default function GeometricBackgroundDemo() {
  return (
    <GeometricBackground className="flex w-full h-screen justify-center items-center bg-[#030303]">
      <div className="text-center space-y-4 lg:space-y-6 z-10">
        <div className="text-2xl lg:text-4xl text-light-text dark:text-white/80 font-bold tracking-tight">
          Geometric Background
        </div>
        <p className="text-light-text dark:text-white/40 max-w-md mx-auto text-sm leading-relaxed">
          Ultra-premium animated backdrop with floating geometric primitives and organic light leaks.
        </p>
      </div>
    </GeometricBackground>
  );
}
