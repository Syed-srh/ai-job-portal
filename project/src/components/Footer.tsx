import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Hire<span className="gradient-text">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The modern job board connecting talented professionals with top companies worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/saved" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Saved Jobs</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/jobs?category=Engineering" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Engineering</Link></li>
              <li><Link to="/jobs?category=Design" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Design</Link></li>
              <li><Link to="/jobs?category=Data" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">Data & ML</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-all"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2025 HireFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
