# PROMPT 1: Build the Website (Setup + All Sections)

Copy everything below the line into your AI coding agent.

---

You are building the website for **FurtherNorth** (furthernorth.in), an AI development firm. This is a one-page static marketing website. No login, no sign up, no backend, no database.

## Step 0: Read first

Read these files fully before you write any code. They are the source of truth.

1. `docs/01_DESIGN.md`: colors, fonts, layout, header, logo rules.
2. `docs/02_CONTENT.md`: all text. Use it exactly.
3. `docs/03_MOTION.md`: read it now so you build the right structure. You will add the animation in the next prompt, so in this prompt only build what is listed under "Scope of this prompt".

If any file is missing, stop and tell me.

## Step 1: Project setup

1. Create a Vite + React + TypeScript project in the current folder.
2. Install Tailwind CSS (current stable setup for Vite), nothing else. Do NOT install any animation library (no GSAP, no Lenis, no Framer Motion).
3. Folder structure:
   ```
   src/
     components/   (Header, Hero, Services, Products, Process, Roadmap, About, Estimator, Contact, Footer, MobileMenu)
     content/      (site.ts, demoData.ts)
     hooks/
     lib/
     styles/       (tokens in CSS variables + Tailwind theme)
   public/
     brand/
   ```
4. Put the colors and fonts from `01_DESIGN.md` into CSS variables and the Tailwind theme. Load fonts (Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono) from Google Fonts with `display=swap`.
5. Vite `base` must be `'/'` (the site lives at the root of furthernorth.in).

## Step 2: Logo (do exactly this)

1. The file `docs/assets/furthernorth-logo.png` is the logo. It is already cropped from the original. **Do not change the logo in any way**: no recolor, no redraw, no effects, no text version, no SVG trace, no stretch.
2. Copy it to `public/brand/furthernorth-logo.png`. Create a lossless `.webp` copy beside it.
3. If the file is missing and you only have the original `logo.jpg` (1920x1080), crop it to exactly left 490, top 300, right 1480, bottom 708 and save as PNG. Crop only.
4. Use it in the header (left side, height about 40px, width auto) and in the footer (large). The logo must be a link to `#home` in the header. Add `alt="FurtherNorth"`.
5. The logo background is `#F1F0EB`. The header and footer backgrounds must be exactly this color so the logo blends in.

## Step 3: Build the page

Build all 8 sections from `01_DESIGN.md` (section order table) with the exact copy in `02_CONTENT.md`:

1. Header (fixed) with logo on the left and nav on the right. `Contact` is a pill button. Mobile: logo + menu button, full screen menu panel.
2. Hero `#home`
3. Services `#services`: the two-state toggle (working, with plain text swap for now), and the three offers with different sizes.
4. Products `#products` (dark): the dashboard demo frame with the three tabs working and sample data from `src/content/demoData.ts` (static charts drawn with SVG, no chart library), the 5 product rows, the AI projects block.
5. Process `#process`: four steps, simple stacked layout for now.
6. Roadmap `#roadmap` (dark): three levels in a diagonal/climbing layout, with the SVG path drawn static.
7. About `#about`
8. Estimator `#estimator`: three working sliders and the live result with the formula from the content file.
9. Contact `#contact` + Footer: main button `Message us on Instagram` (opens `site.instagram` in a new tab), email button with copy action and toast, WhatsApp button, working form that posts to Formspree using `formspreeId`. Hide any link whose value is still `[FILL]`.

Rules:
- Nav items scroll to sections. Use native `scroll-behavior: smooth` for now. Account for the fixed header height with `scroll-margin-top`.
- Highlight the active nav item (use IntersectionObserver). Mark it with a small North Blue arrowhead above the label, as in the design file.
- Follow the "avoid" list in `01_DESIGN.md`. No all caps labels, no "→" on buttons, no identical card grids, no gradients.
- Keep all text in `src/content/site.ts` and `demoData.ts` where the content file says so, not hard coded in components.
- Fully responsive 360px to 2560px. Test the header at 360px, 768px, 1280px.
- Semantic HTML, keyboard focus styles, alt text, `lang="en"`.
- Do NOT invent any content, numbers, clients or testimonials.

## Scope of this prompt

Build: layout, content, typography, colors, header, responsive behavior, working interactive logic (tabs, toggle, sliders, form, copy email, mobile menu), and simple 200ms hover transitions.

Do NOT build any animation beyond simple 150–250ms hover and tab transitions. The next prompt adds a small, safe set of motions. No canvas, no hero background graphics, no smooth scroll library, no intro.

## Step 4: Check your work

1. Run `npm run build` and fix all errors and warnings.
2. Run the dev server and check every section at 360px and 1280px.
3. Confirm: the logo blends into the header with no visible box. The form shows validation. The estimator math is right: 3 people × 10 hours × 52 × 40% = 624 hours per year.
4. Give me a short summary: what is built, file list, how to run it, and anything you were unsure about.

Keep the code clean and simple. I will not read the code, so make the structure obvious and add short comments where logic is not obvious.
