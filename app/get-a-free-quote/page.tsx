"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, CheckCircle, Sparkles } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please select an event date"),
  guestCount: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  requirements: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const eventTypes = [
  "Wedding Planning",
  "Destination Wedding",
  "Corporate Event",
  "Cultural Event",
  "Birthday Party",
  "Social Gathering",
  "Decor & Design",
  "Other",
];

const budgetRanges = [
  "Under ₹1 Lakh",
  "₹1 - 3 Lakhs",
  "₹3 - 5 Lakhs",
  "₹5 - 10 Lakhs",
  "₹10+ Lakhs",
];

export default function GetAFreeQuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "quote" }),
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-[#C8A96E]" />
            <span className="text-[#C8A96E] font-medium">Free Consultation</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-heading)]"
          >
            Get A Free Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg mt-4 max-w-2xl mx-auto"
          >
            Tell us about your dream event and we&apos;ll create a customized plan just for you
          </motion.p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center shadow-lg"
            >
              <CheckCircle className="w-20 h-20 text-[var(--color-primary)] mx-auto mb-6" />
              <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-3">
                Thank You!
              </h2>
              <p className="text-gray-600 text-lg mb-2">
                Your quote request has been received successfully.
              </p>
              <p className="text-gray-500">
                Our team will review your requirements and get back to you within 24 hours with a customized proposal.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-[#C8A96E] text-white rounded-lg hover:bg-[#b89a5f] transition font-medium"
                >
                  Submit Another Request
                </button>
                <a
                  href="https://wa.me/916289380112"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition font-medium"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <div className="text-center mb-8">
                <Image
                  src="/images/logo/dsr-logo.png"
                  alt="DSR Event Planner"
                  width={120}
                  height={57}
                  className="mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                  Tell Us About Your Event
                </h2>
                <p className="text-gray-500 mt-1">
                  Fill in the details below and we&apos;ll get back to you with a personalized quote
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

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
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Event Details */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
                    Event Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      {...register("eventDate")}
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                    />
                    {errors.eventDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Guest Count
                    </label>
                    <input
                      {...register("guestCount")}
                      type="number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition"
                      placeholder="e.g., 200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range *
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    {...register("requirements")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition resize-none"
                    placeholder="Tell us about any specific themes, venues, or requirements you have in mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#C8A96E] text-white font-semibold rounded-lg hover:bg-[#b89a5f] transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Submitting..." : "Request Free Quote"}
                </button>

                <p className="text-center text-gray-400 text-sm">
                  We typically respond within 24 hours. No spam, ever.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
