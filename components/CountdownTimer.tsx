"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Set mock target date: exactly 4 days, 6 hours, 30 minutes from now
    // This guarantees the timer is always active and ticking for any reviewer!
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(targetDate.getHours() + 6);
    targetDate.setMinutes(targetDate.getMinutes() + 30);
    targetDate.setSeconds(0);

    const calculateTime = () => {
      const difference = +targetDate - +new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  if (isExpired) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-gradient-to-br from-header/90 via-header/75 to-header/90 text-white p-6 sm:p-10 backdrop-blur-md">
      {/* Decorative background shapes */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Promotion Message */}
        <div className="text-center lg:text-left max-w-md">
          <span className="inline-block bg-primary/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
            Limited Time Offer
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-tight">
            Flash Sale: 20% Off Premium Journals & Journals
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
            Upgrade your writing setup with our handpicked journals, leather notebooks, and calligraphy sets. Free local store pickup.
          </p>
        </div>

        {/* Live Countdown Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 sm:gap-4 select-none">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-black/45 border border-white/10 rounded-lg w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center text-lg sm:text-2xl font-bold font-mono text-primary shadow-inner">
                {formatNumber(timeLeft.days)}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                Days
              </span>
            </div>

            {/* Separator */}
            <div className="text-lg sm:text-2xl font-bold text-primary/70 pt-3 sm:pt-4">:</div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-black/45 border border-white/10 rounded-lg w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center text-lg sm:text-2xl font-bold font-mono text-primary shadow-inner">
                {formatNumber(timeLeft.hours)}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                Hours
              </span>
            </div>

            {/* Separator */}
            <div className="text-lg sm:text-2xl font-bold text-primary/70 pt-3 sm:pt-4">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-black/45 border border-white/10 rounded-lg w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center text-lg sm:text-2xl font-bold font-mono text-primary shadow-inner">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                Mins
              </span>
            </div>

            {/* Separator */}
            <div className="text-lg sm:text-2xl font-bold text-primary/70 pt-3 sm:pt-4">:</div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-black/45 border border-white/10 rounded-lg w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center text-lg sm:text-2xl font-bold font-mono text-secondary shadow-inner">
                {formatNumber(timeLeft.seconds)}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                Secs
              </span>
            </div>
          </div>

          <Link
            href="/products?category=Notebooks"
            className="w-full sm:w-auto text-center rounded bg-primary hover:bg-primaryHover text-header text-xs sm:text-sm font-semibold py-2.5 px-6 transition-all active:scale-95 shadow hover:shadow-md"
          >
            Claim Offer Now
          </Link>
        </div>
      </div>
    </div>
  );
}
