import { Routes, Route } from "react-router-dom";
import { useActiveSection } from "./hooks/useActiveSection";
import { useReveal } from "./hooks/useReveal";
import { AscentLine } from "./components/AscentLine";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollManager } from "./components/ScrollManager";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";

const SECTION_IDS = [
  "home",
  "services",
  "products",
  "process",
  "roadmap",
  "about",
  "estimator",
  "contact",
];

export function App() {
  const activeSection = useActiveSection(SECTION_IDS, 100);

  // Activate lean scroll reveals on elements with [data-reveal]
  useReveal();

  return (
    <div className="min-h-screen bg-paper text-ink font-body selection:bg-north-blue selection:text-paper">
      {/* Scroll & Hash manager */}
      <ScrollManager />

      {/* Skip to Content accessible link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper focus:outline-2 focus:outline-north-blue focus:outline-offset-2"
      >
        Skip to content
      </a>

      {/* Ascent scroll progress indicator */}
      <AscentLine />

      {/* Fixed Header */}
      <Header activeSection={activeSection} />

      {/* Main Page Flow */}
      <main id="main-content" tabIndex={-1} className="pt-[var(--header-h)] focus:outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
