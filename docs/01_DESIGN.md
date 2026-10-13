# 01 DESIGN: FurtherNorth

## Subject, audience, job

- **Subject:** FurtherNorth is a small AI development firm. It builds AI applications and AI models, and uses AI to build software faster.
- **Right now:** day-to-day business dashboards for small and medium businesses (SMBs).
- **Audience:** shop owners, restaurant owners, small business operators. Also recruiters and founders who look at the site to judge technical quality.
- **Job of the site:** show that this firm is sharp, modern, and honest. Make a visitor want to start a conversation.

## Design idea: "The Ascent"

The logo is a wordmark where the N rises into an arrow pointing up. The whole site uses ONE idea from it: **upward direction**.

- A thin vertical line on the left edge with a small arrowhead. It climbs as the visitor scrolls (scroll progress).
- Dark and light sections alternate, like levels.
- The hero is clean: big headline on a plain Paper background. No background graphics, no canvas, no particles.

Keep everything quiet and disciplined. Motion is kept small on purpose (see `03_MOTION.md`).

## Color tokens

| Name | Hex | Use |
|---|---|---|
| Paper | `#F1F0EB` | Main background. Exact match of the logo background. Do not change. |
| Ink | `#0E1116` | Text on Paper. Dark section background. |
| North Blue | `#2340FF` | The only accent. Links, active states, arrowheads, chart highlights. |
| Frost | `#DCE0EA` | Borders, quiet panels on Paper. |
| Slate | `#5A6170` | Secondary text. |
| Paper on Ink | `#F1F0EB` | Text on dark sections. |

Rules:
- Light and dark sections alternate. See section order below.
- Use North Blue sparingly. If more than ~5% of the screen is blue, reduce it.
- No gradients as decoration. No glow. No purple.
- Contrast must pass WCAG AA everywhere.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display + headings | **Bricolage Grotesque** | Weight 600–800. Tight letter spacing (-0.02em). Use its width axis if available: wider for hero, normal elsewhere. |
| Body + UI | **IBM Plex Sans** | Weight 400, 500. Size 17–18px desktop, 16px mobile. |
| Numbers inside dashboard demos only | **IBM Plex Mono** | Only inside the mock dashboards. Nowhere else. |

Load from Google Fonts with `display=swap`. Use `font-display: swap` and system fallbacks.

Type scale (desktop): hero 96–140px (fluid with `clamp`), H2 56–72px, H3 28–32px, body 18px, small 14px.
Line length: max 65 characters for body text. Headings: left aligned.

Avoid these (they look generated):
- One highlighted word inside a headline.
- ALL CAPS small labels above every heading.
- Arrows ("→") on every button or link.
- Middle-dot strings like "A · B · C".
- Identical rounded cards repeated everywhere. Vary the shape and size by importance.

## Layout

- Max content width 1280px. Side padding: 24px mobile, 48px desktop.
- 12 column grid on desktop. Content mostly left aligned, with generous empty space.
- Section vertical padding: 120–200px desktop, 80px mobile.
- Border radius: 2px for panels, 999px only for pills and the primary button. Not one radius everywhere.
- Structure lines (hairlines in Frost or Ink at 12%) only where they show real structure, for example between rows in a list.

### Header (fixed)

```
[LOGO]                         Services  Products  Process  Roadmap  About  [Contact]
```

- Height 72px desktop, 64px mobile.
- Background: solid Paper `#F1F0EB` at all times (the logo is a Paper-colored image, so the header must be Paper so it blends). A 1px Frost line appears at the bottom after the page scrolls 8px.
- Logo on the left. It is a link to the top of the page (home). Height 36–40px.
- Nav on the right. Each item scrolls smoothly to its section. The active section is marked with a small North Blue arrowhead above the label, not an underline.
- `Contact` is a pill button (Ink background, Paper text).
- Mobile (below 900px): logo left, a menu button right. Menu opens a full-screen Paper panel with large links.

### Section order and background

| # | Section id | Background |
|---|---|---|
| 1 | `#home` (hero) | Paper |
| 2 | `#services` | Paper |
| 3 | `#products` | Ink (dark) |
| 4 | `#process` | Paper |
| 5 | `#roadmap` | Ink (dark) |
| 6 | `#about` | Paper |
| 7 | `#estimator` (inside About/Contact flow) | Frost |
| 8 | `#contact` + footer | Paper |

## Logo rules (important)

- Source: `docs/assets/furthernorth-logo.png`. It is already cropped from the original 1920x1080 file. Only a crop was done. Nothing else changed.
- If you must re-crop from the original `logo.jpg` (1920x1080), use exactly: left 490, top 300, right 1480, bottom 708 (pixels). This leaves equal padding around the wordmark (the artwork itself spans x 550–1419, y 360–648).
- **Never** recolor, redraw, retype, stretch, add effects, add shadow, or convert the logo to text/SVG. Use the image as it is.
- Copy it to `public/brand/furthernorth-logo.png`. Also make a `.webp` copy for speed, same pixels, lossless.
- Logo background is `#F1F0EB`. Therefore Paper is `#F1F0EB` and the header is always Paper.
- Do NOT place the logo on dark sections or on Frost.
- Favicon: use `docs/assets/favicon-source.png` (the arrow from the logo). Generate `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` from it. Crop/resize only.
- Social share image (1200x630): Paper background, the logo centered, nothing else.

## Quality floor

- Responsive from 360px to 2560px.
- Visible keyboard focus (2px North Blue outline, 3px offset).
- `prefers-reduced-motion` respected (see `03_MOTION.md`).
- Touch targets at least 44px.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`. One `h1`.
