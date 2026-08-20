"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const RollingText = ({ text, isHovered, className = "" }: { text: string; isHovered: boolean; className?: string }) => {
  return (
    <div className={`relative overflow-hidden flex ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.01
          }}
          className="relative block whitespace-pre"
        >
          {char}
          <span className="absolute top-full left-0">{char}</span>
        </motion.span>
      ))}
    </div>
  );
};

export const AnimatedButton = ({ 
  text, 
  className = "", 
  onClick, 
  children,
  wrapperClassName = ""
}: { 
  text: string; 
  className?: string; 
  onClick?: () => void;
  children?: React.ReactNode;
  wrapperClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center ${wrapperClassName}`}>
        {children}
        <RollingText text={text} isHovered={isHovered} />
      </div>
    </button>
  );
};

export const AnimatedLink = ({ 
  text, 
  href,
  className = "", 
  children,
  wrapperClassName = ""
}: { 
  text: string; 
  href: string;
  className?: string; 
  children?: React.ReactNode;
  wrapperClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-center ${wrapperClassName}`}>
        {children}
        <RollingText text={text} isHovered={isHovered} />
      </div>
    </Link>
  );
};
