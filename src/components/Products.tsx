import React from "react";
import { Link } from "react-router-dom";
import { productsContent, isFilled } from "../content/site";
import { ProductsDemoFrame } from "./ProductsDemoFrame";

interface ProductsProps {
  onAskAboutDashboard?: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onAskAboutDashboard }) => {
  const handleAskClick = () => {
    if (onAskAboutDashboard) {
      onAskAboutDashboard();
    }
  };

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="bg-ink px-6 py-20 text-paper md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header with data-reveal */}
        <div className="max-w-3xl" data-reveal>
          <h2
            id="products-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-paper"
          >
            {productsContent.h2}
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-slate">
            {productsContent.intro}
          </p>
        </div>

        {/* Interactive Demo Frame */}
        <ProductsDemoFrame />

        {/* Under-demo label */}
        <p className="mt-3 font-mono text-xs text-slate">
          {productsContent.demoNote}
        </p>

        {/* 5 Product Rows with data-reveal stagger & hover shift */}
        <div className="mt-20">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {productsContent.productsList.map((product, idx) => (
              <div
                key={product.name}
                data-reveal
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="group flex flex-col justify-between py-5 transition-transform duration-150 hover:translate-x-3 sm:flex-row sm:items-center cursor-default"
              >
                <div className="sm:w-1/3">
                  <h3 className="font-display text-xl font-semibold text-paper">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-1 sm:mt-0 sm:w-1/2">
                  <p className="font-body text-sm text-slate">
                    {product.description}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:w-1/6 sm:text-right">
                  <span className="font-mono text-xs text-slate transition-colors duration-150 group-hover:text-north-blue">
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Line & CTA */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-reveal>
            <p className="font-body text-base text-slate">
              {productsContent.closing.text}
            </p>
            <a
              href={productsContent.closing.targetHref}
              onClick={handleAskClick}
              className="inline-flex h-11 items-center justify-center rounded-full bg-paper px-6 text-sm font-medium text-ink transition-all duration-150 hover:-translate-y-[1px] hover:bg-frost focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            >
              {productsContent.closing.ctaLabel}
            </a>
          </div>
        </div>

        {/* AI Projects block */}
        <div className="mt-24 rounded-[2px] border border-white/10 bg-white/[0.02] p-8" data-reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-slate">
            AI projects we have built
          </span>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {productsContent.aiProjects.map((project) => {
              const hasLink = isFilled(project.link);

              return (
                <div key={project.name} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-display text-lg font-semibold text-paper">
                        {project.name}
                      </h4>
                      <span className="font-mono text-xs text-slate">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-2 font-body text-sm text-slate">
                      {project.description}
                    </p>
                  </div>
                  {hasLink && (
                    <div className="mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-north-blue hover:underline focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                      >
                        Visit {project.name}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Link to all products & downloads */}
        <div className="mt-16 text-center" data-reveal>
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 text-sm font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
          >
            See all products and downloads
          </Link>
        </div>
      </div>
    </section>
  );
};
