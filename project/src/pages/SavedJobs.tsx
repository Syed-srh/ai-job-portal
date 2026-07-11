import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Briefcase } from 'lucide-react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useToast } from '../context/ToastContext';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';

export default function SavedJobs() {
  const { savedJobIds, clearAll } = useSavedJobs();
  const { showToast } = useToast();
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const handleClearAll = () => {
    clearAll();
    showToast('All saved jobs removed', 'info');
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
              Saved Jobs
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {savedJobs.length === 0
                ? 'No saved jobs yet'
                : `${savedJobs.length} ${savedJobs.length === 1 ? 'job' : 'jobs'} bookmarked`}
            </p>
          </div>
          {savedJobs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {savedJobs.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="w-10 h-10" />}
            title="No saved jobs"
            description="Bookmark jobs you're interested in to find them here later. Tap the bookmark icon on any job card to save it."
            action={
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Browse jobs
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {savedJobs.map((job, i) => (
              <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
