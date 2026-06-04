"use client";

import React, { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom-in";
  duration?: number; // in ms
  delay?: number; // in ms
  threshold?: number; // 0 to 1
  className?: string;
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  duration = 600,
  delay = 0,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once revealed, we don't need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entering viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Define transition classes based on animation type
  const getAnimationStyles = () => {
    switch (animation) {
      case "fade-up":
        return isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none";
      case "fade-left":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-12 pointer-events-none";
      case "fade-right":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-12 pointer-events-none";
      case "zoom-in":
        return isIntersecting
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${getAnimationStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // smooth easeOutExpo
      }}
    >
      {children}
    </div>
  );
}
