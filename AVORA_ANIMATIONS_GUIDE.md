# AVORA ANIMATIONS & MICRO-INTERACTIONS GUIDE

**Production-ready animations for premium feel | Copy-paste implementations | No bloat, just polish**

---

## PART 1: TAILWIND KEYFRAMES (Add to tailwind.config.ts)

```typescript
keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'fade-out': {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  'slide-in-up': {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'slide-in-down': {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'slide-in-left': {
    '0%': { transform: 'translateX(-20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  'slide-in-right': {
    '0%': { transform: 'translateX(20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  'scale-in': {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  'glow-pulse': {
    '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)' },
    '50%': { boxShadow: '0 0 30px rgba(79, 70, 229, 0.5)' },
  },
  'bounce-subtle': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-4px)' },
  },
  'shimmer': {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-6px)' },
  },
  'counter': {
    '0%': { opacity: '0' },
    '10%': { opacity: '1' },
    '90%': { opacity: '1' },
    '100%': { opacity: '1' },
  },
},
animation: {
  'fade-in': 'fade-in 0.6s ease-out',
  'fade-out': 'fade-out 0.4s ease-out',
  'slide-in-up': 'slide-in-up 0.6s ease-out',
  'slide-in-down': 'slide-in-down 0.6s ease-out',
  'slide-in-left': 'slide-in-left 0.6s ease-out',
  'slide-in-right': 'slide-in-right 0.6s ease-out',
  'scale-in': 'scale-in 0.5s ease-out',
  'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
  'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
  'shimmer': 'shimmer 2s infinite',
  'float': 'float 3s ease-in-out infinite',
  'counter': 'counter 0.3s ease-out',
},
```

---

## PART 2: SCROLL-TRIGGERED ANIMATIONS

### Install Dependency (ONE TIME)
```bash
npm install react-intersection-observer
```

### Create Custom Hook: `src/hooks/useInView.ts`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  margin?: string;
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) {
          observer.unobserve(entry.target);
        }
      } else if (!options.once) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.margin ?? '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isInView };
}
```

### Use in Components: Example with Hero

```typescript
'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

export default function Hero() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });

  return (
    <section ref={ref} id="hero" className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-primary-600/20 -z-10" />

      <div className="container-max relative z-10">
        {/* Headline - Fade in + Slide up */}
        <div
          className={cn(
            'text-center mb-8 md:mb-12 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 tracking-tight mb-6">
            Scale your operations.{' '}
            <span className="text-gradient">Powered by specialized talent and AI.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Avora Ventures combines outsourcing, skill hiring, AI solutions, and data annotations into
            one unified platform.
          </p>
        </div>

        {/* CTA Button - Delay + Scale in */}
        <div
          className={cn(
            'flex justify-center mb-16 md:mb-20 transition-all duration-700 delay-200',
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <button
            onClick={scrollToContact}
            className="group btn btn-primary btn-lg btn-round shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats - Staggered fade in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto pt-12 border-t border-slate-200">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                'text-center transition-all duration-700',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{
                transitionDelay: isInView ? `${(index + 1) * 100}ms` : '0ms',
              }}
            >
              <p className="text-2xl md:text-3xl font-bold text-slate-900">500+</p>
              <p className="text-sm text-slate-600 mt-1">Verified Engineers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## PART 3: SERVICE CARDS WITH ANIMATIONS

### `src/components/Services.tsx` (Enhanced)

```typescript
'use client';

import { useInView } from '@/hooks/useInView';
import { services } from '@/config/services';
import { cn } from '@/lib/cn';

export default function Services() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="services" className="section bg-slate-50 relative">
      <div className="container-max">
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            'text-center mb-16 md:mb-20 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-3 animate-fade-in">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Our Capabilities
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Four integrated services to scale your business through talent, automation, and data.
          </p>
        </div>

        {/* Service Cards Grid - Staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={cn(
                  'group card bg-white p-8 hover:shadow-xl hover:border-primary-300 hover:-translate-y-1 transition-all duration-500 opacity-0 translate-y-8',
                  isInView && 'opacity-100 translate-y-0'
                )}
                style={{
                  transitionDelay: isInView ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Icon with glow on hover */}
                <div className="w-14 h-14 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center mb-6 group-hover:bg-primary-100 group-hover:shadow-lg group-hover:glow-pulse transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm font-medium text-primary-600 mb-3">{service.subtitle}</p>
                <p className="text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Metrics Badge - Scale on hover */}
                <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-200 group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-300">
                  <span className="text-xs font-medium text-primary-700">{service.metrics}</span>
                </div>

                {/* Features - Fade in on hover */}
                <ul className="mt-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-primary-600 font-bold mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## PART 4: PROCESS SECTION WITH CONNECTING ANIMATIONS

### `src/components/Process.tsx` (Enhanced)

```typescript
'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { process } from '@/config/services';

export default function Process() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="process" className="section bg-white relative">
      <div className="container-max">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-16 md:mb-20 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-3">
            Our Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            The Avora A.I.M. Framework
          </h2>
        </div>

        {/* Steps with SVG connector line */}
        <div className="relative">
          {/* Horizontal Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent -z-10" />

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'relative transition-all duration-700 opacity-0 translate-y-8',
                  isInView && 'opacity-100 translate-y-0'
                )}
                style={{
                  transitionDelay: isInView ? `${index * 150}ms` : '0ms',
                }}
              >
                {/* Card */}
                <div className="relative z-10 group bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-primary-300 transition-all duration-500">
                  {/* Number Badge with animation */}
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center mb-6 group-hover:bg-primary-100 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <span className="font-bold text-primary-600 text-lg">{step.number}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Hover indicator line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## PART 5: BUTTON HOVER EFFECTS

### Update `src/app/globals.css`

```css
@layer components {
  /* Primary Button Enhanced */
  .btn-primary {
    @apply relative overflow-hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease-in-out;
  }

  .btn-primary:hover::before {
    left: 100%;
  }

  .btn-primary {
    @apply transition-all duration-300 ease-out;
  }

  .btn-primary:hover {
    @apply -translate-y-0.5 shadow-xl;
  }

  .btn-primary:active {
    @apply translate-y-0;
  }

  /* Secondary Button */
  .btn-secondary {
    @apply transition-all duration-300;
  }

  .btn-secondary:hover {
    @apply -translate-y-0.5 shadow-md;
  }
}
```

---

## PART 6: FORM INTERACTIONS

### `src/components/Contact.tsx` (Enhanced with animations)

```typescript
'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budgetRange: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please tell us about your project.');
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbzdt6LMsh3XZ6eBUAmns_WBtqd8ORR-uDizVZhaUDqWG9bAqYa5LtbpSpZX-iVrnRlI/exec';

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', serviceType: '', budgetRange: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-white relative">
      <div className="container-max max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-3">
            Let's Work Together
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Start a Conversation
          </h2>
          <p className="text-lg text-slate-600">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-white border border-slate-200 p-8 md:p-12 shadow-lg animate-slide-in-up">
          {success ? (
            <div className="text-center py-12 animate-scale-in">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-600 animate-bounce-subtle" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Sent!</h3>
              <p className="text-slate-600 mb-6">
                Thank you. Our team will reach out within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-primary-600 font-medium hover:text-primary-700 hover:underline transition-colors"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 animate-slide-in-down">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transition-all duration-300">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Jane Doe"
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-all duration-300',
                      focusedField === 'name'
                        ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    )}
                  />
                </div>
                <div className="transition-all duration-300">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="jane@example.com"
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-all duration-300',
                      focusedField === 'email'
                        ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    )}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Acme Corp"
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border transition-all duration-300',
                    focusedField === 'company'
                      ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  )}
                />
              </div>

              {/* Service Type & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-2">
                    Service Type (Optional)
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('serviceType')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-all duration-300',
                      focusedField === 'serviceType'
                        ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    )}
                  >
                    <option value="">Select a service</option>
                    <option value="outsourcing">Specialized Outsourcing</option>
                    <option value="skill-hiring">Specialized Skill Hiring</option>
                    <option value="ai-solutions">AI Solutions & Automation</option>
                    <option value="data-annotations">Data Annotation & Labeling</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-700 mb-2">
                    Budget Range (Optional)
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('budgetRange')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-all duration-300',
                      focusedField === 'budgetRange'
                        ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    )}
                  >
                    <option value="">Select a range</option>
                    <option value="under-5k">&lt;$5k</option>
                    <option value="5k-25k">$5k–$25k</option>
                    <option value="25k-100k">$25k–$100k</option>
                    <option value="over-100k">&gt;$100k</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  placeholder="Tell us about your project, timeline, and goals..."
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border resize-none transition-all duration-300',
                    focusedField === 'message'
                      ? 'border-primary-600 ring-2 ring-primary-500/10 bg-white shadow-md'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  )}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full btn btn-primary btn-lg btn-round relative overflow-hidden group',
                  isSubmitting && 'opacity-70 cursor-not-allowed'
                )}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Inquiry'
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## PART 7: PAGE SCROLL ANIMATIONS

### Navbar Scroll Effect: `src/components/Navbar.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
            : 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex justify-between items-center transition-all duration-300', isScrolled ? 'h-14' : 'h-16')}>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold font-heading text-slate-900 hover:text-primary-600 transition-colors"
            >
              {siteConfig.shortName}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              {siteConfig.nav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href.replace('#', ''))}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 relative group transition-colors"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex btn btn-primary btn-sm"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b border-slate-200 shadow-lg animate-slide-in-down">
          <div className="flex flex-col gap-1 p-4">
            {siteConfig.nav.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href.replace('#', ''))}
                className="text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 animate-slide-in-right"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 w-full btn btn-primary animate-slide-in-up"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## PART 8: SMOOTH PAGE TRANSITIONS

### Create `src/components/PageTransition.tsx`

```typescript
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
}
```

Add to `src/app/layout.tsx`:

```typescript
import { PageTransition } from '@/components/PageTransition';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
```

---

## PART 9: LINK HOVER EFFECTS

### Update Links in Components

```typescript
// Text links
<a href="#section" className="text-primary-600 relative group hover:text-primary-700 transition-colors">
  Link Text
  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
</a>

// CTA links with arrow
<a href="#" className="group text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1 transition-all">
  Learn More
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</a>
```

---

## PART 10: LOADING STATE ENHANCEMENTS

### Add Loading Skeleton: `src/components/LoadingCard.tsx`

```typescript
'use client';

export function LoadingCard() {
  return (
    <div className="card bg-white p-8">
      <div className="flex gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-200 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
      </div>
    </div>
  );
}
```

---

## PART 11: QUICK IMPLEMENTATION CHECKLIST

### To add all animations:

1. **Add keyframes to `tailwind.config.ts`** (copy from Part 1)
   ```bash
   ✓ paste keyframes into theme.extend.keyframes
   ✓ paste animation into theme.extend.animation
   ```

2. **Create hook** `src/hooks/useInView.ts` (copy from Part 2)
   ```bash
   ✓ paste entire file
   ```

3. **Update globals.css** (copy from Part 5)
   ```bash
   ✓ add button hover effects
   ```

4. **Refactor Components** (use code from Parts 3, 4, 6, 7)
   ```bash
   ✓ Hero.tsx - add useInView hook
   ✓ Services.tsx - add staggered animations
   ✓ Process.tsx - add connecting lines + hover
   ✓ Contact.tsx - add focus animations
   ✓ Navbar.tsx - add scroll effect
   ```

5. **Test locally**
   ```bash
   npm run dev
   ✓ Scroll hero section → see fade in
   ✓ Scroll to services → see staggered cards
   ✓ Hover cards → see lift + shadow
   ✓ Hover buttons → see shine effect
   ✓ Scroll navbar → see shrink effect
   ✓ Focus form inputs → see ring + shadow
   ```

---

## PART 12: PERFORMANCE TIPS

### Don't Overdo It
```
❌ Animate everything
✓ Animate entrance + interactive states
✓ Keep durations 200–600ms
✓ Use ease-out for entrance, ease-in-out for hover
```

### Hardware Acceleration
```typescript
// These animate efficiently:
- opacity
- transform (scale, translate, rotate)
- filter

// These are slow:
- box-shadow (use carefully)
- width/height
- left/right/top/bottom
```

### Mobile Considerations
```typescript
// Reduce motion for accessibility
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## DEPLOYMENT CHECKLIST

- [ ] All animations work on Chrome, Safari, Firefox
- [ ] Mobile: animations feel smooth (60fps)
- [ ] No janky scrolling (use DevTools > Performance)
- [ ] Lighthouse Performance ≥90
- [ ] Test on actual devices (iPhone, Android)
- [ ] Test with reduced motion enabled
- [ ] useInView hook doesn't cause layout shift
- [ ] Form focus states work on touch devices

---

**Copy code directly. Test each section. Commit: `feat: animations and micro-interactions`**
