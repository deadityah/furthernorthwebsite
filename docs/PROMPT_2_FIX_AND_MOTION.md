# PROMPT 2: Fix the Site, Update Content, Add Lean Motion

Copy everything below the line into your AI coding agent. This works whether or not you already ran the old Prompt 2.

---

The FurtherNorth site (furthernorth.in) stopped working after the first motion update. Heavy animation caused problems, and the hero arrow background looks bad. We are going back to a simple, safe version. Also some content changes are needed.

## Step 0: Read first

Read these fully. They were updated, so they are the source of truth now:
1. `docs/01_DESIGN.md`
2. `docs/02_CONTENT.md`
3. `docs/03_MOTION.md` (the new lean version)

## Step 1: Find why it broke (do this before changing anything)

1. Run `npm run build` and `npm run dev`. Open the site in the browser and open the console.
2. Write down every error and every blank or broken section.
3. Find the root cause (likely candidates: GSAP/ScrollTrigger/Lenis setup, elements stuck at opacity 0, pinned sections, `React.lazy` parts that do not mount, canvas errors, intro cover that never leaves).
4. Keep this list. You will report it at the end.

## Step 2: Remove the heavy motion

Delete all of this, including files, imports, CSS, and leftover wrappers:
- Intro / preloader / logo Flip animation
- Hero arrow `<canvas>` and everything for it. The hero background is plain Paper.
- Lenis smooth scroll
- GSAP, ScrollTrigger, Flip, `@gsap/react`: remove all usage, then run `npm uninstall gsap @gsap/react lenis`
- Pinned sections, scrubbed animations, scroll-drawn paths
- Custom cursor, magnetic button, rolling nav letters, sliding nav arrowhead
- `React.lazy` / `Suspense` for Products and Estimator. Import them normally.
- Any inline style or CSS that sets `opacity: 0`, `visibility: hidden`, or large transforms as a default state. Default state must be visible.

Restore: native scroll with `scroll-behavior: smooth`, correct `scroll-margin-top` for the fixed header, the logo link scrolling to the top, and all nav links working.

Do NOT change the logo, colors, fonts, layout, or section order.

## Step 3: Content updates

Sync the site with the updated `docs/02_CONTENT.md`:

1. **Remove the city and all location text.** The words "Raipur" and "Chhattisgarh" must not appear anywhere: components, `site.ts`, `index.html` meta tags, JSON-LD, footer, About text, sitemap, README. Remove the `city` constant.
2. **Remove the Hindi/English line.** The About section now has two facts only (see content file). The site is English only.
3. **Add Instagram.** Add `instagram` and `instagramHandle` to `src/content/site.ts` (values are in the content file). In Contact, the main button is `Message us on Instagram`, opening `https://www.instagram.com/furthernorth.co/` in a new tab with `rel="noopener noreferrer"`. Add the small text under it. Add an Instagram link in the footer. Keep Email and WhatsApp buttons but hide them when their value is still `[FILL]`.
4. Update the hero sub text, About text, footer, and SEO description exactly as in the content file.
5. Keep the contact form as it is.

## Step 4: Add the lean motion

Build only the 4 motions in `docs/03_MOTION.md`, with plain CSS + `IntersectionObserver` + one scroll listener:
1. Hero load reveal (CSS only)
2. Scroll fade-in with `data-reveal` and `useReveal`
3. Ascent line (scroll progress)
4. Small quick interactions (nav hover, tab fade, estimator tween, toast)

Do not build anything from the "Parked ideas" list. Do not install any animation library.

## Step 5: Check your work

1. `npm run build` passes with no errors or warnings. Console is clean in dev.
2. Every section is visible and readable. Scroll the whole page slowly and check nothing is invisible or stuck.
3. Turn JavaScript off in the browser: the page must still show all text.
4. Test "prefers-reduced-motion: reduce": all content visible, no movement.
5. Test at 360px and 1440px. No horizontal scroll. The ascent line never blocks clicks.
6. Run a search in the project for: `Raipur`, `Chhattisgarh`, `Hindi`, `gsap`, `lenis`, `canvas`, `ScrollTrigger`. There must be no results.
7. Click the Instagram button and confirm the link goes to the correct profile.

## Final answer

Give me:
1. The root cause list from Step 1, in plain English.
2. What you removed.
3. What you changed.
4. What you added.
5. Anything still not working or anything you are unsure about.
