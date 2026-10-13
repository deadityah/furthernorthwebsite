import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConstants, footerContent, isFilled } from "../content/site";

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hasEmail = isFilled(siteConstants.email);
  const hasLinkedIn = isFilled(siteConstants.linkedin);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: isReduced ? "auto" : "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      handleBackToTop(e);
    }
  };

  return (
    <footer className="border-t border-frost bg-paper px-6 py-16 text-ink md:px-12 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          {/* Logo & Direct Links */}
          <div className="space-y-6">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="inline-block -ml-[7.06px] sm:-ml-[8.24px] focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            >
              <picture className="flex items-center">
                <source srcSet="/brand/furthernorth-logo.webp" type="image/webp" />
                <img
                  src="/brand/furthernorth-logo.png"
                  alt="FurtherNorth"
                  width="990"
                  height="408"
                  loading="lazy"
                  className="h-12 sm:h-14 w-auto object-contain block"
                />
              </picture>
            </Link>
            <div className="font-body text-base text-slate space-y-1">
              <p>
                <a
                  href={siteConstants.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-north-blue transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue"
                >
                  Instagram ({siteConstants.instagramHandle})
                </a>
              </p>
              {hasEmail && (
                <p>
                  <a
                    href={`mailto:${siteConstants.email}`}
                    className="text-ink hover:text-north-blue transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue"
                  >
                    {siteConstants.email}
                  </a>
                </p>
              )}
              {hasLinkedIn && (
                <p>
                  <a
                    href={siteConstants.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-north-blue transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-end">
            <button
              type="button"
              onClick={handleBackToTop}
              className="font-body text-sm font-medium text-ink hover:text-north-blue transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue"
            >
              {footerContent.backToTop}
            </button>
            <p className="font-mono text-xs text-slate">
              {footerContent.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
