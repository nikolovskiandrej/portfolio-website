"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Watch } from "@/lib/types";
import type { CurrencyCode } from "@/lib/utils";

const CART_KEY = "barro.cart.v1";
const WISH_KEY = "barro.wishlist.v1";
const CUR_KEY = "barro.currency.v1";

interface StoreValue {
  /* cart */
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (watch: Watch, strapId?: string, quantity?: number) => void;
  removeFromCart: (lineKey: string) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  clearCart: () => void;
  lineKey: (watchId: string, strapId: string) => string;
  /* wishlist */
  wishlist: string[];
  wishlistCount: number;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
  /* currency */
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /* overlay ui */
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  quickView: string | null;
  setQuickView: (slug: string | null) => void;
  /* convenience */
  flash: string | null;
}

const StoreContext = createContext<StoreValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

const keyOf = (watchId: string, strapId: string) => `${watchId}__${strapId}`;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrencyState] = useState<CurrencyCode>("EUR");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  /* hydrate from localStorage */
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      const cur = localStorage.getItem(CUR_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (cur) setCurrencyState(cur as CurrencyCode);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(CUR_KEY, currency);
  }, [currency, hydrated]);

  /* flash auto-clear */
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2600);
    return () => clearTimeout(t);
  }, [flash]);

  const addToCart = useCallback((watch: Watch, strapId?: string, quantity = 1) => {
    const strap = watch.straps.find((s) => s.id === strapId) ?? watch.straps[0];
    const key = keyOf(watch.id, strap.id);
    setCart((prev) => {
      const existing = prev.find((l) => keyOf(l.watchId, l.strapId) === key);
      if (existing) {
        return prev.map((l) =>
          keyOf(l.watchId, l.strapId) === key ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [
        ...prev,
        {
          watchId: watch.id,
          slug: watch.slug,
          name: watch.name,
          collectionName: watch.collectionName,
          price: watch.price,
          image: watch.images[0],
          strapId: strap.id,
          strapName: strap.name,
          quantity,
        },
      ];
    });
    setFlash(`${watch.name} added to your selection`);
  }, []);

  const removeFromCart = useCallback((lineKey: string) => {
    setCart((prev) => prev.filter((l) => keyOf(l.watchId, l.strapId) !== lineKey));
  }, []);

  const updateQuantity = useCallback((lineKey: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((l) => (keyOf(l.watchId, l.strapId) === lineKey ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => setCurrencyState(c), []);

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((n, l) => n + l.price * l.quantity, 0), [cart]);

  const value: StoreValue = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    lineKey: keyOf,
    wishlist,
    wishlistCount: wishlist.length,
    isWishlisted: (slug) => wishlist.includes(slug),
    toggleWishlist,
    currency,
    setCurrency,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    menuOpen,
    setMenuOpen,
    quickView,
    setQuickView,
    flash,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
