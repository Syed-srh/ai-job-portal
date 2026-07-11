import { companies } from '../../data/jobs';

export default function TopCompanies() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wide mb-3">
            Top Companies
          </span>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Trusted by industry leaders
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            We partner with the world's most innovative companies
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {companies.map((company, i) => (
            <div
              key={company.name}
              className="group flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 mb-4 group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <h3 className="font-display font-bold text-slate-900 dark:text-white">
                {company.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {company.industry}
              </p>
              <p className="mt-3 text-sm font-semibold text-brand-600 dark:text-brand-400">
                {company.openRoles} open roles
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
