'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Please select a date'),
  guestCount: z.coerce.number().min(1, 'Guest count is required').max(10000, 'Guest count is too large'),
  budget: z.string().min(1, 'Please select a budget range'),
  requirements: z.string().min(10, 'Please provide some details (at least 10 characters)'),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteClient() {
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
        body: JSON.stringify({ ...data, source: 'quote_form' }),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF5]">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative flex flex-col justify-center min-h-[30vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage mb-4 text-[#FAFAF5]">
            Get A Free Quote
          </h1>
          <p className="text-xl md:text-2xl text-[#C8A96E] font-medium max-w-2xl mx-auto">
            Tell us about your dream event, and we'll help you bring it to life within your budget.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg"
        >
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#eaf4eb] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold font-bricolage text-[#1a1a1a] mb-4">Request Received!</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                Thank you for considering DSR Event Planner. Our team will review your requirements and get back to you with a customized quote shortly.
              </p>
              <Link 
                href="/"
                className="inline-flex bg-[var(--color-primary)] hover:bg-[#3f4d41] text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="border-b border-gray-200 pb-8 space-y-6">
                <h3 className="text-xl font-bold text-[#1a1a1a]">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#1a1a1a]">Event Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                    <select
                      id="eventType"
                      {...register('eventType')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding Planning">Wedding Planning</option>
                      <option value="Destination Wedding">Destination Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Cultural Event">Cultural Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Social Gathering">Social Gathering</option>
                      <option value="Decor & Design">Decor & Design</option>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-2">Estimated Guest Count *</label>
                    <input
                      type="number"
                      id="guestCount"
                      {...register('guestCount')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all"
                      placeholder="e.g. 500"
                    />
                    {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                    <select
                      id="budget"
                      {...register('budget')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                      <option value="₹1-3 Lakhs">₹1-3 Lakhs</option>
                      <option value="₹3-5 Lakhs">₹3-5 Lakhs</option>
                      <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                      <option value="₹10+ Lakhs">₹10+ Lakhs</option>
                    </select>
                    {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">Special Requirements *</label>
                  <textarea
                    id="requirements"
                    {...register('requirements')}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please tell us more about your event vision, preferred venues, themes, or any specific requirements..."
                  />
                  {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[#3f4d41] text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md"
              >
                {isSubmitting ? 'Submitting Request...' : 'Get My Free Quote'}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
