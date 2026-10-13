import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const AscentLine: React.FC = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;

    const updateLine = () => {
      const container = containerRef.current;
      if (!container) return;

      const trackHeight = container.clientHeight;
      if (trackHeight <= 0) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      const fillPx = progress * trackHeight;

      // Update desktop fill line and arrow tip using transforms in same frame
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }

      if (arrowRef.current) {
        // Arrow tip at y = 0 of SVG; translate tip to top of fill line: trackHeight - fillPx
        // Transform changes only Y; horizontal centering is handled by the wrapper axis
        arrowRef.current.style.transform = `translate3d(0, ${trackHeight - fillPx}px, 0)`;
      }

      // Update mobile top bar in same frame
      if (mobileBarRef.current) {
        mobileBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Check if mid-viewport is over a dark section on home page
      const isHome = location.pathname === "/";
      let overDark = false;

      if (isHome) {
        const midY = window.innerHeight * 0.5;
        const productsRect = document.getElementById("products")?.getBoundingClientRect();
        const roadmapRect = document.getElementById("roadmap")?.getBoundingClientRect();

        overDark = Boolean(
          (productsRect && productsRect.top <= midY && productsRect.bottom >= midY) ||
          (roadmapRect && roadmapRect.top <= midY && roadmapRect.bottom >= midY)
        );
      }

      if (overDark !== isDarkRef.current) {
        isDarkRef.current = overDark;
        setIsDark(overDark);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateLine();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Run immediately on mount / route change
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Top Progress Bar (< 900px) */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[3px] min-[900px]:hidden"
        aria-hidden="true"
      >
        <div
          ref={mobileBarRef}
          className="h-full w-full bg-north-blue origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Desktop Vertical Ascent Line (>= 900px) */}
      {/* 16px wrapper centered at x = 20px (left: 12px, width: 16px) */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed top-[var(--header-h)] bottom-10 left-[12px] z-30 hidden w-[16px] min-[900px]:block"
        aria-hidden="true"
      >
        {/* Track line - centered in wrapper */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="h-full w-[1px] bg-frost/50" />
        </div>

        {/* Filled line scaling from bottom - centered in wrapper - NO CSS TRANSITION */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div
            ref={fillRef}
            className={`h-full w-[1.5px] origin-bottom will-change-transform ${
              isDark ? "bg-paper" : "bg-ink"
            }`}
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* Climbing Arrowhead at tip - centered in wrapper - NO CSS TRANSITION */}
        <div
          ref={arrowRef}
          className="absolute top-0 left-0 w-full flex justify-center will-change-transform pointer-events-none"
          style={{ transform: "translate3d(0, 0px, 0)" }}
        >
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="block">
            <polygon points="4,0 8,6 0,6" fill="#2340FF" />
          </svg>
        </div>
      </div>
    </>
  );
};
