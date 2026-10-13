import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../content/site";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: isReduced ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-paper px-6 md:px-12 transition-all duration-150 ${
          scrolled ? "border-b border-frost" : "border-b border-transparent"
        }`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between">
          {/* Logo link to / */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
            style={{
              marginLeft: "var(--logo-negative-ml)",
            }}
          >
            <picture className="flex items-center">
              <source srcSet="/brand/furthernorth-logo.webp" type="image/webp" />
              <img
                src="/brand/furthernorth-logo.png"
                alt="FurtherNorth"
                width="990"
                height="408"
                style={{
                  height: "var(--logo-h)",
                  width: "auto",
                }}
                className="block object-contain"
              />
            </picture>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-8 min-[900px]:flex"
          >
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = isHome && activeSection === sectionId;
              const targetHref = isHome ? item.href : `/${item.href}`;

              if (item.isPill) {
                return isHome ? (
                  <a
                    key={item.label}
                    href={targetHref}
                    className="relative inline-flex h-[44px] items-center justify-center rounded-full bg-ink px-6 text-sm font-medium leading-none text-paper transition-colors duration-150 hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={targetHref}
                    className="relative inline-flex h-[44px] items-center justify-center rounded-full bg-ink px-6 text-sm font-medium leading-none text-paper transition-colors duration-150 hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </Link>
                );
              }

              return isHome ? (
                <a
                  key={item.label}
                  href={targetHref}
                  className={`group relative inline-flex h-[44px] items-center justify-center text-sm font-medium leading-none transition-colors duration-150 ${
                    isActive ? "text-ink" : "text-slate hover:text-ink"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 flex transition-opacity duration-150 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <polygon points="3.5,0 7,5 0,5" fill="#2340FF" />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={targetHref}
                  className="group relative inline-flex h-[44px] items-center justify-center text-sm font-medium leading-none transition-colors duration-150 text-slate hover:text-ink"
                >
                  <span
                    className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 flex transition-opacity duration-150 opacity-0"
                    aria-hidden="true"
                  >
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <polygon points="3.5,0 7,5 0,5" fill="#2340FF" />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-[44px] w-[44px] items-center justify-center rounded text-ink transition-colors duration-150 hover:text-north-blue min-[900px]:hidden focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={handleCloseMenu}
        activeSection={activeSection}
      />
    </>
  );
};
