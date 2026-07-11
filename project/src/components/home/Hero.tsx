import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="relative overflow-hidden gradient-bg pt-32 lg:pt-40 pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 mb-8 animate-fade-in">
            <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
              Over 12,000 jobs available
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.1] tracking-tight text-balance animate-fade-in-up">
            Find your next{' '}
            <span className="gradient-text">career opportunity</span>
            <br className="hidden sm:block" /> with HireFlow
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Browse thousands of job listings from top companies worldwide. Your dream job is just one search away.
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 p-2 focus-within:ring-2 focus-within:ring-brand-500/50 transition-all">
              <Search className="absolute left-5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by job title, company, or keyword..."
                className="flex-1 pl-12 pr-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none text-base"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-glow hover:scale-[1.02] transition-all whitespace-nowrap"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span className="font-medium">Popular:</span>
            {['Frontend Developer', 'Product Designer', 'Data Scientist', 'DevOps'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(tag)}`)}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
