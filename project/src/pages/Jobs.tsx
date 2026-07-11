import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { jobs } from '../data/jobs';
import { sortJobs } from '../utils/helpers';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import Filters, { type FilterState } from '../components/Filters';
import { JobListSkeleton } from '../components/Skeletons';
import EmptyState from '../components/EmptyState';
import type { WorkMode, ExperienceLevel } from '../types';

const initialFilters: FilterState = {
  query: '',
  category: '',
  workMode: '' as WorkMode | '',
  experience: '' as ExperienceLevel | '',
  minSalary: 0,
  company: '',
};

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
  });
  const [sortBy, setSortBy] = useState<'newest' | 'salary' | 'relevant'>('relevant');
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedQuery = useDebounce(filters.query, 300);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [debouncedQuery, filters.category, filters.workMode, filters.experience, filters.minSalary, filters.company, sortBy]);

  const companiesList = useMemo(() => [...new Set(jobs.map((j) => j.company))].sort(), []);
  const categoriesList = useMemo(() => [...new Set(jobs.map((j) => j.category))].sort(), []);

  const filtered = useMemo(() => {
    const result = jobs.filter((job) => {
      const q = debouncedQuery.toLowerCase();
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      const matchesCategory = !filters.category || job.category === filters.category;
      const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode;
      const matchesExperience = !filters.experience || job.experience === filters.experience;
      const matchesSalary = job.salaryMax >= filters.minSalary;
      const matchesCompany = !filters.company || job.company === filters.company;
      return matchesQuery && matchesCategory && matchesWorkMode && matchesExperience && matchesSalary && matchesCompany;
    });
    return sortJobs(result, sortBy);
  }, [debouncedQuery, filters, sortBy]);

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setFilters(initialFilters);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Browse Jobs
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Discover your next career opportunity from {jobs.length} active listings
          </p>
        </div>

        <div className="lg:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                companies={companiesList}
                categories={categoriesList}
                resultCount={filtered.length}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all cursor-pointer"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="newest">Newest</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>
            </div>

            {loading ? (
              <JobListSkeleton count={6} />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Search className="w-10 h-10" />}
                title="No jobs found"
                description="Try adjusting your filters or search terms to find more opportunities."
                action={
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((job, i) => (
                  <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-white dark:bg-slate-900 h-full overflow-y-auto p-6 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              companies={companiesList}
              categories={categoriesList}
              resultCount={filtered.length}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
