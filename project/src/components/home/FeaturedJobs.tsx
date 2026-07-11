import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Job } from '../../types';
import JobCard from '../JobCard';

interface FeaturedJobsProps {
  jobs: Job[];
}

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  const featured = jobs.filter((j) => j.featured).slice(0, 6);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wide mb-3">
              Featured
            </span>
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
              Hot job openings
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Hand-picked opportunities from top companies hiring right now
            </p>
          </div>
          <Link
            to="/jobs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((job, i) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
