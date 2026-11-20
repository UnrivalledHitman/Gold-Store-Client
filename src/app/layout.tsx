import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { StoreShell } from '@/components/layout/StoreShell';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PIXTACY — Heirloom Craft. Everyday Radiance.',
  description:
    'Contemporary Indian luxury jewellery house across 22KT Heritage Gold, IGI Certified Lab-Grown Diamonds, Everyday 18KT Fine Gold, and Waterproof Demi-Fine Vermeil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans antialiased selection:bg-[#C69C4D]/20 selection:text-[#1C1514]">
        <StoreProvider>
          <StoreShell>{children}</StoreShell>
        </StoreProvider>
      </body>
    </html>
  );
}
