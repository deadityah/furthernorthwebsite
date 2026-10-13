import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (location.hash) {
      const id = location.hash.replace("#", "");
      let attempts = 0;
      let frameId: number;

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue("--header-h") || "76",
            10
          );
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: isReduced ? "auto" : "smooth",
          });
        } else if (attempts < 25) {
          attempts++;
          frameId = requestAnimationFrame(scrollToElement);
        }
      };

      frameId = requestAnimationFrame(scrollToElement);

      return () => {
        cancelAnimationFrame(frameId);
      };
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: isReduced ? "auto" : "instant",
      });
    }
  }, [location.pathname, location.hash]);

  return null;
}
