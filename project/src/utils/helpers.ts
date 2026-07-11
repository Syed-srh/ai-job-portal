import type { Job } from '../types';

export function formatSalary(min: number, max: number, currency: string): string {
  const formatNum = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
    return `${n}`;
  };
  return `${currency}${formatNum(min)} – ${currency}${formatNum(max)}`;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffDays > 7) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (diffDays >= 1) {
    return `${diffDays}d ago`;
  }
  if (diffHours >= 1) {
    return `${diffHours}h ago`;
  }
  return 'Just now';
}

export function getSimilarJobs(job: Job, allJobs: Job[], limit = 3): Job[] {
  return allJobs
    .filter((j) => j.id !== job.id)
    .map((j) => {
      let score = 0;
      if (j.category === job.category) score += 3;
      if (j.company === job.company) score += 2;
      const sharedSkills = j.skills.filter((s) => job.skills.includes(s)).length;
      score += sharedSkills;
      return { job: j, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.job);
}

export function sortJobs(
  jobs: Job[],
  sortBy: 'newest' | 'salary' | 'relevant'
): Job[] {
  const sorted = [...jobs];
  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    case 'salary':
      return sorted.sort((a, b) => b.salaryMax - a.salaryMax);
    case 'relevant':
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.applicants - a.applicants
      );
  }
}
