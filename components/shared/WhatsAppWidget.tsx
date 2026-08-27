"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/919830556659"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 btn-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 flex items-center justify-center animate-[pulse_3s_infinite] border-2 border-white/20"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
