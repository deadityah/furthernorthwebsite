# 03 MOTION: Lean Motion (Version 2)

The first motion plan was too heavy and broke the site. This version keeps only a few safe animations.

## Rules

1. **No animation libraries.** Use plain CSS transitions/animations + one small `IntersectionObserver` hook + one scroll listener. Do NOT use GSAP, ScrollTrigger, Lenis, Framer Motion, or Three.js. If they are installed, uninstall them.
2. **Content is visible by default.** If JavaScript fails, the whole page must still be readable. Hidden start states are only applied when the `<html>` tag has the class `js-motion` (added by a small script after the page has mounted).
3. Animate only `transform` and `opacity`. Never animate layout.
4. Two speeds only: quick (150–250ms) for hover, click, tabs. Slow (700–900ms, `cubic-bezier(0.22, 1, 0.36, 1)`) for reveals.
5. Text must never stay hidden more than 1 second after it enters the screen.
6. Respect `prefers-reduced-motion: reduce`: no reveals, no ascent line movement (show it fully static or hide it), no number tween. Everything visible instantly.
7. Native scroll only. Use `scroll-behavior: smooth` in CSS and `scroll-margin-top` for the fixed header. No smooth scroll library.

## The 4 motions to build (only these)

### 1. Hero load reveal (once, on page load)
- H1: each line fades in and rises 16px. Duration 800ms, stagger 90ms.
- Sub text: fades in after the H1, 700ms, delay 350ms.
- Buttons: fade in after the sub text, 600ms, delay 550ms.
- Total finished in under 1.5s. The header is visible immediately (no delay).
- Pure CSS animation with `animation-delay`. No JavaScript needed for this one.

### 2. Scroll fade-in (once per element)
- A hook `useReveal` using `IntersectionObserver` (threshold 0.15, rootMargin `0px 0px -8% 0px`).
- Elements with `data-reveal` start at opacity 0 and translateY 14px (only when `html.js-motion`), and get class `is-visible` once on entering. Transition 800ms. Stop observing after it shows.
- Apply to: each section H2, intro paragraphs, the three offers (stagger 120ms between them), the 5 product rows (stagger 80ms), process steps, roadmap levels, about text, estimator panel, contact block.
- Do NOT apply to the hero (it has its own reveal), the header, or the footer.

### 3. Ascent line (scroll progress)
- Desktop (900px and wider): a fixed vertical line on the left edge (x = 20px). It runs from the bottom to the top of the viewport. The filled part grows from the bottom as the page scrolls, with a small North Blue arrowhead at the top end of the fill.
- Mobile: a 3px North Blue bar fixed at the very top, growing left to right.
- Implementation: one `scroll` listener (passive) with `requestAnimationFrame` throttle. Compute progress = scrollY / (docHeight - viewportHeight). Update one CSS variable `--progress` on the element. Use `transform: scaleY()` / `scaleX()`, not height/width.
- Line color: Ink over Paper sections, Paper over dark sections. Simple way: use `mix-blend-mode: difference` with a Paper-colored line, or switch a class by checking which section is at 50% viewport height. Choose the simpler and more reliable one. If neither works well, keep the line Ink with a thin Paper outline so it is visible on both.
- `pointer-events: none`, `aria-hidden="true"`. Must never cover content or block clicks.

### 4. Small interactions (quick)
- Nav hover: color change 150ms. Active section has the small North Blue arrowhead above the label (static, no sliding).
- Buttons: 150ms background/transform change on hover (translateY -1px at most).
- Products tabs: when switching, the dashboard fades out 120ms and fades in 200ms. Bars grow from zero with a CSS transition (500ms) on first show of a tab.
- Estimator: the result number tweens smoothly to the new value (300ms) using `requestAnimationFrame`. Reduced motion: instant.
- Contact: `Copy email` shows the toast (slides up 200ms, hides after 2s). Form: success message fades in.
- Mobile menu: opens with a 200ms fade.

## Parked ideas (DO NOT build now)

These were in the old plan. Do not build them unless I ask by name later:
- Intro / preloader
- Hero arrow field (canvas)
- Smooth scroll (Lenis)
- Pinned process section, scroll-drawn roadmap path
- Custom cursor, magnetic button
- Rolling nav letters, sliding nav arrowhead
- Word-by-word text scrub
- Animated SVG illustrations in Services toggle and Process

## Performance

- Total JS gzipped under 150KB.
- No layout shift. No horizontal scrollbar.
- Remove all listeners on unmount.
