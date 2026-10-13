# PROMPT 3: Launch Prep (SEO, Speed, Accessibility, Deploy Files)

Copy everything below the line into your AI coding agent. Run this only after Prompt 2 works.

---

The FurtherNorth site is built and animated. Now make it ready to go live on **furthernorth.in**. It will be hosted on GitHub Pages (and must also work on Vercel with no code change).

## Step 0: Read first

Read `docs/01_DESIGN.md` (logo and favicon rules) and `docs/02_CONTENT.md` (SEO text section). Do not change copy, design, animation, or the logo.

## Step 1: Icons and share image

Use `docs/assets/favicon-source.png` (the arrow from the logo). Crop and resize only. Do not redraw it.

1. Generate in `public/`: `favicon.ico` (16, 32, 48 inside), `favicon-32.png`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`. Keep the Paper background `#F1F0EB` behind the arrow.
2. Generate `public/og-image.png` at 1200x630: Paper `#F1F0EB` background, the cropped logo `public/brand/furthernorth-logo.png` centered at about 60% width, nothing else. Do not alter the logo.
3. Add `public/site.webmanifest` with name "FurtherNorth", theme color `#F1F0EB`, and the icons.

## Step 2: SEO and metadata (in `index.html`)

1. Title and meta description from `02_CONTENT.md` (SEO text section).
2. `<link rel="canonical" href="https://furthernorth.in/">`
3. Open Graph and Twitter card tags using `og-image.png` with absolute URLs (`https://furthernorth.in/og-image.png`).
4. `theme-color` = `#F1F0EB`.
5. JSON-LD `Organization` schema: name FurtherNorth, url, logo (absolute URL), no address or city. Add `sameAs` with the Instagram URL (`https://www.instagram.com/furthernorth.co/`) and the LinkedIn URL only if it is not `[FILL]`.
6. `public/robots.txt` allowing all, with the sitemap line.
7. `public/sitemap.xml` with the single URL `https://furthernorth.in/`.
8. Exactly one `h1`. Heading order must be correct (h1 → h2 → h3).
9. Add a simple `public/404.html` (Paper background, text "Page not found", a link to the home page). On GitHub Pages this file is served for unknown URLs.

## Step 3: Performance

1. Preload the two most important font files. Self-host fonts if it is easy (download Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono as `woff2` via `@fontsource` packages). If self-hosting, remove Google Fonts links.
2. Use the `.webp` logo with a `<picture>` fallback to PNG. Set `width` and `height` attributes to avoid layout shift. Do not change pixels.
3. Check the final bundle size. Report the gzipped total JS. Do not add code-splitting or lazy loading unless the bundle is over 200KB gzipped.
4. No unused dependencies. Remove anything not used.
5. Add `loading="lazy"` to any image below the fold.
6. Set long cache friendly file names (Vite default hashing is fine).

## Step 4: Accessibility pass

1. Add a "Skip to content" link as the first focusable element.
2. All interactive elements reachable by keyboard, with a visible focus ring (2px North Blue, 3px offset).
3. The mobile menu traps focus while open and returns focus to the menu button when closed. Escape closes it.
4. The Services toggle and Products tabs use correct roles (`tablist`/`tab`/`tabpanel` or `aria-pressed`) and arrow-key support.
5. Form fields have labels, error messages linked with `aria-describedby`, and the success/error message uses `aria-live="polite"`.
6. The toast uses `role="status"`.
7. Check color contrast of all text against its background (WCAG AA). Fix any failure by changing the Slate or Ink usage, not by changing the brand colors.
8. Decorative SVGs and the ascent line get `aria-hidden="true"`. Meaningful SVG (dashboard charts) get a short text alternative.

## Step 5: Deploy files

1. Vite `base` stays `'/'`.
2. Create `public/CNAME` with exactly one line: `furthernorth.in`
3. Create `.github/workflows/deploy.yml` for GitHub Pages using GitHub Actions: on push to `main`, install with `npm ci`, run `npm run build`, upload the `dist` folder as the Pages artifact, deploy with the official `actions/deploy-pages`. Use current stable versions of the official actions (`actions/checkout`, `actions/setup-node`, `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`). Use Node 20 or newer. Set the needed `permissions` (`contents: read`, `pages: write`, `id-token: write`) and a `concurrency` group.
4. Do NOT add a `vercel.json` unless something fails on Vercel. Vite projects deploy on Vercel with zero config.
5. Add `.gitignore` (node_modules, dist, .env, OS files) and a short `README.md` in the project root (what it is, `npm install`, `npm run dev`, `npm run build`, where to edit text: `src/content/site.ts`).
6. Add a `public/.nojekyll` file.

## Step 6: Final QA (do all, then report)

1. `npm run build` passes with no errors or warnings.
2. `npm run preview` and check every section, the form, the copy-email button, and the nav at 360px, 768px, 1440px.
3. Run a Lighthouse test (mobile) if you can. Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100. If a target is missed, fix what you can and tell me what is left.
4. Check with reduced motion on.
5. Search the whole project for the text `[FILL]`. List every place it still appears. These are things I must fill in. Also confirm that nothing broken shows on the page for those empty values.
6. Check that no console errors appear.

## Final answer format

Give me:
1. A short list of what you did.
2. The list of `[FILL]` values I must fill (file and line).
3. The exact commands to push to GitHub.
4. The exact settings to click in GitHub Pages (Source: GitHub Actions, custom domain furthernorth.in, Enforce HTTPS).
5. The DNS records to add at my domain registrar: four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` pointing to `<my-github-username>.github.io`.
6. Anything you are unsure about.
