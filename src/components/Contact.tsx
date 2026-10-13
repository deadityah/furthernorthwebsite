import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConstants, contactContent, isFilled } from "../content/site";

interface ContactProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedService, onServiceChange }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    service: selectedService || contactContent.options[0],
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedToast, setCopiedToast] = useState(false);
  const [copiedButtonText, setCopiedButtonText] = useState(false);

  useEffect(() => {
    const state = location.state as { service?: string; message?: string } | null;
    const searchParams = new URLSearchParams(location.search);
    const askParam = searchParams.get("ask");
    const serviceParam = searchParams.get("service") || state?.service;
    const messageParam =
      searchParams.get("message") ||
      state?.message ||
      (askParam ? `I am interested in ${askParam}.` : undefined);

    if (serviceParam) {
      onServiceChange(serviceParam);
      setFormData((prev) => ({
        ...prev,
        service: serviceParam,
        message: messageParam !== undefined ? messageParam : prev.message,
      }));
    } else if (messageParam !== undefined) {
      setFormData((prev) => ({
        ...prev,
        message: messageParam,
      }));
    }
  }, [location.state, location.search, onServiceChange]);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleCopyEmail = async () => {
    if (!isFilled(siteConstants.email)) return;
    try {
      await navigator.clipboard.writeText(siteConstants.email);
      setCopiedToast(true);
      setCopiedButtonText(true);

      setTimeout(() => {
        setCopiedButtonText(false);
      }, 2000);

      setTimeout(() => {
        setCopiedToast(false);
      }, 2000);
    } catch {
      // Fallback
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }
    if (!formData.contactInfo.trim()) {
      errs.contactInfo = "Please enter your email or phone number.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a short message.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus("submitting");

    if (isFilled(siteConstants.formspreeId)) {
      try {
        const response = await fetch(`https://formspree.io/f/${siteConstants.formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            contactInfo: formData.contactInfo,
            need: formData.service,
            message: formData.message,
          }),
        });

        if (response.ok) {
          setFormStatus("success");
          setFormData({
            name: "",
            contactInfo: "",
            service: contactContent.options[0],
            message: "",
          });
        } else {
          setFormStatus("error");
        }
      } catch {
        setFormStatus("error");
      }
    } else {
      // Mock submit when Formspree ID is [FILL] placeholder
      setTimeout(() => {
        setFormStatus("success");
        setFormData({
          name: "",
          contactInfo: "",
          service: contactContent.options[0],
          message: "",
        });
      }, 400);
    }
  };

  const hasEmail = isFilled(siteConstants.email);
  const hasWhatsapp = isFilled(siteConstants.whatsapp);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-paper px-6 py-20 text-ink md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Direct channels left column with data-reveal */}
          <div className="lg:col-span-5" data-reveal>
            <h2
              id="contact-title"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink"
            >
              {contactContent.h2}
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-slate">
              {contactContent.text}
            </p>

            <div className="mt-10 flex flex-col space-y-6">
              {/* 1. Main Action: Message us on Instagram */}
              <div>
                <a
                  href={siteConstants.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                >
                  Message us on Instagram
                </a>
                <p className="mt-2 font-body text-xs text-slate">
                  {siteConstants.instagramHandle}. Tap "Message" on our profile.
                </p>
              </div>

              {/* 2. Email actions (Hidden if [FILL]) */}
              {hasEmail && (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${siteConstants.email}`}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-frost bg-paper px-6 text-sm font-medium text-ink transition-all duration-150 hover:-translate-y-[1px] hover:border-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                  >
                    Email us
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-frost bg-paper px-5 text-sm font-medium text-ink transition-all duration-150 hover:border-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                  >
                    {copiedButtonText ? "Email copied" : "Copy email"}
                  </button>
                </div>
              )}

              {/* 3. WhatsApp action (Hidden if [FILL]) */}
              {hasWhatsapp && (
                <div>
                  <a
                    href={`https://wa.me/${siteConstants.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-frost bg-paper px-6 text-sm font-medium text-ink transition-all duration-150 hover:-translate-y-[1px] hover:border-slate focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Form right column with data-reveal */}
          <div className="lg:col-span-7" data-reveal style={{ transitionDelay: "150ms" }}>
            <div className="rounded-[2px] border border-frost bg-paper p-8 sm:p-10">
              {formStatus === "success" ? (
                <div className="py-12 text-center transition-opacity duration-200" role="alert">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-north-blue/10 text-north-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    {contactContent.successMessage}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="mt-6 text-sm font-medium text-north-blue hover:underline focus-visible:outline-2 focus-visible:outline-north-blue"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name-input" className="block font-body text-sm font-medium text-ink">
                      Name <span className="text-north-blue" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      autoComplete="name"
                      required
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`mt-2 block w-full rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                        errors.name ? "border-red-500" : "border-frost"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email or Phone field */}
                  <div>
                    <label htmlFor="contact-input" className="block font-body text-sm font-medium text-ink">
                      Email or phone <span className="text-north-blue" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-input"
                      type="text"
                      autoComplete="email tel"
                      required
                      aria-describedby={errors.contactInfo ? "contact-error" : undefined}
                      value={formData.contactInfo}
                      onChange={(e) => {
                        setFormData({ ...formData, contactInfo: e.target.value });
                        if (errors.contactInfo) setErrors({ ...errors, contactInfo: "" });
                      }}
                      className={`mt-2 block w-full rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                        errors.contactInfo ? "border-red-500" : "border-frost"
                      }`}
                      placeholder="name@company.com or phone number"
                    />
                    {errors.contactInfo && (
                      <p id="contact-error" className="mt-1 text-xs text-red-600" role="alert">
                        {errors.contactInfo}
                      </p>
                    )}
                  </div>

                  {/* What do you need? Select */}
                  <div>
                    <label htmlFor="need-select" className="block font-body text-sm font-medium text-ink">
                      What do you need?
                    </label>
                    <select
                      id="need-select"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        onServiceChange(e.target.value);
                      }}
                      className="mt-2 block w-full rounded-[2px] border border-frost bg-paper px-4 py-3 text-base text-ink transition-colors duration-150 focus:border-north-blue focus:outline-none cursor-pointer"
                    >
                      {contactContent.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message-input" className="block font-body text-sm font-medium text-ink">
                      Message <span className="text-north-blue" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      rows={4}
                      required
                      aria-describedby={errors.message ? "message-error" : undefined}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      className={`mt-2 block w-full rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                        errors.message ? "border-red-500" : "border-frost"
                      }`}
                      placeholder="Tell us what you're looking to build..."
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {formStatus === "error" && (
                    <div className="rounded-[2px] border border-red-200 bg-red-50 p-4 text-xs text-red-700" role="alert" aria-live="polite">
                      {contactContent.errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-up Toast Notification (200ms) */}
      {copiedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper shadow-lg border border-frost/20 animate-fadeUp"
        >
          {contactContent.toastMessage}
        </div>
      )}
    </section>
  );
};
