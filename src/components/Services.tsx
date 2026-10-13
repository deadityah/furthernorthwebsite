import React, { useState } from "react";
import { servicesContent } from "../content/site";

export const Services: React.FC = () => {
  const [activeToggle, setActiveToggle] = useState<"withAi" | "buildsAi">("withAi");

  const currentToggle = servicesContent.toggleStates[activeToggle];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-paper px-6 py-20 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header with data-reveal */}
        <div className="max-w-3xl" data-reveal>
          <h2
            id="services-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
          >
            {servicesContent.h2}
          </h2>
          <p className="mt-6 font-body text-lg text-slate leading-relaxed">
            {servicesContent.intro}
          </p>
        </div>

        {/* Interactive Two-State Toggle Box */}
        <div className="mt-12 rounded-[2px] border border-frost bg-paper p-6 sm:p-10 md:p-12" data-reveal>
          {/* Segmented Control Buttons */}
          <div
            role="group"
            aria-label="Ways we work with AI"
            className="inline-flex rounded-full border border-frost p-1"
          >
            <button
              type="button"
              aria-pressed={activeToggle === "withAi"}
              onClick={() => setActiveToggle("withAi")}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActiveToggle("buildsAi");
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2 ${
                activeToggle === "withAi"
                  ? "bg-ink text-paper"
                  : "bg-transparent text-slate hover:text-ink"
              }`}
            >
              {servicesContent.toggleStates.withAi.label}
            </button>
            <button
              type="button"
              aria-pressed={activeToggle === "buildsAi"}
              onClick={() => setActiveToggle("buildsAi")}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setActiveToggle("withAi");
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2 ${
                activeToggle === "buildsAi"
                  ? "bg-ink text-paper"
                  : "bg-transparent text-slate hover:text-ink"
              }`}
            >
              {servicesContent.toggleStates.buildsAi.label}
            </button>
          </div>

          {/* Toggle Content display */}
          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 transition-opacity duration-200">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                {currentToggle.title}
              </h3>
              <p className="mt-4 max-w-[65ch] font-body text-base sm:text-lg leading-relaxed text-slate">
                {currentToggle.text}
              </p>
            </div>

            {/* Directional SVG Graphic */}
            <div className="flex justify-start lg:col-span-4 lg:justify-end" aria-hidden="true">
              {activeToggle === "withAi" ? (
                // Arrow pointing into software window
                <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="text-ink">
                  <rect x="40" y="10" width="70" height="65" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="40" y1="24" x2="110" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="48" cy="17" r="2" fill="currentColor" fillOpacity="0.4" />
                  <circle cx="56" cy="17" r="2" fill="currentColor" fillOpacity="0.4" />
                  <line x1="48" y1="36" x2="90" y2="36" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="48" y1="46" x2="80" y2="46" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="48" y1="56" x2="96" y2="56" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                  <path d="M10 42.5H35M35 42.5L25 34.5M35 42.5L25 50.5" stroke="#2340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // Arrow pointing out from network nodes
                <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="text-ink">
                  <circle cx="25" cy="25" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="25" cy="65" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="50" cy="45" r="5" stroke="#2340FF" strokeWidth="1.5" fill="#2340FF" fillOpacity="0.1" />
                  <line x1="29" y1="27" x2="46" y2="42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="29" y1="63" x2="46" y2="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M55 45H105M105 45L95 37M105 45L95 53" stroke="#2340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Three Offers with Varied Sizes & data-reveal stagger */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 1. Business dashboards (Largest) */}
          <div
            data-reveal
            className="rounded-[2px] border border-frost bg-paper p-8 lg:col-span-12 xl:col-span-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                  {servicesContent.offers[0].title}
                </h3>
              </div>
              <p className="mt-4 max-w-[60ch] font-body text-base sm:text-lg leading-relaxed text-slate">
                {servicesContent.offers[0].text}
              </p>
            </div>
            <div className="mt-8 border-t border-frost/60 pt-4">
              <span className="font-mono text-xs text-slate">Desktop offline architecture</span>
            </div>
          </div>

          {/* 2. AI applications (Medium) */}
          <div
            data-reveal
            style={{ transitionDelay: "120ms" }}
            className="rounded-[2px] border border-frost bg-paper p-8 lg:col-span-7 xl:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                {servicesContent.offers[1].title}
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-slate">
                {servicesContent.offers[1].text}
              </p>
            </div>
            <div className="mt-8 border-t border-frost/60 pt-4">
              <span className="font-mono text-xs text-slate">RAG & Agent Workflows</span>
            </div>
          </div>

          {/* 3. AI models (Smallest, marked 'In research') */}
          <div
            data-reveal
            style={{ transitionDelay: "240ms" }}
            className="rounded-[2px] border border-frost bg-paper p-8 lg:col-span-5 xl:col-span-12 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {servicesContent.offers[2].title}
                </h3>
                <span className="inline-flex items-center rounded-full border border-slate/30 px-3 py-0.5 font-mono text-xs text-slate">
                  {servicesContent.offers[2].tag}
                </span>
              </div>
              <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-slate">
                {servicesContent.offers[2].text}
              </p>
            </div>
            <div className="mt-6 border-t border-frost/60 pt-4">
              <span className="font-mono text-xs text-slate">Small language model research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
