'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/916289380112"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebd5a] transition-all hover:scale-110 flex items-center justify-center animate-[pulse_2s_infinite]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
