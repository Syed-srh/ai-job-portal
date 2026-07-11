export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';
export type ExperienceLevel = 'Entry' | 'Junior' | 'Mid' | 'Senior' | 'Lead';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyDescription: string;
  companyWebsite: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  experience: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  category: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  featured: boolean;
  applicants: number;
}

export interface Company {
  name: string;
  logo: string;
  openRoles: number;
  industry: string;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
