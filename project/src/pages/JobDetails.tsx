import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, Users, Bookmark, ArrowLeft, ExternalLink,
  CheckCircle2, Briefcase, Building2, Globe, Wallet, Share2,
} from 'lucide-react';
import { jobs } from '../data/jobs';
import { formatSalary, timeAgo, getSimilarJobs } from '../utils/helpers';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useToast } from '../context/ToastContext';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useSavedJobs();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  const job = jobs.find((j) => j.id === id);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  if (!loading && !job) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <EmptyState
          icon={<Briefcase className="w-10 h-10" />}
          title="Job not found"
          description="This job listing may have been removed or the link is incorrect."
          action={
            <Link to="/jobs" className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
              Browse all jobs
            </Link>
          }
        />
      </div>
    );
  }

  if (loading || !job) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="skeleton h-8 w-32 mb-6" />
        <div className="skeleton h-48 w-full rounded-2xl mb-6" />
        <div className="skeleton h-6 w-full mb-3" />
        <div className="skeleton h-6 w-full mb-3" />
        <div className="skeleton h-6 w-3/4 mb-6" />
        <div className="skeleton h-32 w-full rounded-2xl" />
      </div>
    );
  }

  const saved = isSaved(job.id);
  const similar = getSimilarJobs(job, jobs, 3);

  const handleBookmark = () => {
    toggleSave(job.id);
    showToast(saved ? 'Removed from saved jobs' : 'Added to saved jobs', saved ? 'info' : 'success');
  };

  const handleApply = () => {
    showToast('Application submitted! The company will reach out soon.', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${job.title} at ${job.company}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'info');
    }
  };

  const modeColor =
    job.workMode === 'Remote'
      ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400'
      : job.workMode === 'Hybrid'
      ? 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-500'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 mb-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-20 h-20 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.company}</p>
                  <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-slate-900 dark:text-white mt-1 tracking-tight">
                    {job.title}
                  </h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`p-2.5 rounded-lg transition-all ${
                      saved
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    aria-label={saved ? 'Remove bookmark' : 'Save job'}
                  >
                    <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {timeAgo(job.postedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> {job.applicants} applicants
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> {job.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${modeColor}`}>
                  {job.workMode}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {job.experience}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400">
                  {job.category}
                </span>
                {job.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleApply}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-glow hover:scale-[1.02] transition-all"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={handleBookmark}
              className={`px-6 py-3.5 rounded-xl font-semibold border transition-all ${
                saved
                  ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700'
              }`}
            >
              {saved ? 'Saved' : 'Save for Later'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 animate-fade-in-up">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Job Description
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 animate-fade-in-up">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 animate-fade-in-up">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 animate-fade-in-up">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {job.benefits.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-fade-in-up lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Salary</p>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Job Type</p>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Experience</p>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{job.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-fade-in-up">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                About {job.company}
              </h3>
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 mb-4"
                loading="lazy"
              />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {job.companyDescription}
              </p>
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                <Globe className="w-4 h-4" />
                Visit website
              </a>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-6">
              Similar Jobs
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {similar.map((s) => (
                <JobCard key={s.id} job={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
