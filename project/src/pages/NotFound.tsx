import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md mx-auto px-4 text-center animate-fade-in-up">
        <p className="font-display font-extrabold text-8xl lg:text-9xl gradient-text">404</p>
        <h1 className="mt-4 font-display font-bold text-2xl text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:border-brand-300 dark:hover:border-brand-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
