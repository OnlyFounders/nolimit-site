"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils.js";

const defaultVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export function TextLoop({
  children,
  className,
  transition = { duration: 0.3 },
  variants = defaultVariants,
}) {
  const key = typeof children === "string" ? children : JSON.stringify(children);
  return (
    <div className={cn("text-loop", "relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={key}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
          className="block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
