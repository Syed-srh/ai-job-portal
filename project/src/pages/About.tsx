import { Link } from 'react-router-dom';
import { Target, Heart, Zap, ArrowRight, Briefcase, Shield } from 'lucide-react';
import { stats } from '../data/jobs';

const values = [
  {
    icon: Target,
    title: 'Mission-driven',
    description: 'We exist to connect talent with opportunity, making career growth accessible to everyone.',
  },
  {
    icon: Heart,
    title: 'User-first',
    description: 'Every design decision starts with what is best for the job seeker.',
  },
  {
    icon: Zap,
    title: 'Fast & intuitive',
    description: 'We obsess over performance and simplicity so you can focus on what matters.',
  },
  {
    icon: Shield,
    title: 'Trusted & safe',
    description: 'We vet every employer to ensure a safe, high-quality job search experience.',
  },
];

const milestones = [
  { year: '2023', title: 'HireFlow founded', description: 'Started with a simple idea: make job searching delightful.' },
  { year: '2024', title: '10,000+ jobs listed', description: 'Grew to become a trusted platform for job seekers worldwide.' },
  { year: '2025', title: '150K+ active users', description: 'Now serving thousands of professionals every single day.' },
];

export default function About() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="gradient-bg py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wide mb-4 animate-fade-in">
            About Us
          </span>
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight text-balance animate-fade-in-up">
            We're on a mission to transform{' '}
            <span className="gradient-text">how people find jobs</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            HireFlow is a modern job board built for the next generation of professionals. We combine clean design, smart filtering, and a frictionless experience to help you discover opportunities that truly match your ambitions.
          </p>
        </div>
      </section>

      <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
              Our values
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/40 dark:to-accent-950/40 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
              Our journey
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="flex gap-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-display font-bold text-sm">
                    {m.year}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-700 dark:to-slate-900 p-10 lg:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-white tracking-tight">
                Ready to find your next role?
              </h2>
              <p className="mt-3 text-brand-100 text-lg">
                Join thousands of professionals who found their dream job through HireFlow.
              </p>
              <Link
                to="/jobs"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-brand-700 font-semibold hover:bg-brand-50 hover:scale-[1.02] transition-all"
              >
                <Briefcase className="w-5 h-5" />
                Browse all jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
