import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { siteConstants, contactContent, isFilled } from "../content/site";
import { countryCodes, getCountryByLocale, matchDialCode } from "../content/countryCodes";

// Note: Client-side limits can be bypassed by bots that post directly to Formspree,
// so Formspree spam settings must also be on.

interface ContactProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

const STORAGE_KEY = "fn_form_sends";
const ONE_HOUR_MS = 60 * 60 * 1000;
const COOLDOWN_SECONDS = 60;
const HOURLY_LIMIT = 3;

let memorySends: number[] = [];

export function getSendTimestamps(): number[] {
  const now = Date.now();
  let timestamps: number[] = [];
  try {
    const raw = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        timestamps = parsed.filter((t: unknown): t is number => typeof t === "number" && now - t < ONE_HOUR_MS);
        if (timestamps.length !== parsed.length) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
        }
      }
    } else {
      timestamps = memorySends.filter((t) => now - t < ONE_HOUR_MS);
    }
  } catch {
    timestamps = memorySends.filter((t) => now - t < ONE_HOUR_MS);
  }
  memorySends = timestamps;
  return timestamps;
}

export function recordSendTimestamp(time: number = Date.now()): void {
  const current = getSendTimestamps();
  current.push(time);
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    // In-memory fallback
  }
  memorySends = current;
}

export const Contact: React.FC<ContactProps> = ({ selectedService, onServiceChange }) => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    _gotcha: "",
    service: selectedService || contactContent.options[0],
    message: "",
  });

  const [selectedCountryIso, setSelectedCountryIso] = useState<string>(() => {
    if (typeof navigator !== "undefined" && navigator.language) {
      const matched = getCountryByLocale(navigator.language);
      if (matched) return matched.iso;
    }
    return "";
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);
  const [copiedButtonText, setCopiedButtonText] = useState(false);

  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [isHourlyCapped, setIsHourlyCapped] = useState<boolean>(false);

  const formMountTimeRef = useRef<number>(Date.now());
  const isSubmittingRef = useRef<boolean>(false);

  // Monitor cooldown and hourly cap
  useEffect(() => {
    const checkLimits = () => {
      const sends = getSendTimestamps();
      const now = Date.now();
      const lastSend = sends.length > 0 ? Math.max(...sends) : 0;
      const remaining = Math.max(0, Math.ceil((COOLDOWN_SECONDS * 1000 - (now - lastSend)) / 1000));
      setCooldownRemaining(remaining);
      setIsHourlyCapped(sends.length >= HOURLY_LIMIT);
    };

    checkLimits();
    const interval = setInterval(checkLimits, 500);
    return () => clearInterval(interval);
  }, []);

  // Pre-fill from products page ("Ask about [name]")
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

  const validateContactMethods = (
    emailVal: string,
    phoneVal: string,
    countryIso: string
  ): { emailErr: string; phoneErr: string } => {
    const hasEmail = emailVal.trim().length > 0;
    const digits = phoneVal.replace(/\D/g, "");
    const hasPhone = digits.length > 0;

    let emailErr = "";
    let phoneErr = "";

    if (!hasEmail && !hasPhone) {
      emailErr = "Please give us an email or a mobile number.";
      phoneErr = "Please give us an email or a mobile number.";
    } else {
      if (hasEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal.trim())) {
          emailErr = "Enter a valid email address.";
        }
      }
      if (hasPhone) {
        const country = countryCodes.find((c) => c.iso === countryIso);
        const countryDigits = country ? country.dial.replace(/\D/g, "") : "";
        if (
          !country ||
          digits.length < 6 ||
          digits.length > 14 ||
          countryDigits.length + digits.length > 15
        ) {
          phoneErr = "Enter a valid mobile number.";
        }
      }
    }

    return { emailErr, phoneErr };
  };

  const runValidation = (data = formData, iso = selectedCountryIso) => {
    const errs: Record<string, string> = {};

    if (!data.name.trim()) {
      errs.name = "Please enter your name.";
    }

    const { emailErr, phoneErr } = validateContactMethods(data.email, data.phone, iso);
    if (emailErr) errs.email = emailErr;
    if (phoneErr) errs.phone = phoneErr;

    const trimmedMsg = data.message.trim();
    if (!trimmedMsg) {
      errs.message = "Please write a short message.";
    } else if (trimmedMsg.length < 10) {
      errs.message = "Message must be at least 10 characters.";
    } else {
      const urlMatches = data.message.match(/(?:https?:\/\/|www\.)\S+/gi);
      if (urlMatches && urlMatches.length > 2) {
        errs.message = "Please remove some links and try again.";
      }
    }

    setErrors(errs);
    return errs;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));

    if (touched.name || errors.name) {
      if (!val.trim()) {
        setErrors((prev) => ({ ...prev, name: "Please enter your name." }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));

    if (touched.email || errors.email) {
      const { emailErr, phoneErr } = validateContactMethods(val, formData.phone, selectedCountryIso);
      setErrors((prev) => ({
        ...prev,
        email: emailErr,
        phone: errors.phone === "Please give us an email or a mobile number." ? phoneErr : prev.phone,
      }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIso = e.target.value;
    setSelectedCountryIso(newIso);

    if (touched.phone || errors.phone) {
      const { phoneErr, emailErr } = validateContactMethods(formData.email, formData.phone, newIso);
      setErrors((prev) => ({
        ...prev,
        phone: phoneErr,
        email: errors.email ? emailErr : prev.email,
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // If international format with leading + is pasted/typed
    if (val.startsWith("+")) {
      const matched = matchDialCode(val);
      if (matched) {
        setSelectedCountryIso(matched.country.iso);
        val = matched.nationalNumber;
      } else {
        val = val.replace(/^\++/, "");
      }
    }

    // Remove leading 0s
    val = val.replace(/^0+/, "");

    // Allow only digits, spaces, dashes, and parentheses
    val = val.replace(/[^\d\s\-()]/g, "");

    setFormData((prev) => ({ ...prev, phone: val }));

    if (touched.phone || errors.phone) {
      const { phoneErr, emailErr } = validateContactMethods(formData.email, val, selectedCountryIso);
      setErrors((prev) => ({
        ...prev,
        phone: phoneErr,
        email: errors.email === "Please give us an email or a mobile number." ? emailErr : prev.email,
      }));
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted.startsWith("+")) {
      const matched = matchDialCode(pasted);
      if (matched) {
        e.preventDefault();
        setSelectedCountryIso(matched.country.iso);
        const cleanNum = matched.nationalNumber.replace(/^0+/, "").replace(/[^\d\s\-()]/g, "");
        setFormData((prev) => ({ ...prev, phone: cleanNum }));

        if (touched.phone || errors.phone) {
          const { phoneErr, emailErr } = validateContactMethods(formData.email, cleanNum, matched.country.iso);
          setErrors((prev) => ({
            ...prev,
            phone: phoneErr,
            email: errors.email === "Please give us an email or a mobile number." ? emailErr : prev.email,
          }));
        }
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, message: val }));

    if (touched.message || errors.message) {
      const trimmed = val.trim();
      if (!trimmed) {
        setErrors((prev) => ({ ...prev, message: "Please write a short message." }));
      } else if (trimmed.length < 10) {
        setErrors((prev) => ({ ...prev, message: "Message must be at least 10 characters." }));
      } else {
        const urlMatches = val.match(/(?:https?:\/\/|www\.)\S+/gi);
        if (urlMatches && urlMatches.length > 2) {
          setErrors((prev) => ({ ...prev, message: "Please remove some links and try again." }));
        } else {
          setErrors((prev) => ({ ...prev, message: "" }));
        }
      }
    }
  };

  const handleBlur = (field: "name" | "email" | "phone" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "name") {
      if (!formData.name.trim()) {
        setErrors((prev) => ({ ...prev, name: "Please enter your name." }));
      }
    } else if (field === "email" || field === "phone") {
      const hasEmail = formData.email.trim().length > 0;
      const digits = formData.phone.replace(/\D/g, "");
      const hasPhone = digits.length > 0;

      if (!hasEmail && !hasPhone) {
        if (errors.email || errors.phone || (touched.email && touched.phone)) {
          const { emailErr, phoneErr } = validateContactMethods(formData.email, formData.phone, selectedCountryIso);
          setErrors((prev) => ({ ...prev, email: emailErr, phone: phoneErr }));
        }
      } else {
        const { emailErr, phoneErr } = validateContactMethods(formData.email, formData.phone, selectedCountryIso);
        setErrors((prev) => ({
          ...prev,
          email: emailErr || (errors.email === "Please give us an email or a mobile number." ? "" : prev.email),
          phone: phoneErr || (errors.phone === "Please give us an email or a mobile number." ? "" : prev.phone),
        }));
      }
    } else if (field === "message") {
      const trimmed = formData.message.trim();
      if (!trimmed) {
        if (errors.message) {
          setErrors((prev) => ({ ...prev, message: "Please write a short message." }));
        }
      } else if (trimmed.length < 10) {
        setErrors((prev) => ({ ...prev, message: "Message must be at least 10 characters." }));
      } else {
        const urlMatches = formData.message.match(/(?:https?:\/\/|www\.)\S+/gi);
        if (urlMatches && urlMatches.length > 2) {
          setErrors((prev) => ({ ...prev, message: "Please remove some links and try again." }));
        } else if (errors.message) {
          setErrors((prev) => ({ ...prev, message: "" }));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formStatus === "submitting" || isSubmittingRef.current) return;

    const errs = runValidation();
    setTouched({ name: true, email: true, phone: true, message: true });

    if (Object.keys(errs).length > 0) {
      if (errs.name) {
        document.getElementById("name-input")?.focus();
      } else if (errs.email && !formData.email.trim() && !formData.phone.trim()) {
        document.getElementById("email-input")?.focus();
      } else if (errs.email) {
        document.getElementById("email-input")?.focus();
      } else if (errs.phone) {
        if (!selectedCountryIso) {
          document.getElementById("country-select")?.focus();
        } else {
          document.getElementById("phone-input")?.focus();
        }
      } else if (errs.message) {
        document.getElementById("message-input")?.focus();
      }
      return;
    }

    // 1. Honeypot check: pretend success, send nothing
    if (formData._gotcha.trim().length > 0) {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        _gotcha: "",
        service: contactContent.options[0],
        message: "",
      });
      setErrors({});
      setTouched({});
      return;
    }

    // 2. Minimum fill time (3 seconds): pretend success, send nothing
    if (Date.now() - formMountTimeRef.current < 3000) {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        _gotcha: "",
        service: contactContent.options[0],
        message: "",
      });
      setErrors({});
      setTouched({});
      return;
    }

    // 3 & 4. Rate limits check
    const sends = getSendTimestamps();
    const now = Date.now();
    const lastSend = sends.length > 0 ? Math.max(...sends) : 0;
    const remaining = Math.max(0, Math.ceil((COOLDOWN_SECONDS * 1000 - (now - lastSend)) / 1000));
    if (remaining > 0 || sends.length >= HOURLY_LIMIT) {
      return;
    }

    setFormStatus("submitting");
    isSubmittingRef.current = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const payload: Record<string, string> = {
      name: formData.name.trim(),
      need: formData.service,
      message: formData.message.trim(),
      _gotcha: "",
    };

    if (formData.email.trim()) {
      payload.email = formData.email.trim();
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits) {
      const country = countryCodes.find((c) => c.iso === selectedCountryIso);
      const dialDigits = country ? country.dial.replace(/\D/g, "") : "";
      payload.phone = `+${dialDigits}${phoneDigits}`;
    }

    try {
      if (isFilled(siteConstants.formspreeId)) {
        const response = await fetch(`https://formspree.io/f/${siteConstants.formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          recordSendTimestamp(Date.now());
          setFormStatus("success");
          setFormData({
            name: "",
            email: "",
            phone: "",
            _gotcha: "",
            service: contactContent.options[0],
            message: "",
          });
          setErrors({});
          setTouched({});
        } else {
          setFormStatus("error");
        }
      } else {
        // Mock submit when Formspree ID is [FILL] placeholder
        clearTimeout(timeoutId);
        await new Promise((resolve) => setTimeout(resolve, 400));
        recordSendTimestamp(Date.now());
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          _gotcha: "",
          service: contactContent.options[0],
          message: "",
        });
        setErrors({});
        setTouched({});
      }
    } catch {
      clearTimeout(timeoutId);
      setFormStatus("error");
    } finally {
      isSubmittingRef.current = false;
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
                    onClick={() => {
                      setFormStatus("idle");
                      formMountTimeRef.current = Date.now();
                    }}
                    className="mt-6 text-sm font-medium text-north-blue hover:underline focus-visible:outline-2 focus-visible:outline-north-blue"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot field for bot protection */}
                  <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                    <label htmlFor="_gotcha">Leave this field empty</label>
                    <input
                      id="_gotcha"
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._gotcha}
                      onChange={(e) => setFormData((prev) => ({ ...prev, _gotcha: e.target.value }))}
                    />
                  </div>

                  {/* 1. Name field (required) */}
                  <div>
                    <label htmlFor="name-input" className="block font-body text-sm font-medium text-ink">
                      Name <span className="text-north-blue" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={formData.name}
                      onChange={handleNameChange}
                      onBlur={() => handleBlur("name")}
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

                  {/* 2. Email field */}
                  <div>
                    <label htmlFor="email-input" className="block font-body text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      autoComplete="email"
                      maxLength={120}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={formData.email}
                      onChange={handleEmailChange}
                      onBlur={() => handleBlur("email")}
                      className={`mt-2 block w-full rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                        errors.email ? "border-red-500" : "border-frost"
                      }`}
                      placeholder="name@company.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* 3. Mobile number field */}
                  <div>
                    <label htmlFor="phone-input" className="block font-body text-sm font-medium text-ink">
                      Mobile number
                    </label>
                    <div className="mt-2 flex gap-2">
                      <label htmlFor="country-select" className="sr-only">
                        Country code
                      </label>
                      <select
                        id="country-select"
                        aria-label="Country code"
                        value={selectedCountryIso}
                        onChange={handleCountryChange}
                        className={`w-[110px] sm:w-[130px] shrink-0 truncate rounded-[2px] border bg-paper px-2 sm:px-3 py-3 text-base text-ink cursor-pointer focus:border-north-blue focus:outline-none ${
                          errors.phone && !selectedCountryIso ? "border-red-500" : "border-frost"
                        }`}
                      >
                        <option value="">Code</option>
                        {countryCodes.map((c) => (
                          <option key={c.iso} value={c.iso}>
                            {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                      <input
                        id="phone-input"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="Mobile number"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onPaste={handlePhonePaste}
                        onBlur={() => handleBlur("phone")}
                        className={`block w-full min-w-0 flex-1 rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                          errors.phone ? "border-red-500" : "border-frost"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Helper text under Email and Mobile number fields */}
                  <p className="-mt-3 font-body text-xs text-slate">
                    Fill in at least one. We will reply on whichever you give.
                  </p>

                  {/* 4. What do you need? Select */}
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

                  {/* 5. Message field (required) */}
                  <div>
                    <label htmlFor="message-input" className="block font-body text-sm font-medium text-ink">
                      Message <span className="text-north-blue" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      rows={4}
                      maxLength={2000}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      value={formData.message}
                      onChange={handleMessageChange}
                      onBlur={() => handleBlur("message")}
                      className={`mt-2 block w-full rounded-[2px] border bg-paper px-4 py-3 text-base text-ink placeholder-slate/50 transition-colors duration-150 focus:border-north-blue focus:outline-none ${
                        errors.message ? "border-red-500" : "border-frost"
                      }`}
                      placeholder="Tell us what you're looking to build..."
                    />
                    <div className="flex items-center justify-between">
                      {errors.message ? (
                        <p id="message-error" className="mt-1 text-xs text-red-600" role="alert">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      {formData.message.length >= 1800 && (
                        <span className="mt-1 text-xs text-slate ml-auto" aria-live="polite">
                          {formData.message.length} / 2000
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Error banner */}
                  {formStatus === "error" && (
                    <div className="rounded-[2px] border border-red-200 bg-red-50 p-4 text-xs text-red-700" role="alert" aria-live="polite">
                      {contactContent.errorMessage}
                    </div>
                  )}

                  {/* Submit Button & Inline Rate Limit Messages */}
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting" || cooldownRemaining > 0 || isHourlyCapped}
                      className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-paper transition-all duration-150 hover:-translate-y-[1px] hover:bg-slate disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2"
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send message"}
                    </button>

                    {cooldownRemaining > 0 ? (
                      <p className="mt-2 text-xs text-slate" role="status" aria-live="polite">
                        Please wait {cooldownRemaining} seconds before sending another message.
                      </p>
                    ) : isHourlyCapped ? (
                      <p className="mt-2 text-xs text-slate" role="status" aria-live="polite">
                        You have sent several messages already. Please try again later, or{" "}
                        <a
                          href={siteConstants.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-north-blue underline hover:text-ink focus-visible:outline-2 focus-visible:outline-north-blue"
                        >
                          message us on Instagram
                        </a>
                        .
                      </p>
                    ) : null}
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
