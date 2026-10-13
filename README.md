# FurtherNorth Website

The official static marketing website for **FurtherNorth** ([furthernorth.in](https://furthernorth.in)).

## Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Fonts**: Self-hosted WOFF2 via `@fontsource` (Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono)
- **Motion**: Pure CSS animations + lightweight `IntersectionObserver` scroll reveals
- **Hosting**: GitHub Pages (via GitHub Actions) / Vercel

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

## Content & Site Configuration

All website copy, social links, contact emails, and Formspree IDs are centrally managed in a single file:
👉 **`src/content/site.ts`**

Update the following constants when ready to publish:
- `email`: Contact email address
- `whatsapp`: WhatsApp number with country code (e.g. `1XXXXXXXXXX`)
- `linkedin`: LinkedIn company URL
- `formspreeId`: Formspree form ID for the contact form
- `DocuMind link` / `ResearchPilot link`: Demo/project URLs

Any item left as `[FILL]` is automatically hidden in the user interface.

## Deployment

The repository includes automated deployment workflows in `.github/workflows/deploy.yml` configured for GitHub Pages with the custom domain `furthernorth.in`.
"# furthernorthwebsite" 
"# furthernorthwebsite" 
"# furthernorthwebsite" 
