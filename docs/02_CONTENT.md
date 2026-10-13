# 02 CONTENT: All Website Copy

Use this text exactly. Do not invent clients, reviews, awards, team members, or numbers. Voice: plain, direct, short sentences, active voice, sentence case. No hype words ("revolutionary", "cutting-edge", "synergy").

Items marked `[FILL]` are placeholders. Keep them as visible constants in ONE file: `src/content/site.ts`. The owner will edit them. If a value is still `[FILL]`, hide that link or button in the UI instead of showing a broken one.

---

## Site constants (`src/content/site.ts`)

```
name: "FurtherNorth"
domain: "furthernorth.in"
email: "[FILL] your email"
whatsapp: "[FILL] number with country code, digits only, e.g. 1XXXXXXXXXX"
instagram: "https://www.instagram.com/furthernorth.co/"
instagramHandle: "@furthernorth.co"
linkedin: "[FILL] LinkedIn URL"
formspreeId: "[FILL] Formspree form ID"
founder: "Aditya Sharma"
```

---

## Header

- Logo (image) → scrolls to top.
- Nav: `Services` · `Products` · `Process` · `Roadmap` · `About` · `Contact` (Contact is the pill button)

---

## 1. Hero (`#home`)

- H1: **We build AI software that small businesses can actually use.**
- Sub: FurtherNorth is an AI development firm. We build business dashboards and AI applications. We are also learning to train our own AI models.
- Primary button: `See what we build` (scrolls to `#products`)
- Secondary text link: `Talk to us` (scrolls to `#contact`)
- Small line at the bottom of the hero: `Scroll to climb`

---

## 2. Services (`#services`)

- H2: **Two ways we work with AI.**
- Intro: Most firms use AI as a tool. We do that, and we also build AI itself.

**Interactive toggle with two states** (see `03_MOTION.md`):

State A, label `Built with AI`:
- Title: We use AI to build faster.
- Text: AI coding agents help us design, write, and test software in days, not months. You get a working product sooner and pay for results, not hours.

State B, label `Builds AI`:
- Title: We build AI products.
- Text: Chat with your documents. Research agents that search and write. Automations that read, decide, and act. We design the system, connect the models, and ship it.

**Three offers** (different sizes, not three identical cards):

1. **Business dashboards** (largest)
   - Text: One screen that shows your stock, sales, bookings, or money owed. Made for the way small businesses work. Works offline on a normal computer.
2. **AI applications**
   - Text: Document chat (RAG), research agents, and workflow automation. Built on current language models.
3. **AI models** (smallest, marked `In research`)
   - Text: We are learning to build and train small language models from scratch. This is our long-term direction.

---

## 3. Products (`#products`) (dark section)

- H2: **Dashboards for everyday business.**
- Intro: Five desktop apps for small businesses. Each one solves one job well. They work offline, so a power cut or bad internet does not stop your day.

Interactive demo shows three of them (StockPulse, BookEase, KitchenLedger) with sample data. Label under the demo: `Sample data. Not a real business.`

List of all five (as rows with hairlines, not cards):

| Name | One line | Status |
|---|---|---|
| StockPulse | Know what is on the shelf, what is low, and what to reorder. | In testing |
| BookEase | Appointments and bookings in one calendar. | In development |
| KitchenLedger | Food cost, daily sales, and waste for restaurants and cafes. | In development |
| CreditBook | Track which customers owe you money, and how long it has been. | In development |
| FitDesk | Members, renewals, and attendance for gyms. | In development |

- Closing line: `Want one of these for your business? Tell us.` → button `Ask about a dashboard` (scrolls to `#contact`, and pre-selects "Business dashboard" in the form)

**AI projects we have built** (small block under the list):
- **DocuMind**: Chat with your PDF files. Answers come from your documents. Live. Link: `[FILL] DocuMind URL`
- **ResearchPilot**: An AI agent that researches a topic on the web and writes a report. In development. Link: `[FILL] ResearchPilot URL or GitHub`

If a link is `[FILL]`, show the project without a link.

---

## 4. Process (`#process`)

- H2: **How a project runs.**
- Four steps (this is a real sequence, so numbering is correct):

1. **Talk.** You tell us how your business runs and what slows it down. We listen first.
2. **Map.** We write down the problem, the screens, and the data in plain language. You approve it before we build.
3. **Build.** We build in short rounds and show you working software each week.
4. **Hand over and improve.** You get the app, a simple guide, and support. We fix problems and add what you need next.

---

## 5. Roadmap (`#roadmap`) (dark section)

- H2: **Where we are going.**
- Intro: We are early. Here is the honest picture.

Three levels climbing upward:

- **Now:** Business dashboards for small businesses. AI projects built in public: DocuMind and ResearchPilot.
- **Next:** Custom AI applications for clients. Document chat, research agents, and automations for real workflows.
- **Further north:** Our own AI models. We are going deep into Python and language models to train small models from scratch, then fine-tune them for real business needs.

---

## 6. About (`#about`)

- H2: **A small firm with a long view.**
- Text: FurtherNorth was started by Aditya Sharma. We build with AI agents, and we study how the models underneath actually work. We care about software that is simple, fast, and useful on day one. We would rather ship a small thing that works than promise a big thing.
- Two plain facts (as a short list, no icons):
  - Built for small and medium businesses.
  - Desktop apps that work offline.

---

## 7. Time estimator (`#estimator`) (Frost background)

- H2: **How much time could you get back?**
- Intro: Move the sliders. This is a rough estimate, not a promise.
- Inputs:
  - `People who do manual work (stock, billing, registers, reports)`: slider 1–30, default 3
  - `Hours each person spends on it per week`: slider 1–40, default 10
  - `How much of it could software handle?`: slider 20%–70%, default 40%
- Output: `About X hours saved each year` (large number, counts up). Under it: `That is about Y full working days.` (use 8 hours per day)
- Formula: `hours per year = people × hours per week × 52 × (percent / 100)`
- Footnote: `A rough estimate. Real results depend on your business.`
- Button: `Get this time back` (scrolls to `#contact`)

---

## 8. Contact (`#contact`)

- H2: **Tell us what slows your business down.**
- Text: Send us a message on Instagram, or use the form. We reply within one working day.   <!-- Remove "within one working day" if you cannot keep it. -->
- Buttons (in this order):
  - **`Message us on Instagram`** is the main button (big, Ink pill). It opens `site.instagram` in a new tab (`target="_blank"`, `rel="noopener noreferrer"`). Under it, small text: `@furthernorth.co. Tap "Message" on our profile.`
  - `Email us` (opens `mailto:`) with a small `Copy email` action. After copy, show a toast: `Email copied`. Hide if email is `[FILL]`.
  - `Message on WhatsApp` (opens `https://wa.me/<whatsapp>`). Hide if whatsapp is `[FILL]`.
- Simple form (sends to Formspree, no backend):
  - Name (required)
  - Email or phone (required)
  - `What do you need?` select: Business dashboard · AI application · Something else
  - Message (required)
  - Button: `Send message`
  - Success text: `Message sent. We will reply soon.`
  - Error text: `Message not sent. Check your internet and try again, or email us directly.`

---

## Footer

- Large logo image (the cropped logo, unchanged) on Paper.
- Links: Instagram (`@furthernorth.co`), email, LinkedIn. Hide any link that is still `[FILL]`.
- Small line: `© 2026 FurtherNorth. All rights reserved.`
- Link: `Back to top`

---

## SEO text

- Title: `FurtherNorth | AI software for small businesses`
- Meta description: `FurtherNorth is an AI development firm. Business dashboards, AI applications, and custom AI models for small and medium businesses.`
