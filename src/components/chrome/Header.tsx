"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { useMounted, useScrolled } from "@/lib/hooks";
import { mainNav } from "@/lib/data/navigation";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { WatchImage } from "@/components/common/WatchImage";
import { Logo } from "./Logo";
import { LocaleSelector } from "./LocaleSelector";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Routes that render a dark, full-bleed hero behind the header. Only on these
   may the header sit transparent (with light text) at the top of the page;
   every other route gets the solid treatment from the first pixel so the
   navigation stays legible over light backgrounds. */
const DARK_HERO_PREFIXES = [
  "/about",
  "/contact",
  "/collections",
  "/men",
  "/women",
  "/unisex",
  "/metal-strap",
  "/leather-strap",
  "/new-arrivals",
  "/limited-edition",
];

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(40);
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const { cartCount, wishlistCount, setSearchOpen, setCartOpen, setMenuOpen } = useStore();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const overHero =
    pathname === "/" ||
    DARK_HERO_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  /* `compact` drives the header height and is independent of the mega-menu, so
     hovering a nav item never collapses the bar (which previously caused a 20px
     jump — and a flicker when the shrink pulled the cursor off the header).
     `solid` drives the background/text and additionally turns opaque while the
     mega-menu is open so the panel reads against a legible bar. */
  const compact = !overHero || scrolled;
  const solid = compact || activeMenu !== null;
  const onDark = !solid;

  /* Close the mega-menu on route change. */
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  /* Close on Escape + when the page scrolls. */
  useEffect(() => {
    if (activeMenu === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveMenu(null);
    const onScroll = () => setActiveMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [activeMenu]);

  const activeItem = mainNav.find((i) => i.label === activeMenu && i.columns);

  return (
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={cn(
        "fixed inset-x-0 top-0 z-[150] transition-[background-color,box-shadow,border-color] duration-700 ease-luxe",
        solid
          ? "border-b border-line/80 bg-cream/90 shadow-[0_1px_30px_-12px_rgba(30,26,22,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container size="wide">
        <div
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-[height] duration-700 ease-luxe",
            compact ? "h-[68px]" : "h-[88px]",
          )}
        >
          {/* Col 1 — logo (desktop) / hamburger (mobile) */}
          <div className="flex items-center justify-self-start">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              data-cursor-label="Menu"
              className={cn(
                "-ml-2 inline-flex h-11 w-11 items-center justify-center transition-colors duration-500 lg:hidden",
                onDark ? "text-cream" : "text-ink",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <div className="hidden lg:block">
              <Logo tone={onDark ? "cream" : "ink"} />
            </div>
          </div>

          {/* Col 2 — nav (desktop) / logo (mobile) */}
          <div className="flex items-center justify-center">
            <div className="lg:hidden">
              <Logo tone={onDark ? "cream" : "ink"} />
            </div>
            <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-9 lg:flex">
              {mainNav.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  active={activeMenu === item.label}
                  onDark={onDark}
                  onActivate={() => setActiveMenu(item.columns ? item.label : null)}
                />
              ))}
            </nav>
          </div>

          {/* Right — utilities */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <div className="mr-1 hidden lg:block">
              <LocaleSelector tone={onDark ? "cream" : "ink"} />
            </div>

            <IconButton
              label="Search"
              onClick={() => setSearchOpen(true)}
              onDark={onDark}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </IconButton>

            <Link
              href="/account"
              aria-label="Account"
              data-cursor-label="Account"
              className={cn(iconBtnClass, "hidden sm:inline-flex", onDark ? "text-cream" : "text-ink")}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${mounted && wishlistCount ? `, ${wishlistCount} items` : ""}`}
              data-cursor-label="Wishlist"
              className={cn(iconBtnClass, "relative hidden sm:inline-flex", onDark ? "text-cream" : "text-ink")}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {mounted && wishlistCount > 0 && <Dot onDark={onDark}>{wishlistCount}</Dot>}
            </Link>

            <IconButton
              label="Cart"
              onClick={() => setCartOpen(true)}
              onDark={onDark}
              className="relative"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {mounted && cartCount > 0 && <Dot onDark={onDark}>{cartCount}</Dot>}
            </IconButton>
          </div>
        </div>
      </Container>

      {/* Mega-menu */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key={activeItem.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 top-full hidden border-t border-line/70 bg-cream/95 backdrop-blur-xl lg:block"
          >
            <MegaPanel item={activeItem} onNavigate={() => setActiveMenu(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Nav link ─────────────────────────────────────────────── */

function NavLink({
  item,
  active,
  onDark,
  onActivate,
}: {
  item: NavItem;
  active: boolean;
  onDark: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-expanded={item.columns ? active : undefined}
      data-cursor-label={item.label}
      className={cn(
        "group relative py-2 font-sans text-[11px] uppercase tracking-luxe transition-colors duration-500",
        onDark
          ? "text-cream/85 hover:text-gold-pale"
          : active
            ? "text-oxblood"
            : "text-ink-soft hover:text-oxblood",
      )}
    >
      {item.label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-luxe group-hover:scale-x-100",
          active && "scale-x-100",
        )}
      />
    </Link>
  );
}

/* ── Mega-menu panel ──────────────────────────────────────── */

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <Container size="wide" className="py-12">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7 grid grid-cols-3 gap-x-8 gap-y-10">
          {item.columns?.map((col, ci) => (
            <div key={`${col.heading}-${ci}`}>
              <p className="label-gold mb-5 border-b border-line/70 pb-3">
                {col.heading.trim() || " "}
              </p>
              <ul className="flex flex-col gap-4">
                {col.items.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className="group block"
                      data-cursor-label="View"
                    >
                      <span className="block font-display text-xl font-light text-ink transition-colors duration-300 group-hover:text-oxblood">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 block font-serif text-sm text-ink-faint">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {item.feature && (
          <div className="col-span-5">
            <Link
              href={item.feature.href}
              onClick={onNavigate}
              data-cursor-label="Discover"
              className="group relative block aspect-[16/10] overflow-hidden"
            >
              <WatchImage
                src={item.feature.image}
                alt={item.feature.title}
                treatment="deep"
                vignette
                sizes="(max-width: 1024px) 0px, 38vw"
                className="h-full w-full"
                imgClassName="transition-transform duration-1400 ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="label text-gold-pale">{item.feature.label}</span>
                <span className="mt-2 max-w-xs font-display text-3xl font-light leading-tight text-cream">
                  {item.feature.title}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-cream/80">
                  Discover
                  <span className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

/* ── Utility bits ─────────────────────────────────────────── */

const iconBtnClass =
  "inline-flex h-11 w-11 items-center justify-center transition-colors duration-500 hover:text-oxblood";

function IconButton({
  children,
  label,
  onClick,
  onDark,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  onDark: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor-label={label}
      className={cn(iconBtnClass, onDark ? "text-cream" : "text-ink", className)}
    >
      {children}
    </button>
  );
}

function Dot({ children, onDark }: { children: React.ReactNode; onDark: boolean }) {
  return (
    <span
      className={cn(
        "absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-sans text-[9px] font-medium leading-none tnum",
        onDark ? "bg-gold text-espresso" : "bg-oxblood text-cream",
      )}
    >
      {children}
    </span>
  );
}
