import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/jobs';

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wide mb-3">
            Testimonials
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Success stories from our community
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Join thousands who found their dream job through HireFlow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-100 dark:text-brand-900/50" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-warning-500 text-warning-500" />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100 dark:ring-brand-900"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
