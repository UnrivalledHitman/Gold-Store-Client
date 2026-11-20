import type { Metadata } from 'next';
import { CheckoutExperience } from '@/components/checkout/CheckoutExperience';

export const metadata: Metadata = {
  title: 'Client Demo Checkout — PIXTACY',
  description:
    'Interactive 3-step client demo checkout with Sequel insured courier, 4-city salon pickup, simulated UPI/Card/NetBanking, and digital receipt dossier.',
};

export default function CheckoutPage() {
  return <CheckoutExperience />;
}
