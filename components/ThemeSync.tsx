"use client";

import { useEffect } from "react";

export default function ThemeSync({ image }: { image?: string | null }) {
  useEffect(() => {
    if (!image) return;

    let cancelled = false;

    (async () => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image as string;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
        });

        if (cancelled) return;

        const w = 64;
        const h = 64;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;

        const counts: Record<string, number> = {};
        let totalR = 0,
          totalG = 0,
          totalB = 0,
          total = 0;

        for (let i = 0; i < data.length; i += 16) {
          const r = data[i],
            g = data[i + 1],
            b = data[i + 2];
          totalR += r;
          totalG += g;
          totalB += b;
          total++;
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const key = [Math.round(r / 16) * 16, Math.round(g / 16) * 16, Math.round(b / 16) * 16].join(",");
          if (!counts[key]) counts[key] = 0;
          if (lum < 150) counts[key]++;
        }

        let r: number, g: number, b: number;
        let bestKey: string | null = null,
          bestCount = 0;
        for (const k in counts) {
          if (counts[k] > bestCount) {
            bestCount = counts[k];
            bestKey = k;
          }
        }
        if (bestKey) {
          [r, g, b] = bestKey.split(",").map(Number);
        } else {
          r = Math.round(totalR / total);
          g = Math.round(totalG / total);
          b = Math.round(totalB / total);
        }

        const root = document.documentElement.style;
        root.setProperty("--card-background", `rgba(${r}, ${g}, ${b}, 0.8)`);
        root.setProperty("--background-overlay", "rgba(0,0,0,0.2)");
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        root.setProperty("--card-text-color", brightness > 160 ? "#000000" : "#ffffff");
      } catch (e) {
        // ignore errors silently
        console.warn("ThemeSync failed to extract colors", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [image]);

  return null;
}
