"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export const Accordion = ({ children, className, type = "single", collapsible = true }: any) => {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  return (
    <div className={cn("w-full space-y-1", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen: activeValue === child.props.value,
            onToggle: () => {
              if (activeValue === child.props.value) {
                if (collapsible) setActiveValue(null);
              } else {
                setActiveValue(child.props.value);
              }
            }
          });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionItem = ({ children, className, value, isOpen, onToggle }: any) => {
  return (
    <div className={cn("border-b border-light-border dark:border-white/5 last:border-b-0 overflow-hidden", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger = ({ children, className, isOpen, onToggle }: any) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "group flex w-full items-start justify-between gap-4 py-4 text-left font-medium text-sm outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-300 ease-in-out",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
};

export const AccordionContent = ({ children, className, isOpen }: any) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden text-light-text-subtle dark:text-gray-400 text-sm"
        >
          <div className={cn("pt-0 pb-4", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
