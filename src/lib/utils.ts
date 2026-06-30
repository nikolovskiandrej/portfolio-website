import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENCIES = {
  EUR: { symbol: "€", rate: 1, locale: "de-DE" },
  USD: { symbol: "$", rate: 1.08, locale: "en-US" },
  GBP: { symbol: "£", rate: 0.85, locale: "en-GB" },
  CHF: { symbol: "CHF", rate: 0.96, locale: "de-CH" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

/** Format a base (EUR) price into the chosen currency, no decimals for whole prices. */
export function formatPrice(amountEur: number, currency: CurrencyCode = "EUR") {
  const { rate, locale } = CURRENCIES[currency];
  const value = Math.round(amountEur * rate);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}
