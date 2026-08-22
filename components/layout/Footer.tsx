import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { navLinks } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#526354] text-[#FAFAF5] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link href="/" className="inline-block mb-6 bg-white p-2 rounded">
              <Image
                src="/images/logo/dsr-logo.png"
                alt="DSR Event Planner Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="mb-6 opacity-90 leading-relaxed">
              DSR Event Planner is your premier partner for creating unforgettable events in Kolkata. We bring your vision to life with elegance and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-[#C8A96E] transition-colors font-medium">
                IG
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[#C8A96E] transition-colors font-medium">
                FB
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-[#C8A96E] transition-colors font-medium">
                YT
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 text-[#C8A96E]">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 text-[#C8A96E]">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/wedding-planning" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  Wedding Planning
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-events" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/services/social-gatherings" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  Social Gatherings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 text-[#C8A96E]">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 shrink-0 text-[#C8A96E]" size={20} />
                <span className="opacity-90">123 Event Street, Salt Lake City, Kolkata, West Bengal 700091</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 shrink-0 text-[#C8A96E]" size={20} />
                <a href="tel:+916289380112" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  +91 62893 80112
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 shrink-0 text-[#C8A96E]" size={20} />
                <a href="mailto:info@dsreventplanner.com" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  info@dsreventplanner.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} DSR Event Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
