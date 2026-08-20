"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorTypeRef = useRef<"default" | "drag" | "view" | "hide">("default");
  const [cursorType, setCursorType] = useState<"default" | "drag" | "view" | "hide">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isDrag = target.closest('[data-cursor="drag"]');
      const isView = target.closest('[data-cursor="view"]');
      const isHide = target.closest('[data-cursor="hide"]');
      const newType = isHide ? "hide" : (isDrag ? "drag" : (isView ? "view" : "default"));

      if (cursorTypeRef.current !== newType) {
        cursorTypeRef.current = newType;
        setCursorType(newType);
      }

      const offsetX = newType === "default" ? 6 : 40;
      const offsetY = newType === "default" ? 6 : 20;

      mouseX.set(e.clientX - offsetX);
      mouseY.set(e.clientY - offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="hidden lg:flex fixed top-0 left-0 pointer-events-none z-[99999] items-center justify-center"
    >
      <motion.div
        animate={{
          opacity: cursorType === "hide" ? 0 : 1,
          scale: cursorType === "hide" ? 0.5 : 1,
          y: cursorType === "default" ? [0, -10, 0] : 0,
          width: cursorType === "default" ? 12 : 60,
          height: cursorType === "default" ? 12 : 30,
          borderRadius: cursorType === "default" ? 6 : 20
        }}
        transition={{
          y: { duration: 2, repeat: cursorType === "default" ? Infinity : 0, ease: "easeInOut" },
          default: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className="bg-blue-400 flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(248,198,48,0.3)]"
        style={{ backgroundColor: "var(--accent, #F8C630)" }}
      >
        {cursorType !== "default" && cursorType !== "hide" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black font-medium text-xs capitalize"
          >
            {cursorType}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
