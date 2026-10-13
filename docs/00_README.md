# FurtherNorth Website: How to Use These Files

## What is in this kit

| File | What it is |
|---|---|
| `00_README.md` | This file. Steps, folder layout, deploy guide. |
| `01_DESIGN.md` | Colors, fonts, layout rules, logo rules. |
| `02_CONTENT.md` | Every word that goes on the website. |
| `03_MOTION.md` | The 4 animations we keep, and a list of parked ideas. |
| `PROMPT_1_BUILD.md` | Prompt 1: project setup + all sections built. |
| `PROMPT_2_FIX_AND_MOTION.md` | Prompt 2: fixes the site, updates content, adds a few safe animations. |
| `PROMPT_3_LAUNCH.md` | Prompt 3: SEO, speed, accessibility, deploy files. |
| `assets/furthernorth-logo.png` | Logo, cropped only. Nothing else changed. |
| `assets/favicon-source.png` | The arrow from the logo, for the browser tab icon. |

## Steps

1. Make a new empty folder. Open it in Antigravity or Claude Code.
2. Make a folder called `docs` inside it. Put ALL files from this kit in `docs/` (keep the `assets` folder inside `docs`).
3. Fill the 6 placeholders in `02_CONTENT.md` (search for `[FILL]`): email, WhatsApp number, LinkedIn link, DocuMind link, ResearchPilot link, Formspree form ID. You can leave some empty. The site hides any link that is empty. To get the Formspree ID: make a free account at formspree.io, create a form, copy the ID from the form URL.
4. Paste `PROMPT_1_BUILD.md` into the agent. Wait. Run the site. Check it.
5. Paste `PROMPT_2_FIX_AND_MOTION.md`. Wait. Check it. (If you already ran the old Prompt 2 and the site broke, run this one on your current project. It repairs it.)
6. Paste `PROMPT_3_LAUNCH.md`. Wait. Check it.
7. Deploy (see below).

Do the prompts in order. Do not skip one.

## Stack (simple, static, works on both hosts)

- Vite + React + TypeScript
- Tailwind CSS
- Plain CSS animation (no animation libraries)
- No backend. No database. No login.

The build output is plain static files. Vercel and GitHub Pages both host it.

## Which host?

- **GitHub Pages**: free, no limits on commercial use. Safe choice for a firm.
- **Vercel**: easier and faster. But the free Hobby plan is meant for non-commercial use. Read their current terms before you use it for a business.

My advice: start with GitHub Pages. You can move to Vercel later in 10 minutes. Nothing in the code changes.

## Deploy on GitHub Pages + furthernorth.in

1. Push the project to a GitHub repo.
2. Repo → Settings → Pages → Source: **GitHub Actions**. (Prompt 3 creates the workflow file.)
3. Repo → Settings → Pages → Custom domain: `furthernorth.in` → Save. Tick **Enforce HTTPS** when it appears.
4. In your domain registrar's DNS panel, add:
   - 4 `A` records for `@` (apex): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 `CNAME` record: `www` → `YOUR-GITHUB-USERNAME.github.io`
5. Wait 10 minutes to a few hours. HTTPS turns on by itself.

## Deploy on Vercel + furthernorth.in

1. Vercel → Add New Project → import the GitHub repo. Framework: Vite. Deploy.
2. Project → Settings → Domains → add `furthernorth.in` and `www.furthernorth.in`.
3. Vercel shows the exact DNS records to add. Copy them into your registrar. Use what Vercel shows, not what you remember.

## Rules for the agent (already inside the prompts)

- Do not change the logo. Crop only.
- No fake clients, fake reviews, fake numbers.
- Respect reduced motion. Keep motion small and safe.
- Keep it one page. Keep it simple to maintain.
