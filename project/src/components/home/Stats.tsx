import { Briefcase, Building2, Users, TrendingUp } from 'lucide-react';
import { stats } from '../../data/jobs';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
};

export default function Stats() {
  return (
    <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/40 items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <p className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
