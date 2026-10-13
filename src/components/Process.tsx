import React from "react";
import { processContent } from "../content/site";

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="bg-paper px-6 py-20 text-ink md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header with data-reveal */}
        <div className="max-w-3xl" data-reveal>
          <h2
            id="process-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
          >
            {processContent.h2}
          </h2>
        </div>

        {/* 4 Steps Stacked Layout with data-reveal stagger */}
        <div className="mt-16 divide-y divide-frost border-y border-frost">
          {processContent.steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              data-reveal
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="grid grid-cols-1 items-start gap-6 py-10 sm:grid-cols-12 lg:gap-8"
            >
              {/* Step Number */}
              <div className="sm:col-span-2">
                <span className="font-mono text-2xl font-bold text-slate">
                  0{step.stepNumber}
                </span>
              </div>

              {/* Step Content */}
              <div className="sm:col-span-8">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[65ch] font-body text-base sm:text-lg leading-relaxed text-slate">
                  {step.text}
                </p>
              </div>

              {/* Simple Step Graphic */}
              <div className="hidden sm:col-span-2 sm:flex sm:justify-end" aria-hidden="true">
                {step.stepNumber === "1" && (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate/60">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )}
                {step.stepNumber === "2" && (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate/60">
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="15" width="6" height="6" rx="1" />
                    <path d="M9 6h6v9" />
                  </svg>
                )}
                {step.stepNumber === "3" && (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate/60">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                )}
                {step.stepNumber === "4" && (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate/60">
                    <polyline points="16 7 12 3 8 7" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
