import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | DSR Event Planner',
  description: 'Learn about DSR Event Planner, 25 years of creating unforgettable moments in Kolkata.',
};

export default function AboutPage() {
  return <AboutClient />;
}
