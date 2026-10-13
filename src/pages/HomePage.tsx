import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Products } from "../components/Products";
import { Process } from "../components/Process";
import { Roadmap } from "../components/Roadmap";
import { About } from "../components/About";
import { Estimator } from "../components/Estimator";
import { Contact } from "../components/Contact";
import { usePageMeta } from "../hooks/usePageMeta";

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("Business dashboard");

  usePageMeta(
    "FurtherNorth | AI software for small businesses",
    "FurtherNorth is an AI development firm. Business dashboards, AI applications, and custom AI models for small and medium businesses.",
    "https://furthernorth.in/"
  );

  const handleAskAboutDashboard = () => {
    setSelectedService("Business dashboard");
  };

  return (
    <>
      {/* 1. Hero (#home) */}
      <Hero />

      {/* 2. Services (#services) */}
      <Services />

      {/* 3. Products (#products - Dark) */}
      <Products onAskAboutDashboard={handleAskAboutDashboard} />

      {/* 4. Process (#process) */}
      <Process />

      {/* 5. Roadmap (#roadmap - Dark) */}
      <Roadmap />

      {/* 6. About (#about) */}
      <About />

      {/* 7. Estimator (#estimator - Frost) */}
      <Estimator />

      {/* 8. Contact (#contact) */}
      <Contact
        selectedService={selectedService}
        onServiceChange={setSelectedService}
      />
    </>
  );
};
