import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useReveal() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    // Enable js-motion only after mount so default is visible if JS fails
    document.documentElement.classList.add("js-motion");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const observeUnobserved = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
      elements.forEach((el) => observer.observe(el));
    };

    observeUnobserved();

    // Automatically observe any new elements with data-reveal added by state/route changes
    const mutationObserver = new MutationObserver(() => {
      observeUnobserved();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);
}
