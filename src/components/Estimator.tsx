import React, { useState, useEffect, useRef } from "react";
import { estimatorContent } from "../content/site";

export const Estimator: React.FC = () => {
  const [people, setPeople] = useState<number>(estimatorContent.defaults.people);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(estimatorContent.defaults.hoursPerWeek);
  const [percent, setPercent] = useState<number>(estimatorContent.defaults.percent);

  // Exact formula: people × hours per week × 52 × (percent / 100)
  const targetHours = Math.round(people * hoursPerWeek * 52 * (percent / 100));
  const [displayedHours, setDisplayedHours] = useState<number>(targetHours);
  const rafRef = useRef<number | null>(null);

  // 300ms smooth tween using requestAnimationFrame
  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setDisplayedHours(targetHours);
      return;
    }

    const startVal = displayedHours;
    const targetVal = targetHours;
    const duration = 300;
    const startTime = performance.now();

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutQuad
      const ease = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(startVal + (targetVal - startVal) * ease);
      setDisplayedHours(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetHours]);

  const daysSaved = Math.round(displayedHours / 8);

  const peopleFill = ((people - 1) / (30 - 1)) * 100;
  const hoursFill = ((hoursPerWeek - 1) / (40 - 1)) * 100;
  const percentFill = ((percent - 20) / (70 - 20)) * 100;

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-title"
      className="bg-frost px-6 py-20 text-ink md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header with data-reveal */}
        <div className="max-w-3xl" data-reveal>
          <h2
            id="estimator-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
          >
            {estimatorContent.h2}
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-slate">
            {estimatorContent.intro}
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sliders Input Column with data-reveal */}
          <div className="space-y-8 lg:col-span-7" data-reveal>
            {/* Slider 1: People */}
            <div className="rounded-[2px] bg-paper/80 p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <label htmlFor="people-slider" className="font-body text-sm sm:text-base font-medium text-ink">
                  People who do manual work (stock, billing, registers, reports)
                </label>
                <span className="ml-4 font-mono text-2xl font-bold text-ink min-w-[3ch] text-right">
                  {people}
                </span>
              </div>
              <div className="mt-4">
                <input
                  id="people-slider"
                  type="range"
                  min="1"
                  max="30"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #2340FF ${peopleFill}%, rgba(14,17,22,0.15) ${peopleFill}%)`,
                  }}
                  className="h-2 w-full appearance-none rounded-lg cursor-pointer accent-ink focus-visible:outline-2 focus-visible:outline-north-blue"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-xs text-slate">
                <span>1 person</span>
                <span>30 people</span>
              </div>
            </div>

            {/* Slider 2: Hours Per Week */}
            <div className="rounded-[2px] bg-paper/80 p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <label htmlFor="hours-slider" className="font-body text-sm sm:text-base font-medium text-ink">
                  Hours each person spends on it per week
                </label>
                <span className="ml-4 font-mono text-2xl font-bold text-ink min-w-[4ch] text-right">
                  {hoursPerWeek}h
                </span>
              </div>
              <div className="mt-4">
                <input
                  id="hours-slider"
                  type="range"
                  min="1"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #2340FF ${hoursFill}%, rgba(14,17,22,0.15) ${hoursFill}%)`,
                  }}
                  className="h-2 w-full appearance-none rounded-lg cursor-pointer accent-ink focus-visible:outline-2 focus-visible:outline-north-blue"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-xs text-slate">
                <span>1 hour</span>
                <span>40 hours</span>
              </div>
            </div>

            {/* Slider 3: Automation Percentage */}
            <div className="rounded-[2px] bg-paper/80 p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <label htmlFor="percent-slider" className="font-body text-sm sm:text-base font-medium text-ink">
                  How much of it could software handle?
                </label>
                <span className="ml-4 font-mono text-2xl font-bold text-ink min-w-[4ch] text-right">
                  {percent}%
                </span>
              </div>
              <div className="mt-4">
                <input
                  id="percent-slider"
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #2340FF ${percentFill}%, rgba(14,17,22,0.15) ${percentFill}%)`,
                  }}
                  className="h-2 w-full appearance-none rounded-lg cursor-pointer accent-ink focus-visible:outline-2 focus-visible:outline-north-blue"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-xs text-slate">
                <span>20% (light)</span>
                <span>70% (high)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box Column with data-reveal */}
          <div className="lg:col-span-5" data-reveal style={{ transitionDelay: "150ms" }}>
            <div className="rounded-[2px] border border-black/10 bg-paper p-8 sm:p-10 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-slate">
                Estimated Result
              </span>

              <div className="mt-6">
                <span className="font-body text-base text-slate">About</span>
                <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink">
                  {displayedHours.toLocaleString()}
                </div>
                <span className="font-display text-xl sm:text-2xl font-semibold text-ink">
                  hours saved each year
                </span>
              </div>

              {/* Working days conversion */}
              <div className="mt-4 border-t border-frost pt-4">
                <p className="font-body text-base font-medium text-slate">
                  That is about <span className="font-mono text-ink font-bold">{daysSaved}</span> full working days.
                </p>
                <p className="mt-1 font-body text-xs text-slate">
                  (Based on standard 8-hour working days)
                </p>
              </div>

              {/* Horizontal fill progress bar */}
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-frost">
                <div
                  className="h-full bg-north-blue transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((displayedHours / 3000) * 100))}%` }}
                />
              </div>

              {/* Footnote */}
              <p className="mt-6 font-body text-xs text-slate italic">
                {estimatorContent.footnote}
              </p>

              {/* CTA button */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                >
                  {estimatorContent.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
