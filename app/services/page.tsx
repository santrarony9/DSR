import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | DSR Event Planner',
  description: 'Comprehensive event planning services including weddings, corporate events, decor, and more in Kolkata.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
