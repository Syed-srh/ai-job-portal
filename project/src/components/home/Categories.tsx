import { Link } from 'react-router-dom';
import { Code2, Palette, BarChart3, Server, Smartphone, Megaphone, Shield, ArrowRight } from 'lucide-react';
import { categories } from '../../data/jobs';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Palette,
  BarChart3,
  Server,
  Smartphone,
  Megaphone,
  Shield,
};

export default function Categories() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wide mb-3">
            Categories
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Explore by industry
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Find the perfect role in your field of expertise
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <Link
                key={cat.name}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-start p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/40 dark:to-accent-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {cat.count} {cat.count === 1 ? 'job' : 'jobs'}
                </p>
                <ArrowRight className="w-4 h-4 text-brand-500 mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
