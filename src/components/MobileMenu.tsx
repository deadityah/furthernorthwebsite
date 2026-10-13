import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../content/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeSection }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Focus trap & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus first focusable element initially
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-navigation-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-paper px-6 py-8 border-t border-frost transition-opacity duration-200 md:hidden overflow-y-auto"
      style={{ top: "var(--header-h)" }}
    >
      <nav className="mt-12 flex flex-col space-y-6">
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = isHome && activeSection === sectionId;
          const targetHref = isHome ? item.href : `/${item.href}`;

          if (item.isPill) {
            return isHome ? (
              <a
                key={item.label}
                href={targetHref}
                onClick={onClose}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={targetHref}
                onClick={onClose}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
              >
                {item.label}
              </Link>
            );
          }

          return isHome ? (
            <a
              key={item.label}
              href={targetHref}
              onClick={onClose}
              className={`flex items-center justify-between text-2xl font-semibold tracking-tight transition-colors duration-150 ${
                isActive ? "text-north-blue" : "text-ink hover:text-north-blue"
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-north-blue" aria-hidden="true">
                  <polygon points="5,0 10,10 0,10" />
                </svg>
              )}
            </a>
          ) : (
            <Link
              key={item.label}
              to={targetHref}
              onClick={onClose}
              className="flex items-center justify-between text-2xl font-semibold tracking-tight transition-colors duration-150 text-ink hover:text-north-blue"
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
