"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const BANNER_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&q=80",
    title: "Fine Stationery & Writing Instruments",
    subtitle: "Discover our premium selection of notebooks, fountain pens, and journaling essentials designed for the curious mind.",
    cta: "Explore Collection",
    link: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1600&q=80",
    title: "Unleash Your Creativity",
    subtitle: "Art supplies, colored pencils, and professional markers to bring your imaginations, drawings, and designs to life.",
    cta: "Shop Art Supplies",
    link: "/products?category=Pencils",
  },
  {
    image: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=1600&q=80",
    title: "Professional Printing & E-Services",
    subtitle: "Xerox, high-quality printing, and Tamil Nadu E-Sevai solutions to assist with all your document and certificate needs.",
    cta: "Our Services",
    link: "/#services",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Forces re-trigger of animations on slide change

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden bg-header text-white">
      {/* CSS Styles for animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-20px) rotate(15deg); opacity: 0.35; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
        }
        @keyframes float-medium {
          0% { transform: translateY(0px) rotate(12deg); opacity: 0.15; }
          50% { transform: translateY(-30px) rotate(-10deg); opacity: 0.3; }
          100% { transform: translateY(0px) rotate(12deg); opacity: 0.15; }
        }
        @keyframes float-fast {
          0% { transform: translateY(0px) rotate(-5deg); opacity: 0.1; }
          50% { transform: translateY(-15px) rotate(5deg); opacity: 0.25; }
          100% { transform: translateY(0px) rotate(-5deg); opacity: 0.1; }
        }
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-40">
        {/* Floating Pencil (Left) */}
        <div
          className="absolute left-[8%] top-[25%] w-10 h-10 text-secondary"
          style={{ animation: "float-slow 8s ease-in-out infinite" }}
        >
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
          </svg>
        </div>

        {/* Floating Fountain Pen (Right) */}
        <div
          className="absolute right-[10%] top-[20%] w-12 h-12 text-primary"
          style={{ animation: "float-medium 9s ease-in-out infinite 1s" }}
        >
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M21.7,5.3C21.3,4.9 20.7,4.9 20.3,5.3L18.9,6.7L17.3,5.1L15.9,6.5L17.3,7.9L12.5,12.7C12.3,12.9 12,13 11.7,13C11.4,13 11.2,12.9 11,12.7L9.6,11.3L8.2,12.7L9.6,14.1L8.5,15.2C8.1,15.6 7.5,15.6 7.1,15.2L4.5,12.6C4.1,12.2 4.1,11.6 4.5,11.2L5.6,10.1L4.2,8.7L5.6,7.3L7,8.7L11.8,3.9C12,3.7 12.3,3.6 12.6,3.6C12.9,3.6 13.2,3.7 13.4,3.9L15,5.5L16.4,4.1L14.8,2.5C14.2,1.9 13.4,1.6 12.6,1.6C11.8,1.6 11,1.9 10.4,2.5L5.6,7.3L3.1,4.8L1,6.9L17.1,23L19.2,20.9L16.7,18.4L21.5,13.6C22.1,13 22.4,12.2 22.4,11.4C22.4,10.6 22.1,9.8 21.5,9.2L19.9,7.6L21.7,5.8C22.1,5.6 22.1,5.5 21.7,5.3M12,17L7,22H17L12,17Z" />
          </svg>
        </div>

        {/* Floating Notebook (Left Bottom) */}
        <div
          className="absolute left-[15%] bottom-[15%] w-10 h-10 text-white"
          style={{ animation: "float-fast 7s ease-in-out infinite 0.5s" }}
        >
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M19,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2M19,20H5V4H19V20M7,6H17V8H7V6M7,10H17V12H7V10M7,14H12V16H7V14Z" />
          </svg>
        </div>

        {/* Floating Paperclip (Right Bottom) */}
        <div
          className="absolute right-[18%] bottom-[20%] w-8 h-8 text-sage"
          style={{ animation: "float-slow 11s ease-in-out infinite 1.5s" }}
        >
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
          </svg>
        </div>
      </div>

      {/* Carousel slides */}
      <div className="relative w-full h-full">
        {BANNER_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Slide Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover opacity-35 transform scale-105 transition-transform duration-[6000ms] ease-out"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-header via-header/70 to-transparent" />
              </div>

              {/* Slide Content */}
              {isActive && (
                <div className="relative z-30 mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                  <div key={animationKey} className="max-w-2xl">
                    <span className="inline-block text-primary text-xs sm:text-sm uppercase tracking-widest font-semibold animate-slide-up-fade" style={{ animationDelay: "100ms" }}>
                      Curated stationery store
                    </span>
                    <h2
                      className="mt-2 text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-white leading-tight animate-slide-up-fade"
                      style={{ animationDelay: "300ms" }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="mt-4 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-xl animate-slide-up-fade"
                      style={{ animationDelay: "500ms" }}
                    >
                      {slide.subtitle}
                    </p>
                    <div
                      className="mt-6 sm:mt-8 animate-slide-up-fade"
                      style={{ animationDelay: "700ms" }}
                    >
                      <Link
                        href={slide.link}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded bg-primary px-6 py-3 text-sm sm:text-base font-semibold text-header shadow-md transition-all hover:bg-primaryHover hover:shadow-lg active:scale-95"
                      >
                        {/* Shimmer animation */}
                        <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]" />
                        {slide.cta}
                        <svg
                          className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {BANNER_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-6 sm:w-8 bg-primary" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS styling for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: skewX(-12deg) translateX(300%);
          }
        }
      `}</style>
    </section>
  );
}
