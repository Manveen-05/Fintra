"use client";

import { useRef, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

type AnimatedThemeTogglerProps = {
  darkMode: boolean;
  onToggle: (isDark: boolean) => void;
  className?: string;
};

export const AnimatedThemeToggler = ({ 
  darkMode, 
  onToggle, 
  className 
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sync the 'dark' class on <html> with the darkMode prop
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return;

    const performUpdate = () => {
      onToggle(!darkMode);
    };

    // Fallback for browsers that don't support startViewTransition
    if (!document.startViewTransition) {
      performUpdate();
      return;
    }

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        performUpdate();
      });
    });

    await transition.ready;

    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [darkMode, onToggle]);

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label="Switch theme"
      className={cn(
        "flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer transition-colors",
        darkMode ? "hover:bg-[#235347] dark:hover:bg-[#8EB69B] dark:bg-white/10" : "hover:bg-black/5",
        className
      )}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-light-text dark:text-white"
          >
            <Sun className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-[#051F20] dark:text-black"
          >
            <Moon className="w-5 h-5 flex-shrink-0" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
