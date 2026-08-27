"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Always solid on non-home pages
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isSolid ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="relative z-50">
          {/* We might want a white logo on transparent, but if they only have one logo, we can add a slight backdrop blur or background pill */}
          <div className={`transition-all duration-300 rounded p-1 ${isSolid ? "" : "bg-white/80 backdrop-blur-sm shadow-sm"}`}>
            <Image
              src="/images/logo/dsr-logo.png"
              alt="DSR Event Planner Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#C8A96E]"
                  : isSolid
                  ? "text-[#1a1a1a] hover:text-[#C8A96E]"
                  : "text-white hover:text-[#C8A96E] drop-shadow-md"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="btn-gold px-8 py-3 font-semibold tracking-wide text-sm"
          >
            GET A QUOTE
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden relative z-50 p-2 rounded-full transition-colors ${isSolid ? "text-[#1a1a1a]" : "text-white bg-black/20 backdrop-blur-sm"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} className="text-[#1a1a1a]" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-heading ${
                    pathname === link.href ? "text-[#C8A96E]" : "text-[#1a1a1a]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold text-center py-4 font-semibold mt-8 text-lg"
              >
                GET A QUOTE
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
