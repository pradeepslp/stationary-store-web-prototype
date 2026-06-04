"use client";

import React, { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Check if the app has already loaded in this session to avoid showing it on subpage transitions
    const hasLoaded = sessionStorage.getItem("kavya_initial_loaded");
    if (hasLoaded) {
      setIsRendered(false);
      setIsVisible(false);
      return;
    }

    // Fast loading progress animation
    const duration = 1500; // 1.5s total loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Start fade out animation
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("kavya_initial_loaded", "true");
          // Remove from DOM after transition completes
          setTimeout(() => setIsRendered(false), 500);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-header flex flex-col items-center justify-center text-white transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* CSS keyframe animations for the drawing effect */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pencil-move {
          0% { transform: translate(15px, 28px) rotate(15deg); }
          20% { transform: translate(50px, 12px) rotate(25deg); }
          45% { transform: translate(88px, 28px) rotate(10deg); }
          70% { transform: translate(130px, 12px) rotate(20deg); }
          100% { transform: translate(170px, 28px) rotate(15deg); }
        }
        .animate-draw-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-pencil-icon {
          animation: pencil-move 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="text-center max-w-xs px-6 flex flex-col items-center">
        {/* Stationery Store Logo */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white mb-2">
          Kavya Fancy Store
        </h1>
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-8">
          Fine Stationery & Services
        </p>

        {/* Animated Pencil Drawing Canvas */}
        <div className="relative w-48 h-16 mb-8 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 60">
            {/* Wavy drawing line */}
            <path
              d="M 15 35 Q 50 15 90 35 T 170 35"
              fill="none"
              stroke="#ff9900"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-draw-path"
            />
            
            {/* Pencil Icon moving along with path */}
            <g className="animate-pencil-icon absolute" style={{ transformOrigin: "bottom left" }}>
              <path
                d="M -3 -15 L 2 -15 L 2 -3 L 0 2 L -2 2 L -4 -3 Z"
                fill="#febd69"
              />
              <path
                d="M -3 -15 L 2 -15 L 2 -10 L -3 -10 Z"
                fill="#2c2825"
              />
              {/* Pencil Tip */}
              <polygon
                points="0,2 -2,-3 2,-3"
                fill="#ff9900"
              />
              {/* Pencil Body Highlight */}
              <rect x="-1" y="-10" width="1.5" height="7" fill="#fff" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2 relative">
          <div
            className="bg-primary h-full transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] uppercase tracking-wider text-white/50 font-mono">
          <span>Loading resources</span>
          <span className="text-primary font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
