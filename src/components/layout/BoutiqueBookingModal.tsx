'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Store,
  Video,
  X,
} from 'lucide-react';
import type { BoutiqueBooking, CollectionSlug } from '@/types/store';
import { BOUTIQUES } from '@/lib/siteConfig';
import { useStore } from '@/context/StoreContext';

const TIME_SLOTS = ['11:30 AM', '1:30 PM', '4:00 PM', '6:30 PM'] as const;

const COLLECTION_OPTIONS: { value: CollectionSlug | 'all'; label: string }[] = [
  { value: 'all', label: 'All PIXTACY Collections' },
  { value: 'aarohi', label: 'Aarohi · 22KT Heritage & Bridal' },
  { value: 'noor', label: 'Noor · IGI Lab-Grown Diamonds' },
  { value: 'saanjh', label: 'Saanjh · Everyday 18KT Fine Gold' },
  { value: 'solis', label: 'Solis · Waterproof Demi-Fine' },
];

function formatLocalDate(dateObj: Date): string {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayDate(): string {
  return formatLocalDate(new Date());
}

function getDefaultDate(): string {
  return formatLocalDate(new Date(Date.now() + 86_400_000));
}

/**
 * Private Boutique Visit & Live Video Styling Call appointment modal
 * backed by StoreContext addBooking() persistence.
 */
export function BoutiqueBookingModal() {
  const { isBookingOpen, closeBookingModal, addBooking, bookings } = useStore();

  const [mode, setMode] = useState<'boutique' | 'video'>('boutique');
  const [boutiqueId, setBoutiqueId] = useState<string>(BOUTIQUES[0].id);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [collectionInterest, setCollectionInterest] = useState<
    CollectionSlug | 'all'
  >('all');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] =
    useState<BoutiqueBooking | null>(null);

  useEffect(() => {
    if (!date) {
      setDate(getDefaultDate());
    }
  }, [date]);

  useEffect(() => {
    if (!isBookingOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeBookingModal();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookingOpen, closeBookingModal]);

  const selectedBoutique =
    BOUTIQUES.find((b) => b.id === boutiqueId) ?? BOUTIQUES[0];

  const handleClose = () => {
    setError(null);
    closeBookingModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setError('Please enter your name, phone number, and email address.');
      return;
    }
    if (!date) {
      setError('Please choose your preferred appointment date.');
      return;
    }

    setError(null);
    const created = addBooking({
      mode,
      boutiqueId: selectedBoutique.id,
      boutiqueName: selectedBoutique.name,
      city: selectedBoutique.city,
      date,
      timeSlot,
      collectionInterest,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      notes: notes.trim() || undefined,
    });
    setConfirmedBooking(created);
  };

  const resetForAnother = () => {
    setConfirmedBooking(null);
    setNotes('');
    setError(null);
  };

  return (
    <AnimatePresence>
      {isBookingOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book Boutique Visit or Video Styling Call"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1C1514]/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514] shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-start justify-between border-b border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
                  PIXTACY Private Concierge
                </p>
                <h2 className="mt-0.5 font-serif text-2xl font-medium text-[#1C1514]">
                  {confirmedBooking
                    ? 'Consultation Confirmed'
                    : 'Book a Salon Visit or Live Video Call'}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close booking modal"
                className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] transition-colors hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </header>

            {/* Body */}
            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              {confirmedBooking ? (
                <div className="space-y-5">
                  <div className="rounded-[2px] border border-[#2E6B4E]/35 bg-[#FFFFFF] p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-6 w-6 shrink-0 text-[#2E6B4E]"
                        strokeWidth={1.6}
                      />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2E6B4E]">
                          Appointment Reference ·{' '}
                          <span className="tabular-nums">
                            {confirmedBooking.id}
                          </span>
                        </p>
                        <h3 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
                          We look forward to styling you,{' '}
                          {confirmedBooking.customerName}.
                        </h3>
                        <p className="mt-1 text-sm text-[#5C504A]">
                          {confirmedBooking.mode === 'video'
                            ? 'A private HD styling link and lookbook dossier have been prepared with our senior gemologist.'
                            : `Your private suite is reserved at ${confirmedBooking.boutiqueName}.`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#E5DDD0] pt-4 text-xs sm:grid-cols-2">
                      <div>
                        <p className="uppercase tracking-[0.12em] text-[#8C7E75]">
                          Format
                        </p>
                        <p className="mt-0.5 font-medium text-[#1C1514]">
                          {confirmedBooking.mode === 'video'
                            ? 'Live Video Styling Call'
                            : 'Private Boutique Visit'}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.12em] text-[#8C7E75]">
                          Salon / Atelier
                        </p>
                        <p className="mt-0.5 font-medium text-[#1C1514]">
                          {confirmedBooking.boutiqueName} ({confirmedBooking.city})
                        </p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.12em] text-[#8C7E75]">
                          Date & Time
                        </p>
                        <p className="mt-0.5 font-medium text-[#1C1514] tabular-nums">
                          {confirmedBooking.date} · {confirmedBooking.timeSlot}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.12em] text-[#8C7E75]">
                          Collection Focus
                        </p>
                        <p className="mt-0.5 font-medium capitalize text-[#1C1514]">
                          {confirmedBooking.collectionInterest === 'all'
                            ? 'All Collections'
                            : confirmedBooking.collectionInterest}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={resetForAnother}
                      className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:border-[#1C1514]"
                    >
                      Book Another Slot
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-[2px] bg-[#1C1514] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Mode Switch */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                      1. Choose Consultation Mode
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setMode('boutique')}
                        className={`flex items-start gap-3 rounded-[2px] border p-3.5 text-left transition-colors ${
                          mode === 'boutique'
                            ? 'border-[#C69C4D] bg-[#FFFFFF] ring-1 ring-[#C69C4D]'
                            : 'border-[#E5DDD0] bg-[#FFFFFF]/70 hover:border-[#8C7E75]'
                        }`}
                      >
                        <Store
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            mode === 'boutique'
                              ? 'text-[#AE8439]'
                              : 'text-[#8C7E75]'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-[#1C1514]">
                            Boutique Visit
                          </p>
                          <p className="mt-0.5 text-xs text-[#5C504A]">
                            Try on pieces in Mumbai, Delhi, Bengaluru, or Kolkata
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMode('video')}
                        className={`flex items-start gap-3 rounded-[2px] border p-3.5 text-left transition-colors ${
                          mode === 'video'
                            ? 'border-[#C69C4D] bg-[#FFFFFF] ring-1 ring-[#C69C4D]'
                            : 'border-[#E5DDD0] bg-[#FFFFFF]/70 hover:border-[#8C7E75]'
                        }`}
                      >
                        <Video
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            mode === 'video'
                              ? 'text-[#AE8439]'
                              : 'text-[#8C7E75]'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-[#1C1514]">
                            Live Video Styling Call
                          </p>
                          <p className="mt-0.5 text-xs text-[#5C504A]">
                            1-on-1 macro showcase with our GIA/IGI gemologist
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Boutique City Selector */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                      2.{' '}
                      {mode === 'video'
                        ? 'Preferred Regional Salon Stylist'
                        : 'Select Salon'}
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {BOUTIQUES.map((salon) => {
                        const active = salon.id === boutiqueId;
                        return (
                          <button
                            key={salon.id}
                            type="button"
                            onClick={() => setBoutiqueId(salon.id)}
                            className={`rounded-[2px] border p-3 text-left transition-colors ${
                              active
                                ? 'border-[#C69C4D] bg-[#FFFFFF] ring-1 ring-[#C69C4D]'
                                : 'border-[#E5DDD0] bg-[#FFFFFF]/60 hover:border-[#8C7E75]'
                            }`}
                          >
                            <p className="font-serif text-base font-medium text-[#1C1514]">
                              {salon.shortLabel}
                            </p>
                            <p className="mt-0.5 flex items-start gap-1 text-[11px] text-[#5C504A]">
                              <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#8C7E75]" />
                              <span className="line-clamp-1">{salon.address}</span>
                            </p>
                            <p className="mt-1 text-[10px] text-[#8C7E75]">
                              {salon.hours}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]"
                      >
                        <Calendar className="h-3.5 w-3.5 text-[#C69C4D]" />
                        <span>3. Preferred Date</span>
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        min={getTodayDate()}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#1C1514] tabular-nums focus:border-[#C69C4D] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                        <Clock className="h-3.5 w-3.5 text-[#C69C4D]" />
                        <span>Time Slot (IST)</span>
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium tabular-nums transition-colors ${
                              timeSlot === slot
                                ? 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]'
                                : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Collection Interest */}
                  <div>
                    <label
                      htmlFor="booking-collection"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]"
                    >
                      4. Collection Interest
                    </label>
                    <select
                      id="booking-collection"
                      value={collectionInterest}
                      onChange={(e) =>
                        setCollectionInterest(
                          e.target.value as CollectionSlug | 'all'
                        )
                      }
                      className="mt-2 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2.5 text-sm text-[#1C1514] focus:border-[#C69C4D] focus:outline-none"
                    >
                      {COLLECTION_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Details */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                      5. Contact Details
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Full Name *"
                        aria-label="Full Name"
                        required
                        className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                      />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Phone (+91) *"
                        aria-label="Phone Number"
                        required
                        className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                      />
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Email Address *"
                        aria-label="Email Address"
                        required
                        className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional styling notes (e.g., Bridal trousseau, ring size check)..."
                      aria-label="Optional styling notes"
                      className="mt-2.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                    />
                  </div>

                  {error ? (
                    <p className="text-xs font-medium text-[#7A1E2C]">
                      {error}
                    </p>
                  ) : null}

                  <div className="flex items-center justify-between gap-4 border-t border-[#E5DDD0] pt-4">
                    <p className="text-[11px] text-[#8C7E75]">
                      {bookings.length > 0 ? (
                        <span className="tabular-nums">
                          {bookings.length} active{' '}
                          {bookings.length === 1 ? 'booking' : 'bookings'} saved
                        </span>
                      ) : (
                        'Complimentary private consultation'
                      )}
                    </p>

                    <button
                      type="submit"
                      className="rounded-[2px] bg-[#1C1514] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
