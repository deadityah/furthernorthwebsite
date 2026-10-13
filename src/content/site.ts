// Source of truth for site constants and copy from docs/02_CONTENT.md
import { products, getStatusLabel } from "./products";

export interface SiteConstants {
  name: string;
  domain: string;
  email: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  linkedin: string;
  formspreeId: string;
  founder: string;
}

export const siteConstants: SiteConstants = {
  name: "FurtherNorth",
  domain: "furthernorth.in",
  email: "[FILL] your email",
  whatsapp: "[FILL] number with country code, digits only, e.g. 1XXXXXXXXXX",
  instagram: "https://www.instagram.com/furthernorth.co/",
  instagramHandle: "@furthernorth.co",
  linkedin: "[FILL] LinkedIn URL",
  formspreeId: "mdealvrp",
  founder: "Aditya Sharma",
};

/**
 * Utility to check if a constant is filled and not a [FILL] placeholder.
 */
export function isFilled(val?: string | null): boolean {
  if (!val) return false;
  return !val.includes("[FILL]") && val.trim().length > 0;
}

export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact", isPill: true },
];

export const heroContent = {
  h1: "We build AI software that small businesses can actually use.",
  sub: "FurtherNorth is an AI development firm. We build business dashboards and AI applications. We are also learning to train our own AI models.",
  primaryCta: {
    label: "See what we build",
    href: "#products",
  },
  secondaryCta: {
    label: "Talk to us",
    href: "#contact",
  },
  scrollIndicator: "Scroll to climb",
};

export const servicesContent = {
  h2: "Two ways we work with AI.",
  intro: "Most firms use AI as a tool. We do that, and we also build AI itself.",
  toggleStates: {
    withAi: {
      id: "with-ai",
      label: "Built with AI",
      title: "We use AI to build faster.",
      text: "AI coding agents help us design, write, and test software in days, not months. You get a working product sooner and pay for results, not hours.",
    },
    buildsAi: {
      id: "builds-ai",
      label: "Builds AI",
      title: "We build AI products.",
      text: "Chat with your documents. Research agents that search and write. Automations that read, decide, and act. We design the system, connect the models, and ship it.",
    },
  },
  offers: [
    {
      id: "dashboards",
      title: "Business dashboards",
      tag: null,
      size: "large",
      text: "One screen that shows your stock, sales, bookings, or money owed. Made for the way small businesses work. Works offline on a normal computer.",
    },
    {
      id: "apps",
      title: "AI applications",
      tag: null,
      size: "medium",
      text: "Document chat (RAG), research agents, and workflow automation. Built on current language models.",
    },
    {
      id: "models",
      title: "AI models",
      tag: "In research",
      size: "small",
      text: "We are learning to build and train small language models from scratch. This is our long-term direction.",
    },
  ],
};

export const productsContent = {
  h2: "Dashboards for everyday business.",
  intro: "Five desktop apps for small businesses. Each one solves one job well. They work offline, so a power cut or bad internet does not stop your day.",
  demoNote: "Sample data. Not a real business.",
  productsList: products.map((p) => ({
    name: p.name,
    description: p.tagline,
    status: getStatusLabel(p.status),
  })),
  closing: {
    text: "Want one of these for your business? Tell us.",
    ctaLabel: "Ask about a dashboard",
    targetHref: "#contact",
  },
  aiProjects: [
    {
      name: "DocuMind",
      description: "Chat with your PDF files. Answers come from your documents.",
      status: "Live",
      link: "[FILL] DocuMind URL",
    },
    {
      name: "ResearchPilot",
      description: "An AI agent that researches a topic on the web and writes a report.",
      status: "In development",
      link: "[FILL] ResearchPilot URL or GitHub",
    },
  ],
};

export const processContent = {
  h2: "How a project runs.",
  steps: [
    {
      stepNumber: "1",
      title: "Talk.",
      text: "You tell us how your business runs and what slows it down. We listen first.",
    },
    {
      stepNumber: "2",
      title: "Map.",
      text: "We write down the problem, the screens, and the data in plain language. You approve it before we build.",
    },
    {
      stepNumber: "3",
      title: "Build.",
      text: "We build in short rounds and show you working software each week.",
    },
    {
      stepNumber: "4",
      title: "Hand over and improve.",
      text: "You get the app, a simple guide, and support. We fix problems and add what you need next.",
    },
  ],
};

export const roadmapContent = {
  h2: "Where we are going.",
  intro: "We are early. Here is the honest picture.",
  levels: [
    {
      level: "Now",
      text: "Business dashboards for small businesses. AI projects built in public: DocuMind and ResearchPilot.",
    },
    {
      level: "Next",
      text: "Custom AI applications for clients. Document chat, research agents, and automations for real workflows.",
    },
    {
      level: "Further north",
      text: "Our own AI models. We are going deep into Python and language models to train small models from scratch, then fine-tune them for real business needs.",
    },
  ],
};

export const aboutContent = {
  h2: "A small firm with a long view.",
  text: "FurtherNorth was started by Aditya Sharma. We build with AI agents, and we study how the models underneath actually work. We care about software that is simple, fast, and useful on day one. We would rather ship a small thing that works than promise a big thing.",
  facts: [
    "Built for small and medium businesses.",
    "Desktop apps that work offline.",
  ],
};

export const estimatorContent = {
  h2: "How much time could you get back?",
  intro: "Move the sliders. This is a rough estimate, not a promise.",
  defaults: {
    people: 3,
    hoursPerWeek: 10,
    percent: 40,
  },
  footnote: "A rough estimate. Real results depend on your business.",
  ctaLabel: "Get this time back",
};

export const contactContent = {
  h2: "Tell us what slows your business down.",
  text: "Send us a message on Instagram, or use the form. We reply within one working day.",
  options: [
    "Business dashboard",
    "AI application",
    "Something else",
  ],
  toastMessage: "Email copied",
  successMessage: "Message sent. We will reply soon.",
  errorMessage: "Message not sent. Check your internet and try again, or email us directly.",
};

export const footerContent = {
  copyright: "© 2026 FurtherNorth. All rights reserved.",
  backToTop: "Back to top",
};
