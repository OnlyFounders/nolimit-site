"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.015 },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: { opacity: 1, filter: "blur(0px)" },
};

export function BlurredStagger({ text, className = "" }) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`blurred-stagger-text ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterAnimation}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
