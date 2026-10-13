import React from "react";
import { aboutContent } from "../content/site";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-paper px-6 py-20 text-ink md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Title & Body with data-reveal */}
          <div className="lg:col-span-8" data-reveal>
            <h2
              id="about-title"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
            >
              {aboutContent.h2}
            </h2>
            <p className="mt-8 max-w-[65ch] font-body text-lg sm:text-xl leading-relaxed text-slate">
              {aboutContent.text}
            </p>
          </div>

          {/* Two Plain Facts with data-reveal */}
          <div className="lg:col-span-4 lg:pt-4" data-reveal style={{ transitionDelay: "150ms" }}>
            <div className="border-t border-frost pt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-slate">
                Firm details
              </span>
              <ul className="mt-4 space-y-4">
                {aboutContent.facts.map((fact) => (
                  <li
                    key={fact}
                    className="font-body text-base font-medium text-ink"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
