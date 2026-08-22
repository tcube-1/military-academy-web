'use client';

import React from 'react';
import { Mail, MessageSquare, Phone, Send, User } from 'lucide-react';

function ContactForm() {
  return (
    <section className="bg-background relative overflow-hidden px-4 py-20">
      {/* Background glow */}
      <div
        aria-hidden
        className="bg-primary/10 pointer-events-none absolute top-0 left-1/2 z-0 size-104 -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="border-accent/30 bg-accent/10 text-accent inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
            Get In Touch
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Start a{' '}
            <span className="text-primary">Conversation</span>
          </h2>

          <p className="text-muted-foreground mt-4 text-sm leading-6 sm:text-base">
            Have a question about our academy, courses, admissions, or training
            programs? Send us a message and our team will get back to you.
          </p>
        </div>

        {/* Form Card */}
        <div className="border-border bg-card/90 mx-auto max-w-3xl rounded-3xl border p-6 shadow-lg backdrop-blur-md sm:p-8">
          <form className="space-y-6">
            {/* Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-card-foreground text-sm font-medium"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    aria-hidden
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/20 h-11 w-full rounded-xl border pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-card-foreground text-sm font-medium"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    aria-hidden
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/20 h-11 w-full rounded-xl border pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
                  />
                </div>
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-card-foreground text-sm font-medium"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    aria-hidden
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/20 h-11 w-full rounded-xl border pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-card-foreground text-sm font-medium"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  className="border-input bg-background text-foreground focus:border-primary focus:ring-ring/20 h-11 w-full rounded-xl border px-4 text-sm transition-colors outline-none focus:ring-2"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="admissions">Admissions</option>
                  <option value="courses">Courses</option>
                  <option value="training">Training</option>
                  <option value="fees">Fees &amp; Payment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-card-foreground text-sm font-medium"
              >
                Message
              </label>

              <div className="relative">
                <MessageSquare
                  aria-hidden
                  className="text-muted-foreground pointer-events-none absolute top-3.5 left-3 size-4"
                />

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/20 w-full resize-none rounded-xl border py-3 pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-xs leading-5">
                By submitting this form, you agree to be contacted by our
                academy team.
              </p>

              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-ring/40 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:outline-none active:scale-[0.98]"
              >
                Send Message
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
