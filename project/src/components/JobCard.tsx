import { Link } from 'react-router-dom';
import { MapPin, Bookmark, Clock, Users } from 'lucide-react';
import type { Job } from '../types';
import { formatSalary, timeAgo } from '../utils/helpers';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useToast } from '../context/ToastContext';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact';
}

export default function JobCard({ job, variant = 'default' }: JobCardProps) {
  const { toggleSave, isSaved } = useSavedJobs();
  const { showToast } = useToast();
  const saved = isSaved(job.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(job.id);
    showToast(saved ? 'Removed from saved jobs' : 'Added to saved jobs', saved ? 'info' : 'success');
  };

  const modeColor =
    job.workMode === 'Remote'
      ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400'
      : job.workMode === 'Hybrid'
      ? 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-500'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group relative block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            loading="lazy"
          />
          {job.featured && (
            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white">
              Hot
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
            {job.company}
          </p>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeAgo(job.postedAt)}
            </span>
          </div>
        </div>

        <button
          onClick={handleBookmark}
          className={`shrink-0 p-2 rounded-lg transition-all ${
            saved
              ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
              : 'text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save job'}
        >
          <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${modeColor}`}>
          {job.workMode}
        </span>
        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {job.type}
        </span>
        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {job.experience}
        </span>
        {job.skills.slice(0, 2).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400"
          >
            {skill}
          </span>
        ))}
      </div>

      {variant === 'default' && (
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-display font-bold text-slate-900 dark:text-white">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {job.applicants} applicants
            </p>
          </div>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold group-hover:bg-brand-600 group-hover:text-white transition-all">
            View
          </span>
        </div>
      )}
    </Link>
  );
}
