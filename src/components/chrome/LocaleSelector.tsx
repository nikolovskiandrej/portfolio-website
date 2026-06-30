"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { currencies, languages } from "@/lib/data/navigation";
import { CURRENCIES, type CurrencyCode } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LocaleSelector({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const { currency, setCurrency } = useStore();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        data-cursor-label="Region"
        className={cn(
          "group inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-luxe outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
          tone === "cream"
            ? "text-cream/85 hover:text-gold-pale focus-visible:ring-offset-transparent"
            : "text-ink-soft hover:text-oxblood focus-visible:ring-offset-ivory",
        )}
      >
        <span className="tnum">{CURRENCIES[currency].symbol} {currency}</span>
        <ChevronDown className="h-3 w-3 transition-transform duration-500 ease-luxe group-data-[state=open]:rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={18}
          className="z-[210] w-60 origin-top-right border border-line bg-cream/98 p-2 shadow-luxe backdrop-blur-md data-[state=open]:animate-fade-in"
        >
          <p className="px-3 pb-1.5 pt-2 font-sans text-[9px] uppercase tracking-luxe text-ink-faint">
            Currency
          </p>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
            <DropdownMenu.Item
              key={code}
              onSelect={() => setCurrency(code)}
              className="flex cursor-pointer items-center justify-between px-3 py-2 font-sans text-[11px] uppercase tracking-wide text-ink-soft outline-none transition-colors data-[highlighted]:bg-parchment data-[highlighted]:text-ink"
            >
              <span>
                <span className="tnum mr-2 text-ink">{CURRENCIES[code].symbol}</span>
                {code} · {currencies.find((c) => c.code === code)?.label}
              </span>
              {currency === code && <Check className="h-3.5 w-3.5 text-gold-dark" />}
            </DropdownMenu.Item>
          ))}

          <div className="hairline my-2 opacity-60" />

          <p className="px-3 pb-1.5 pt-1 font-sans text-[9px] uppercase tracking-luxe text-ink-faint">
            Language
          </p>
          <div className="grid grid-cols-2 gap-0.5">
            {languages.map((lang, i) => (
              <DropdownMenu.Item
                key={lang}
                className={cn(
                  "cursor-pointer px-3 py-1.5 font-sans text-[11px] tracking-wide outline-none transition-colors data-[highlighted]:bg-parchment data-[highlighted]:text-ink",
                  i === 1 ? "text-ink" : "text-ink-muted",
                )}
              >
                {lang}
                {i === 1 && <span className="ml-1.5 text-gold-dark">·</span>}
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
