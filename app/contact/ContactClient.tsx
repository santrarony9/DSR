'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { eventTypes } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your event"),
});

export default function ContactClient({ settings }: { settings?: any }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setServerError("");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      setServerError("There was a problem sending your message. Please try again or contact us directly via phone.");
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Us",
      lines: [(settings?.address || "104A/22V Karunamoyee Ghat Road, Kolkata, West Bengal 700082")],
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: [(settings?.phone || "+91 62893 80112"), "+91 98305 56659", "Mon-Sat: 10AM - 7PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [(settings?.email || "dsrevent06@gmail.com"), "We reply within 24 hours"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary)] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/projects/p2.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 to-[var(--color-primary)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#C8A96E]/30 text-[#C8A96E] font-medium text-sm tracking-widest uppercase mb-8">
            Let's Connect
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96E] to-[#E3CBA3] italic font-serif">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to plan something extraordinary? Reach out to us and let's turn your vision into reality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white text-slate-900 rounded-t-[3rem] -mt-10 relative z-20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-[#FAFAF5] p-10 md:p-12 rounded-[2rem] shadow-xl border border-black/5"
            >
              <h2 className="text-3xl font-bold font-heading mb-2">Send us a message</h2>
              <p className="text-slate-500 mb-8 font-light">Fill out the form below and we'll get back to you shortly.</p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl flex flex-col items-center text-center space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p>Thank you for reaching out. We will contact you within 24 hours to discuss your event.</p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2 bg-green-100 text-green-700 rounded-full font-medium hover:bg-green-200 transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {serverError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Name *</label>
                      <input {...register("name")} type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white" placeholder="John Doe" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Email *</label>
                      <input {...register("email")} type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white" placeholder="john@example.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Phone *</label>
                      <input {...register("phone")} type="tel" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white" placeholder="+91 62893 80112" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Event Type *</label>
                      <select {...register("eventType")} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white text-slate-700">
                        <option value="">Select event type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Event Date</label>
                    <input {...register("eventDate")} type="date" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white text-slate-700" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider text-xs">Message *</label>
                    <textarea {...register("message")} rows={5} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white resize-none" placeholder="Tell us about your dream event..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-slate-900 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
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
                <div key={index} className="bg-[#FAFAF5] rounded-2xl p-8 flex gap-6 items-start border border-black/5 group hover:bg-[#F5F0EB] transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <detail.icon className="w-6 h-6 text-[#C8A96E]" />
                  </div>
                  <div>
                    <h3 className="font-bold font-heading text-xl mb-2">{detail.title}</h3>
                    {detail.lines.map((line, i) => (
                      <p key={i} className="text-slate-600 font-light leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#FAFAF5]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5!2d88.3413!3d22.4944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027119d6781f93%3A0x5c57b0e8d8e5b8a0!2sKarunamoyee%20Ghat%20Road!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DSR Event Planner Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}



