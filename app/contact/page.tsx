"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Cultural Event",
  "Social Gathering",
  "Other",
];

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: [contactInfo.address.line1, contactInfo.address.line2, `${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.pin}`],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: contactInfo.phone.map((p) => p),
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [contactInfo.email],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: [contactInfo.hours],
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "contact" }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-[var(--color-primary)] pt-36 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-heading)]"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mt-4 max-w-2xl mx-auto"
          >
            Get in touch with us to start planning your dream event
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {isSubmitted ? (
                <div className="bg-[#F5F0EB] rounded-2xl p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-3 bg-[#C8A96E] text-white rounded-lg hover:bg-[#b89a5f] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          {...register("name")}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                          placeholder="+91 98305 56659"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Type *
                        </label>
                        <select
                          {...register("eventType")}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white"
                        >
                          <option value="">Select event type</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.eventType && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.eventType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Event Date
                      </label>
                      <input
                        {...register("eventDate")}
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition resize-none"
                        placeholder="Tell us about your event..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#C8A96E] text-white font-semibold rounded-lg hover:bg-[#b89a5f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {contactDetails.map((detail, index) => (
                <div
                  key={index}
                  className="bg-[#F5F0EB] rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                    <detail.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold font-[family-name:var(--font-heading)] text-[#1a1a1a]">
                      {detail.title}
                    </h3>
                    {detail.lines.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="bg-[#F5F0EB] rounded-2xl p-6">
                <h3 className="font-bold font-[family-name:var(--font-heading)] text-[#1a1a1a] mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-[#C8A96E] transition"
                    >
                      <span className="text-xs font-bold uppercase">
                        {platform[0]}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5!2d88.3413!3d22.4944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027119d6781f93%3A0x5c57b0e8d8e5b8a0!2sKarunamoyee%20Ghat%20Road!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DSR Event Planner Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
