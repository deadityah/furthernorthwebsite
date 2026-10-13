import React from "react";
import { heroContent } from "../content/site";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100vh-var(--header-h))] flex-col justify-between bg-paper px-6 pt-12 pb-8 md:px-12 md:pt-20 md:pb-12"
    >
      {/* Main hero copy container */}
      <div className="mx-auto w-full max-w-[1280px] my-auto">
        <div className="max-w-4xl">
          <h1
            id="hero-title"
            className="hero-h1-reveal font-display text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {heroContent.h1}
          </h1>

          <p
            className="hero-sub-reveal mt-8 max-w-[65ch] font-body text-base md:text-lg leading-relaxed text-slate"
          >
            {heroContent.sub}
          </p>

          <div className="hero-btn-reveal mt-10 flex flex-wrap items-center gap-6">
            <a
              href={heroContent.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            >
              {heroContent.primaryCta.label}
            </a>

            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center text-base font-medium text-ink transition-colors duration-150 hover:text-north-blue underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Hero bottom indicator */}
      <div className="mx-auto flex w-full max-w-[1280px] items-center pt-8">
        <span className="font-body text-xs md:text-sm text-slate">
          {heroContent.scrollIndicator}
        </span>
      </div>
    </section>
  );
};
