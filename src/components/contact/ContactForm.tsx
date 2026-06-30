"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "General Enquiry",
  "Purchase Advice",
  "Book an Appointment",
  "Servicing & Care",
  "Press & Partnerships",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  boutique: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: INTERESTS[0],
  boutique: "",
  message: "",
};

export function ContactForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "A valid email is required.";
    if (form.message.trim().length < 10) next.message = "A short message helps us assist you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    /* No backend in this demo — acknowledge gracefully. */
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-5 border border-gold/40 bg-gold/[0.05] p-10 sm:p-14"
        role="status"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
          <Check className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <h3 className="font-display text-3xl font-light text-ink">Grazie, {form.name.split(" ")[0]}.</h3>
        <p className="max-w-md font-serif text-lg leading-relaxed text-ink-muted">
          Your message has reached the Barro concierge. A member of the Maison will respond within
          two business days — often sooner.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
          className="mt-1 font-sans text-2xs uppercase tracking-luxe text-oxblood transition-opacity hover:opacity-70"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={inputCls(errors.name)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Telephone" htmlFor="phone" optional>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls()}
            placeholder="Optional"
          />
        </Field>
        <Field label="I am writing about" htmlFor="interest">
          <div className="relative">
            <select id="interest" value={form.interest} onChange={set("interest")} className={selectCls()}>
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <Caret />
          </div>
        </Field>
      </div>

      <Field label="Preferred boutique" htmlFor="boutique" optional>
        <div className="relative">
          <select id="boutique" value={form.boutique} onChange={set("boutique")} className={selectCls()}>
            <option value="">No preference</option>
            {site.boutiques.map((b) => (
              <option key={b.city} value={b.city}>
                {b.city} — {b.address}
              </option>
            ))}
          </select>
          <Caret />
        </div>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={set("message")}
          className={cn(inputCls(errors.message), "resize-none")}
          placeholder="How may the Maison assist you?"
        />
      </Field>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm font-serif text-sm text-ink-faint">
          Your details are held in confidence and used solely to respond to your enquiry.
        </p>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          Send to Concierge
        </Button>
      </div>
    </form>
  );
}

/* ── bits ─────────────────────────────────────────────────── */

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-ink-muted"
      >
        {label}
        {optional && <span className="text-ink-faint/70 normal-case tracking-normal">· optional</span>}
      </label>
      {children}
      {error && (
        <span role="alert" className="font-serif text-sm italic text-oxblood">
          {error}
        </span>
      )}
    </div>
  );
}

function Caret() {
  return (
    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink-faint">
      ▾
    </span>
  );
}

const inputCls = (error?: string) =>
  cn(
    "w-full border-0 border-b bg-transparent pb-2.5 font-serif text-lg text-ink placeholder:text-ink-faint/60 focus:outline-none transition-colors",
    error ? "border-oxblood" : "border-line focus:border-ink",
  );

const selectCls = () =>
  cn(
    "w-full cursor-pointer appearance-none border-0 border-b border-line bg-transparent pb-2.5 pr-7 font-serif text-lg text-ink focus:border-ink focus:outline-none transition-colors",
  );
