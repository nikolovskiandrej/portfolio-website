"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccountView() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="flex min-h-[80vh] items-center bg-ivory pb-section-sm pt-32">
      <Container size="narrow">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} className="mb-12" />
        <div className="mx-auto max-w-md text-center">
          <p className="label-gold mb-5">The Collector’s Room</p>
          <h1 className="font-display text-display-sm font-light leading-[1.02] text-ink">
            Welcome back.
          </h1>
          <p className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-ink-muted">
            Sign in to follow your orders, manage warranties and revisit the pieces you have saved.
          </p>

          {submitted ? (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 border border-gold/40 bg-gold/[0.05] p-8 text-left"
              role="status"
            >
              <h2 className="font-display text-2xl font-light text-ink">Check your inbox.</h2>
              <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-muted">
                If <span className="text-ink-soft">{email}</span> belongs to a Barro client, a secure
                sign-in link is on its way. The collector’s room is currently offered by invitation —
                your concierge can extend one at any time.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-10 flex flex-col gap-5 text-left"
            >
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="account-email"
                  className="font-sans text-2xs uppercase tracking-luxe text-ink-muted"
                >
                  Email
                </label>
                <input
                  id="account-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    "w-full border-0 border-b border-line bg-transparent pb-2.5 font-serif text-lg text-ink",
                    "placeholder:text-ink-faint/60 transition-colors focus:border-ink focus:outline-none",
                  )}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
                Continue
              </Button>
            </form>
          )}

          <p className="mt-10 font-serif text-sm text-ink-faint">
            New to the Maison?{" "}
            <Link href="/contact" className="link-underline text-oxblood">
              Speak with our concierge
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
