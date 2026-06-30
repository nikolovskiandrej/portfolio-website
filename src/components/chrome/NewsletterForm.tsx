"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ tone = "cream" }: { tone?: "cream" | "ink" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const onCream = tone === "cream";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <p
        className={cn(
          "flex items-center gap-3 font-serif text-lg italic",
          onCream ? "text-cream" : "text-ink",
        )}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold">
          <Check className="h-4 w-4" strokeWidth={1.6} />
        </span>
        Grazie — welcome to the Maison.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "relative flex items-center border-b transition-colors",
          onCream ? "border-cream/30 focus-within:border-gold" : "border-ink/30 focus-within:border-oxblood",
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={cn(
            "w-full bg-transparent py-4 pr-12 font-serif text-lg focus:outline-none",
            onCream
              ? "text-cream placeholder:text-cream/40"
              : "text-ink placeholder:text-ink-faint",
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          data-cursor-label="Subscribe"
          className={cn(
            "absolute right-0 inline-flex h-10 w-10 items-center justify-center transition-colors",
            onCream ? "text-cream hover:text-gold" : "text-ink hover:text-oxblood",
          )}
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.4} />
        </button>
      </div>
    </form>
  );
}
