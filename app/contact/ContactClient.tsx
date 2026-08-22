'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactInfo, socialLinks } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Please select a date'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#526354] text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative flex flex-col justify-center min-h-[30vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage mb-4 text-[#FAFAF5]">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-[#C8A96E] font-medium max-w-2xl mx-auto">
            Let's plan something extraordinary together
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-[#1a1a1a] mb-6">Send us a message</h2>
            
            {isSuccess ? (
              <div className="bg-[#eaf4eb] text-[#526354] p-6 rounded-xl flex items-start gap-4 mb-8">
                <CheckCircle2 className="shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our team will get back to you shortly to discuss your event.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="name"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      id="email"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                    <select
                      id="eventType"
                      {...register('eventType')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Cultural">Cultural Event</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                    <input
                      type="date"
                      id="eventDate"
                      {...register('eventDate')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all"
                    />
                    {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your event vision, requirements, and estimated guest count..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C8A96E] hover:bg-[#b59862] text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-[#1a1a1a] mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8 text-lg">We'd love to hear from you. Reach out to us directly using any of the methods below.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F5F0EB] transition-colors">
                <div className="w-12 h-12 bg-[#526354] rounded-full flex items-center justify-center text-white shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-1">Phone Number</h3>
                  <div className="text-gray-600 space-y-1">
                    {contactInfo.phone.map((num, i) => (
                      <p key={i}>
                        <a href={`tel:+91${num}`} className="hover:text-[#C8A96E] transition-colors">+91 {num}</a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F5F0EB] transition-colors">
                <div className="w-12 h-12 bg-[#526354] rounded-full flex items-center justify-center text-white shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-1">Email Address</h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-[#C8A96E] transition-colors">{contactInfo.email}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F5F0EB] transition-colors">
                <div className="w-12 h-12 bg-[#526354] rounded-full flex items-center justify-center text-white shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-1">Office Address</h3>
                  <p className="text-gray-600">
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.pin}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F5F0EB] transition-colors">
                <div className="w-12 h-12 bg-[#526354] rounded-full flex items-center justify-center text-white shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-1">Business Hours</h3>
                  <p className="text-gray-600">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-bold text-[#1a1a1a] mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link href={socialLinks.facebook} target="_blank" className="w-10 h-10 bg-[#F5F0EB] text-[#526354] rounded-full flex items-center justify-center hover:bg-[#C8A96E] hover:text-white transition-colors font-bold">
                  FB
                </Link>
                <Link href={socialLinks.instagram} target="_blank" className="w-10 h-10 bg-[#F5F0EB] text-[#526354] rounded-full flex items-center justify-center hover:bg-[#C8A96E] hover:text-white transition-colors font-bold">
                  IG
                </Link>
                <Link href={socialLinks.youtube} target="_blank" className="w-10 h-10 bg-[#F5F0EB] text-[#526354] rounded-full flex items-center justify-center hover:bg-[#C8A96E] hover:text-white transition-colors font-bold">
                  YT
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full">
        <iframe
          src={contactInfo.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DSR Event Planner Location"
        ></iframe>
      </section>
    </div>
  );
}
