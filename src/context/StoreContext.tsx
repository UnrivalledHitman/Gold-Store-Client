'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  BoutiqueBooking,
  CartItem,
  CollectionSlug,
  DemoOrder,
  DemoOrderItem,
  GoldRates,
  MetalFinish,
  PriceBreakup,
  Product,
  PurityOption,
} from '@/types/store';
import { getProductById } from '@/data/products';
import {
  DEFAULT_GOLD_RATES,
  calculateProductPrice,
  deriveRatesFrom22K,
} from '@/lib/pricing';
import { PROMO_CODES } from '@/lib/siteConfig';

const STORAGE_KEYS = {
  rate22K: 'pixtacy_rate_22k_v1',
  cart: 'pixtacy_cart_v1',
  wishlist: 'pixtacy_wishlist_v1',
  giftBox: 'pixtacy_gift_box_v1',
  giftNote: 'pixtacy_gift_note_v1',
  promoCode: 'pixtacy_promo_code_v1',
  bookings: 'pixtacy_bookings_v1',
  orders: 'pixtacy_orders_v1',
} as const;

export interface AddToCartOptions {
  selectedMetal?: MetalFinish;
  selectedPurity?: PurityOption;
  ringSize?: number;
  engraving?: string;
  quantity?: number;
  openDrawer?: boolean;
}

export interface AddBookingInput {
  mode: 'boutique' | 'video';
  boutiqueId: string;
  boutiqueName: string;
  city: string;
  date: string;
  timeSlot: string;
  collectionInterest: CollectionSlug | 'all';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export interface PlaceDemoOrderInput {
  deliveryMethod: 'courier' | 'boutique_pickup';
  boutiqueName?: string;
  shippingAddress: DemoOrder['shippingAddress'];
  paymentMethod: 'upi' | 'card' | 'netbanking';
  estimatedDelivery?: string;
}

export interface PromoApplyResult {
  ok: boolean;
  message: string;
}

export interface StoreContextValue {
  mounted: boolean;
  goldRates: GoldRates;
  rate22K: number;
  setRate22K: (rate: number) => void;
  resetGoldRates: () => void;

  cart: CartItem[];
  cartCount: number;
  solisItemCount: number;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemBreakup: (item: CartItem) => PriceBreakup | null;

  giftBox: boolean;
  setGiftBox: (enabled: boolean) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;

  promoCode: string | null;
  applyPromoCode: (code: string) => PromoApplyResult;
  removePromoCode: () => void;

  subtotal: number;
  solisBundleDiscount: number;
  promoDiscount: number;
  total: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  bookings: BoutiqueBooking[];
  addBooking: (input: AddBookingInput) => BoutiqueBooking;

  orders: DemoOrder[];
  placeDemoOrder: (input: PlaceDemoOrderInput) => DemoOrder;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  isBookingOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  isPitchOpen: boolean;
  openPitchDrawer: () => void;
  closePitchDrawer: () => void;
  togglePitchDrawer: () => void;

  toastMessage: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function safeReadStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private browsing errors cleanly
  }
}

function buildCartItemId(
  productId: string,
  metal: MetalFinish,
  purity: PurityOption,
  ringSize?: number,
  engraving?: string
): string {
  return [
    productId,
    metal,
    purity,
    ringSize !== undefined ? `sz${ringSize}` : 'std',
    engraving ? engraving.toLowerCase() : 'plain',
  ].join('::');
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const [rate22K, setRate22KState] = useState<number>(DEFAULT_GOLD_RATES['22KT']);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [giftBox, setGiftBox] = useState<boolean>(false);
  const [giftNote, setGiftNote] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BoutiqueBooking[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedRate = safeReadStorage<number>(
      STORAGE_KEYS.rate22K,
      DEFAULT_GOLD_RATES['22KT']
    );
    if (typeof storedRate === 'number' && storedRate >= 4000 && storedRate <= 15000) {
      setRate22KState(Math.round(storedRate));
    }

    const storedCart = safeReadStorage<CartItem[]>(STORAGE_KEYS.cart, []);
    if (Array.isArray(storedCart)) {
      setCart(storedCart);
    }

    const storedWishlist = safeReadStorage<string[]>(STORAGE_KEYS.wishlist, []);
    if (Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
    }

    const storedGiftBox = safeReadStorage<boolean>(STORAGE_KEYS.giftBox, false);
    setGiftBox(Boolean(storedGiftBox));

    const storedGiftNote = safeReadStorage<string>(STORAGE_KEYS.giftNote, '');
    if (typeof storedGiftNote === 'string') {
      setGiftNote(storedGiftNote);
    }

    const storedPromo = safeReadStorage<string | null>(STORAGE_KEYS.promoCode, null);
    if (storedPromo === 'PIXTACY10' || storedPromo === 'FIRST500') {
      setPromoCode(storedPromo);
    }

    const storedBookings = safeReadStorage<BoutiqueBooking[]>(STORAGE_KEYS.bookings, []);
    if (Array.isArray(storedBookings)) {
      setBookings(storedBookings);
    }

    const storedOrders = safeReadStorage<DemoOrder[]>(STORAGE_KEYS.orders, []);
    if (Array.isArray(storedOrders)) {
      setOrders(storedOrders);
    }

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('pitch') === '1') {
        setIsPitchOpen(true);
      }
    } catch {
      // Ignore query parse failures
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.rate22K, rate22K);
  }, [mounted, rate22K]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.cart, cart);
  }, [mounted, cart]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.wishlist, wishlist);
  }, [mounted, wishlist]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.giftBox, giftBox);
  }, [mounted, giftBox]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.giftNote, giftNote);
  }, [mounted, giftNote]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.promoCode, promoCode);
  }, [mounted, promoCode]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.bookings, bookings);
  }, [mounted, bookings]);

  useEffect(() => {
    if (!mounted) return;
    safeWriteStorage(STORAGE_KEYS.orders, orders);
  }, [mounted, orders]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3200);
  }, []);

  const goldRates = useMemo<GoldRates>(
    () => deriveRatesFrom22K(rate22K),
    [rate22K]
  );

  const setRate22K = useCallback((rate: number) => {
    const clamped = Math.max(4000, Math.min(15000, Math.round(rate)));
    setRate22KState(clamped);
  }, []);

  const resetGoldRates = useCallback(() => {
    setRate22KState(DEFAULT_GOLD_RATES['22KT']);
    showToast('22KT Gold Rate reset to ₹7,195/g');
  }, [showToast]);

  const getCartItemBreakup = useCallback(
    (item: CartItem): PriceBreakup | null => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return calculateProductPrice(product, item.selectedPurity, goldRates);
    },
    [goldRates]
  );

  const addToCart = useCallback(
    (product: Product, options?: AddToCartOptions) => {
      const selectedMetal = options?.selectedMetal ?? product.metalVariants[0];
      const selectedPurity = options?.selectedPurity ?? product.purityOptions[0];
      const defaultRingSize =
        product.ringSizes && product.ringSizes.length > 0
          ? product.ringSizes.includes(14)
            ? 14
            : product.ringSizes[0]
          : undefined;
      const ringSize = options?.ringSize ?? defaultRingSize;
      const cleanedEngraving = options?.engraving?.trim().slice(0, 15) || undefined;
      const qtyToAdd = Math.max(1, options?.quantity ?? 1);
      const shouldOpenDrawer = options?.openDrawer ?? true;

      const cartItemId = buildCartItemId(
        product.id,
        selectedMetal,
        selectedPurity,
        ringSize,
        cleanedEngraving
      );

      setCart((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + qtyToAdd,
          };
          return updated;
        }
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            collection: product.collection,
            category: product.category,
            image: product.images[0],
            selectedMetal,
            selectedPurity,
            ringSize,
            engraving: cleanedEngraving,
            quantity: qtyToAdd,
          },
        ];
      });

      if (shouldOpenDrawer) {
        setIsSearchOpen(false);
        setIsWishlistOpen(false);
        setIsBookingOpen(false);
        setIsCartOpen(true);
      }
      showToast(`Added ${product.name} to Bag`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      showToast('Removed item from Bag');
    },
    [showToast]
  );

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const applyPromoCode = useCallback(
    (rawCode: string): PromoApplyResult => {
      const normalized = rawCode.trim().toUpperCase();
      if (normalized === 'PIXTACY10' || normalized === 'FIRST500') {
        setPromoCode(normalized);
        const config = PROMO_CODES[normalized];
        showToast(`${normalized} applied — ${config.label}`);
        return { ok: true, message: `${normalized} applied (${config.label})` };
      }
      return {
        ok: false,
        message: 'Invalid promo code. Try PIXTACY10 or FIRST500.',
      };
    },
    [showToast]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    showToast('Promo code removed');
  }, [showToast]);

  const {
    cartCount,
    solisItemCount,
    subtotal,
    solisBundleDiscount,
    promoDiscount,
    total,
  } = useMemo(() => {
    let count = 0;
    let totalSubtotal = 0;
    let solisCount = 0;
    let solisSubtotal = 0;

    for (const item of cart) {
      const breakup = getCartItemBreakup(item);
      const unitPrice = breakup ? breakup.finalPrice : 0;
      const lineTotal = unitPrice * item.quantity;

      count += item.quantity;
      totalSubtotal += lineTotal;

      if (item.collection === 'solis') {
        solisCount += item.quantity;
        solisSubtotal += lineTotal;
      }
    }

    const bundleDiscount =
      solisCount >= 2 ? Math.round(solisSubtotal * 0.15) : 0;
    const afterBundle = Math.max(0, totalSubtotal - bundleDiscount);

    let computedPromoDiscount = 0;
    if (afterBundle > 0 && promoCode === 'PIXTACY10') {
      computedPromoDiscount = Math.round(afterBundle * 0.1);
    } else if (afterBundle > 0 && promoCode === 'FIRST500') {
      computedPromoDiscount = Math.min(500, afterBundle);
    }

    const finalTotal = Math.max(0, afterBundle - computedPromoDiscount);

    return {
      cartCount: count,
      solisItemCount: solisCount,
      subtotal: totalSubtotal,
      solisBundleDiscount: bundleDiscount,
      promoDiscount: computedPromoDiscount,
      total: finalTotal,
    };
  }, [cart, getCartItemBreakup, promoCode]);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          showToast('Removed from Wishlist');
          return prev.filter((id) => id !== productId);
        }
        showToast('Saved to Wishlist');
        return [...prev, productId];
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addBooking = useCallback(
    (input: AddBookingInput): BoutiqueBooking => {
      const booking: BoutiqueBooking = {
        ...input,
        id: `PIX-APT-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [booking, ...prev]);
      showToast(
        input.mode === 'video'
          ? 'Video Consultation scheduled'
          : `Boutique visit confirmed at ${input.city}`
      );
      return booking;
    },
    [showToast]
  );

  const placeDemoOrder = useCallback(
    (input: PlaceDemoOrderInput): DemoOrder => {
      const orderItems: DemoOrderItem[] = cart.map((item) => {
        const breakup = getCartItemBreakup(item);
        const unitPrice = breakup ? breakup.finalPrice : 0;
        return {
          productId: item.productId,
          name: item.name,
          collection: item.collection,
          image: item.image,
          selectedMetal: item.selectedMetal,
          selectedPurity: item.selectedPurity,
          ringSize: item.ringSize,
          engraving: item.engraving,
          quantity: item.quantity,
          unitPriceInr: unitPrice,
          lineTotalInr: unitPrice * item.quantity,
        };
      });

      const order: DemoOrder = {
        orderId: `PIX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        deliveryMethod: input.deliveryMethod,
        boutiqueName: input.boutiqueName,
        shippingAddress: input.shippingAddress,
        paymentMethod: input.paymentMethod,
        items: orderItems,
        subtotalInr: subtotal,
        solisBundleDiscountInr: solisBundleDiscount,
        promoCode: promoCode ?? undefined,
        promoDiscountInr: promoDiscount,
        totalInr: total,
        giftBox,
        giftNote: giftNote.trim() || undefined,
        estimatedDelivery:
          input.estimatedDelivery ??
          (input.deliveryMethod === 'boutique_pickup'
            ? 'Ready for Salon Pickup within 24 hours'
            : 'Complimentary Insured Courier in 2–4 business days'),
      };

      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setPromoCode(null);
      setGiftBox(false);
      setGiftNote('');
      showToast(`Demo Order ${order.orderId} Confirmed`);
      return order;
    },
    [
      cart,
      getCartItemBreakup,
      giftBox,
      giftNote,
      promoCode,
      promoDiscount,
      showToast,
      solisBundleDiscount,
      subtotal,
      total,
    ]
  );

  const openSearch = useCallback(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsBookingOpen(false);
    setIsSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openCart = useCallback(() => {
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsBookingOpen(false);
    setIsCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openWishlist = useCallback(() => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsBookingOpen(false);
    setIsWishlistOpen(true);
  }, []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);

  const openBookingModal = useCallback(() => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsBookingOpen(true);
  }, []);
  const closeBookingModal = useCallback(() => setIsBookingOpen(false), []);

  const openPitchDrawer = useCallback(() => setIsPitchOpen(true), []);
  const closePitchDrawer = useCallback(() => setIsPitchOpen(false), []);
  const togglePitchDrawer = useCallback(
    () => setIsPitchOpen((prev) => !prev),
    []
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      mounted,
      goldRates,
      rate22K,
      setRate22K,
      resetGoldRates,

      cart,
      cartCount,
      solisItemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemBreakup,

      giftBox,
      setGiftBox,
      giftNote,
      setGiftNote,

      promoCode,
      applyPromoCode,
      removePromoCode,

      subtotal,
      solisBundleDiscount,
      promoDiscount,
      total,

      wishlist,
      toggleWishlist,
      isInWishlist,

      bookings,
      addBooking,

      orders,
      placeDemoOrder,

      isSearchOpen,
      openSearch,
      closeSearch,
      isCartOpen,
      openCart,
      closeCart,
      isWishlistOpen,
      openWishlist,
      closeWishlist,
      isBookingOpen,
      openBookingModal,
      closeBookingModal,
      isPitchOpen,
      openPitchDrawer,
      closePitchDrawer,
      togglePitchDrawer,

      toastMessage,
      showToast,
    }),
    [
      mounted,
      goldRates,
      rate22K,
      setRate22K,
      resetGoldRates,
      cart,
      cartCount,
      solisItemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemBreakup,
      giftBox,
      giftNote,
      promoCode,
      applyPromoCode,
      removePromoCode,
      subtotal,
      solisBundleDiscount,
      promoDiscount,
      total,
      wishlist,
      toggleWishlist,
      isInWishlist,
      bookings,
      addBooking,
      orders,
      placeDemoOrder,
      isSearchOpen,
      openSearch,
      closeSearch,
      isCartOpen,
      openCart,
      closeCart,
      isWishlistOpen,
      openWishlist,
      closeWishlist,
      isBookingOpen,
      openBookingModal,
      closeBookingModal,
      isPitchOpen,
      openPitchDrawer,
      closePitchDrawer,
      togglePitchDrawer,
      toastMessage,
      showToast,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
