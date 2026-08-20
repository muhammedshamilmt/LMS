"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  justify?: "center" | "start" | "end";
}

export function TextReveal({ text, className = "", delay = 0, justify = "center" }: TextRevealProps) {
  // Handle literal "\n" strings that get passed in JSX attributes
  const lines = text.replace(/\\n/g, '\n').split('\n');

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } }
      }}
      className={`flex flex-col ${
        justify === "center" ? "items-center" : justify === "start" ? "items-start" : "items-end"
      } ${className}`}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <div key={lineIndex} className={`flex flex-wrap justify-${justify}`}>
            {words.map((word, i) => (
              <span key={i} className="inline-flex overflow-hidden mr-[0.25em] mb-[0.1em]">
                <motion.span
                  variants={{
                    hidden: { y: "120%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        );
      })}
    </motion.div>
  );
}
