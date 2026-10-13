import React, { useLayoutEffect, useRef, useState } from "react";
import { roadmapContent } from "../content/site";

interface PathPoints {
  f1: { x: number; y: number };
  f2: { x: number; y: number };
  f3: { x: number; y: number };
  end: { x: number; y: number };
  angle: number;
}

const DESKTOP_PATH_D =
  "M 60 360 C 260 360, 340 210, 500 210 C 660 210, 740 70, 840 70 C 890 70, 930 50, 960 35";

const MOBILE_PATH_D = "M 24 30 L 24 580";

export const Roadmap: React.FC = () => {
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  // Initial exact viewBox coordinates so circles & text render immediately
  const [desktopPoints, setDesktopPoints] = useState<PathPoints>({
    f1: { x: 156, y: 348 },
    f2: { x: 514, y: 210 },
    f3: { x: 869, y: 68 },
    end: { x: 960, y: 35 },
    angle: -27,
  });

  const [mobilePoints, setMobilePoints] = useState<PathPoints>({
    f1: { x: 24, y: 85 },
    f2: { x: 24, y: 305 },
    f3: { x: 24, y: 525 },
    end: { x: 24, y: 580 },
    angle: 90,
  });

  useLayoutEffect(() => {
    const updatePoints = () => {
      if (desktopPathRef.current) {
        const p = desktopPathRef.current;
        const len = p.getTotalLength();
        if (len > 0) {
          const f1 = p.getPointAtLength(len * 0.1);
          const f2 = p.getPointAtLength(len * 0.5);
          const f3 = p.getPointAtLength(len * 0.9);
          const end = p.getPointAtLength(len);
          const prev = p.getPointAtLength(Math.max(0, len - 2));
          const angle = (Math.atan2(end.y - prev.y, end.x - prev.x) * 180) / Math.PI;
          setDesktopPoints({
            f1: { x: f1.x, y: f1.y },
            f2: { x: f2.x, y: f2.y },
            f3: { x: f3.x, y: f3.y },
            end: { x: end.x, y: end.y },
            angle,
          });
        }
      }

      if (mobilePathRef.current) {
        const p = mobilePathRef.current;
        const len = p.getTotalLength();
        if (len > 0) {
          const f1 = p.getPointAtLength(len * 0.1);
          const f2 = p.getPointAtLength(len * 0.5);
          const f3 = p.getPointAtLength(len * 0.9);
          const end = p.getPointAtLength(len);
          const prev = p.getPointAtLength(Math.max(0, len - 2));
          const angle = (Math.atan2(end.y - prev.y, end.x - prev.x) * 180) / Math.PI;
          setMobilePoints({
            f1: { x: f1.x, y: f1.y },
            f2: { x: f2.x, y: f2.y },
            f3: { x: f3.x, y: f3.y },
            end: { x: end.x, y: end.y },
            angle,
          });
        }
      }
    };

    updatePoints();
    window.addEventListener("resize", updatePoints, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePoints);
    };
  }, []);

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="bg-ink px-6 py-20 text-paper md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header with data-reveal */}
        <div className="max-w-3xl" data-reveal>
          <h2
            id="roadmap-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-paper"
          >
            {roadmapContent.h2}
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-slate">
            {roadmapContent.intro}
          </p>
        </div>

        {/* Diagonal Climbing Ascent Layout */}
        <div className="relative mt-20" data-reveal>
          {/* ========================================================
              DESKTOP LAYOUT (>= 900px): Unified SVG & HTML Wrapper
             ======================================================== */}
          <div
            className="relative hidden w-full min-[900px]:block"
            style={{ aspectRatio: "1000 / 600" }}
          >
            {/* Unified SVG containing curve, dots, and arrowhead */}
            <svg
              viewBox="0 0 1000 600"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Curve */}
              <path
                ref={desktopPathRef}
                d={DESKTOP_PATH_D}
                stroke="#2340FF"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.6"
                fill="none"
              />

              {/* Dot 1 (Now) */}
              <g id="desktop-dot-1">
                <circle
                  cx={desktopPoints.f1.x}
                  cy={desktopPoints.f1.y}
                  r="10"
                  fill="#0E1116"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={desktopPoints.f1.x} cy={desktopPoints.f1.y} r="4" fill="#2340FF" />
              </g>

              {/* Dot 2 (Next) */}
              <g id="desktop-dot-2">
                <circle
                  cx={desktopPoints.f2.x}
                  cy={desktopPoints.f2.y}
                  r="10"
                  fill="#0E1116"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={desktopPoints.f2.x} cy={desktopPoints.f2.y} r="4" fill="#2340FF" />
              </g>

              {/* Dot 3 (Further north) */}
              <g id="desktop-dot-3">
                <circle
                  cx={desktopPoints.f3.x}
                  cy={desktopPoints.f3.y}
                  r="10"
                  fill="#2340FF"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={desktopPoints.f3.x} cy={desktopPoints.f3.y} r="4" fill="#F1F0EB" />
              </g>

              {/* Rotated Arrowhead at end */}
              <polygon
                points="0,0 -12,-6 -12,6"
                transform={`translate(${desktopPoints.end.x}, ${desktopPoints.end.y}) rotate(${desktopPoints.angle})`}
                fill="#2340FF"
              />
            </svg>

            {/* HTML Level Cards positioned using the same viewBox percentage coordinates */}
            {/* Level 1: Now */}
            <div
              className="absolute w-[29%]"
              style={{
                left: `${(desktopPoints.f1.x / 1000) * 100}%`,
                top: `calc(${(desktopPoints.f1.y / 600) * 100}% + 20px)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="rounded-[2px] border border-white/10 bg-white/[0.02] p-5 lg:p-7">
                <span className="font-mono text-xs uppercase tracking-wider text-north-blue">
                  Phase 01
                </span>
                <h3 className="mt-2 font-display text-xl lg:text-2xl font-semibold text-paper">
                  {roadmapContent.levels[0].level}
                </h3>
                <p className="mt-3 font-body text-xs lg:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[0].text}
                </p>
              </div>
            </div>

            {/* Level 2: Next */}
            <div
              className="absolute w-[29%]"
              style={{
                left: `${(desktopPoints.f2.x / 1000) * 100}%`,
                top: `calc(${(desktopPoints.f2.y / 600) * 100}% + 20px)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="rounded-[2px] border border-white/10 bg-white/[0.02] p-5 lg:p-7">
                <span className="font-mono text-xs uppercase tracking-wider text-slate">
                  Phase 02
                </span>
                <h3 className="mt-2 font-display text-xl lg:text-2xl font-semibold text-paper">
                  {roadmapContent.levels[1].level}
                </h3>
                <p className="mt-3 font-body text-xs lg:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[1].text}
                </p>
              </div>
            </div>

            {/* Level 3: Further north */}
            <div
              className="absolute w-[29%]"
              style={{
                left: `${(desktopPoints.f3.x / 1000) * 100}%`,
                top: `calc(${(desktopPoints.f3.y / 600) * 100}% + 20px)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="rounded-[2px] border border-north-blue/40 bg-white/[0.03] p-5 lg:p-7">
                <span className="font-mono text-xs uppercase tracking-wider text-north-blue">
                  Long-term Vision
                </span>
                <h3 className="mt-2 font-display text-xl lg:text-2xl font-semibold text-paper">
                  {roadmapContent.levels[2].level}
                </h3>
                <p className="mt-3 font-body text-xs lg:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[2].text}
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              MOBILE LAYOUT (< 900px): Vertical SVG & HTML Wrapper
             ======================================================== */}
          <div
            className="relative block w-full min-[900px]:hidden"
            style={{ aspectRatio: "360 / 620" }}
          >
            {/* Unified SVG containing vertical line, dots, and arrowhead */}
            <svg
              viewBox="0 0 360 620"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                ref={mobilePathRef}
                d={MOBILE_PATH_D}
                stroke="#2340FF"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.6"
                fill="none"
              />

              {/* Dot 1 */}
              <g id="mobile-dot-1">
                <circle
                  cx={mobilePoints.f1.x}
                  cy={mobilePoints.f1.y}
                  r="9"
                  fill="#0E1116"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={mobilePoints.f1.x} cy={mobilePoints.f1.y} r="3.5" fill="#2340FF" />
              </g>

              {/* Dot 2 */}
              <g id="mobile-dot-2">
                <circle
                  cx={mobilePoints.f2.x}
                  cy={mobilePoints.f2.y}
                  r="9"
                  fill="#0E1116"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={mobilePoints.f2.x} cy={mobilePoints.f2.y} r="3.5" fill="#2340FF" />
              </g>

              {/* Dot 3 */}
              <g id="mobile-dot-3">
                <circle
                  cx={mobilePoints.f3.x}
                  cy={mobilePoints.f3.y}
                  r="9"
                  fill="#2340FF"
                  stroke="#2340FF"
                  strokeWidth="2"
                />
                <circle cx={mobilePoints.f3.x} cy={mobilePoints.f3.y} r="3.5" fill="#F1F0EB" />
              </g>

              {/* Rotated Arrowhead at end */}
              <polygon
                points="0,0 -10,-5 -10,5"
                transform={`translate(${mobilePoints.end.x}, ${mobilePoints.end.y}) rotate(${mobilePoints.angle})`}
                fill="#2340FF"
              />
            </svg>

            {/* Level 1: Now */}
            <div
              className="absolute w-[80%]"
              style={{
                left: "14%",
                top: `calc(${(mobilePoints.f1.y / 620) * 100}% - 14px)`,
              }}
            >
              <div className="rounded-[2px] border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-north-blue">
                  Phase 01
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                  {roadmapContent.levels[0].level}
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[0].text}
                </p>
              </div>
            </div>

            {/* Level 2: Next */}
            <div
              className="absolute w-[80%]"
              style={{
                left: "14%",
                top: `calc(${(mobilePoints.f2.y / 620) * 100}% - 14px)`,
              }}
            >
              <div className="rounded-[2px] border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-slate">
                  Phase 02
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                  {roadmapContent.levels[1].level}
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[1].text}
                </p>
              </div>
            </div>

            {/* Level 3: Further north */}
            <div
              className="absolute w-[80%]"
              style={{
                left: "14%",
                top: `calc(${(mobilePoints.f3.y / 620) * 100}% - 14px)`,
              }}
            >
              <div className="rounded-[2px] border border-north-blue/40 bg-white/[0.03] p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-north-blue">
                  Long-term Vision
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                  {roadmapContent.levels[2].level}
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-slate">
                  {roadmapContent.levels[2].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
