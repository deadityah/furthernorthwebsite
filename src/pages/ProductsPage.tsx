import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products, getStatusLabel, installGuide, ProductStatus } from "../content/products";
import { usePageMeta } from "../hooks/usePageMeta";

type FilterType = "all" | ProductStatus;

const filterOptions: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "testing", label: "In testing" },
  { id: "in-development", label: "In development" },
];

export const ProductsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const navigate = useNavigate();

  usePageMeta(
    "Products and downloads | FurtherNorth",
    "Every app we ship is here. Read what it does, then download it.",
    "https://furthernorth.in/products/"
  );

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "all") return true;
    return p.status === activeFilter;
  });

  const handleAskAbout = (productName: string) => {
    navigate("/#contact", {
      state: {
        service: "Business dashboard",
        message: `I am interested in ${productName}.`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Top block */}
        <section className="border-b border-frost pt-12 pb-12 md:pt-20 md:pb-16" aria-labelledby="page-title">
          <div className="max-w-3xl">
            <h1
              id="page-title"
              className="hero-h1-reveal font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
            >
              Products and downloads
            </h1>
            <p className="hero-sub-reveal mt-4 font-body text-lg leading-relaxed text-slate">
              Every app we ship is here. Read what it does, then download it.
            </p>
          </div>

          {/* Simple status filter */}
          <div
            role="group"
            aria-label="Filter products by status"
            className="hero-btn-reveal mt-8 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveFilter(opt.id)}
                  aria-pressed={isActive}
                  className={`group relative inline-flex h-[44px] items-center text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2 ${
                    isActive ? "text-ink font-semibold" : "text-slate hover:text-ink"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 flex transition-opacity duration-150 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <polygon points="3.5,0 7,5 0,5" fill="#2340FF" />
                    </svg>
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* How to install block */}
        <section
          className="border-b border-frost py-10 md:py-12"
          aria-labelledby="install-guide-heading"
          data-reveal
        >
          <h2
            id="install-guide-heading"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            {installGuide.title}
          </h2>
          <ol className="mt-4 list-decimal list-inside space-y-2 font-body text-sm text-slate">
            {installGuide.steps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 font-body text-xs text-slate leading-relaxed">
            {installGuide.windowsWarningNote}
          </p>
        </section>

        {/* Products rows list (no data-reveal on dynamic rows to avoid filter opacity bugs) */}
        {filteredProducts.length > 0 ? (
          <div className="divide-y divide-frost border-b border-frost">
            {filteredProducts.map((product) => {
              const isAvailableWithDownload =
                product.status === "available" && Boolean(product.downloadUrl);
              const defaultPlatform = product.platforms[0] || "Windows";

              const facts: { label: string; value: string }[] = [];
              if (product.version) facts.push({ label: "Version", value: product.version });
              if (product.platforms && product.platforms.length > 0)
                facts.push({ label: "Platforms", value: product.platforms.join(", ") });
              if (product.fileSize) facts.push({ label: "File size", value: product.fileSize });
              if (product.updated) facts.push({ label: "Updated", value: product.updated });

              return (
                <article
                  key={product.id}
                  className="py-12 md:py-16 transition-opacity duration-150"
                  aria-labelledby={`product-heading-${product.id}`}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left zone (about 25%): name, tagline, status pill */}
                    <div className="lg:col-span-3 flex flex-col items-start">
                      <h2
                        id={`product-heading-${product.id}`}
                        className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink"
                      >
                        {product.name}
                      </h2>
                      <p className="mt-2 font-body text-sm sm:text-base text-slate leading-relaxed">
                        {product.tagline}
                      </p>
                      <div className="mt-4">
                        {product.status === "available" ? (
                          <span className="inline-flex items-center rounded-full bg-north-blue px-3 py-1 font-body text-xs font-medium text-paper">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-frost px-3 py-1 font-body text-xs font-medium text-ink">
                            {getStatusLabel(product.status)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle zone (about 45%): screenshot (if given), description, features */}
                    <div className="lg:col-span-5 flex flex-col">
                      {product.screenshot && (
                        <div className="mb-6 overflow-hidden rounded-[2px] border border-frost bg-paper">
                          <img
                            src={product.screenshot}
                            alt={`${product.name} screenshot`}
                            className="w-full object-cover"
                          />
                        </div>
                      )}
                      <p className="font-body text-base leading-relaxed text-ink">
                        {product.description}
                      </p>
                      <ul className="mt-6 space-y-2.5 font-body text-sm text-slate">
                        {product.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate"
                              aria-hidden="true"
                            />
                            <span className="leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right zone (about 30%): facts list, action button */}
                    <div className="lg:col-span-4 flex flex-col justify-between pt-2 lg:pt-0">
                      {facts.length > 0 && (
                        <dl className="space-y-3 font-body text-sm">
                          {facts.map((fact) => (
                            <div
                              key={fact.label}
                              className="flex justify-between border-b border-frost/60 pb-2"
                            >
                              <dt className="text-slate">{fact.label}</dt>
                              <dd className="font-medium text-ink">{fact.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <div className={facts.length > 0 ? "mt-8" : ""}>
                        {isAvailableWithDownload ? (
                          <div>
                            {product.downloadUrl!.startsWith("/") ? (
                              <a
                                href={product.downloadUrl}
                                download
                                className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                              >
                                Download for {defaultPlatform}
                              </a>
                            ) : (
                              <a
                                href={product.downloadUrl}
                                className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                              >
                                Download for {defaultPlatform}
                              </a>
                            )}
                            <p className="mt-2 font-mono text-xs text-slate">
                              {product.fileSize ? `.zip, ${product.fileSize}` : ".zip"}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <button
                              type="button"
                              onClick={() => handleAskAbout(product.name)}
                              className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full border border-frost bg-paper px-6 text-sm font-medium text-ink transition-all duration-150 hover:-translate-y-[1px] hover:border-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                            >
                              Ask about {product.name}
                            </button>
                          </div>
                        )}

                        {product.installNote && (
                          <p className="mt-2 font-body text-xs text-slate">
                            {product.installNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty filter result */
          <div className="py-24 text-center">
            <p className="font-body text-lg text-slate">Nothing here yet. Check back soon.</p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-4 font-body text-sm font-medium text-north-blue hover:underline focus-visible:outline-2 focus-visible:outline-north-blue"
            >
              See all products
            </button>
          </div>
        )}

        {/* Bottom block */}
        <section className="py-16 text-center" data-reveal aria-labelledby="custom-need-heading">
          <h2
            id="custom-need-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink"
          >
            Need something that is not here?
          </h2>
          <div className="mt-6">
            <Link
              to="/#contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            >
              Tell us what you need
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
