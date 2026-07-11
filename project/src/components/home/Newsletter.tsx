import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed! Check your inbox for job alerts.', 'success');
    setEmail('');
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-700 dark:to-slate-900 p-10 lg:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-white tracking-tight">
                Never miss a job opportunity
              </h2>
              <p className="mt-3 text-brand-100 text-lg leading-relaxed">
                Get the latest job openings delivered straight to your inbox. Join 50,000+ job seekers who never miss out.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                {['Weekly job alerts', 'No spam, ever', 'Unsubscribe anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-brand-100">
                    <CheckCircle2 className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 transition-all"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-white text-brand-700 font-semibold hover:bg-brand-50 hover:scale-[1.02] transition-all whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
