import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { WorkMode, ExperienceLevel } from '../types';

export interface FilterState {
  query: string;
  category: string;
  workMode: WorkMode | '';
  experience: ExperienceLevel | '';
  minSalary: number;
  company: string;
}

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | number) => void;
  onReset: () => void;
  companies: string[];
  categories: string[];
  resultCount: number;
}

const workModes: WorkMode[] = ['Remote', 'Hybrid', 'Onsite'];
const experienceLevels: ExperienceLevel[] = ['Entry', 'Junior', 'Mid', 'Senior', 'Lead'];

export default function Filters({
  filters,
  onFilterChange,
  onReset,
  companies,
  categories,
  resultCount,
}: FiltersProps) {
  const hasActiveFilters =
    filters.query || filters.category || filters.workMode || filters.experience || filters.minSalary > 0 || filters.company;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
          <h3 className="font-display font-bold text-slate-900 dark:text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
          >
            Reset all
          </button>
        )}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-white">{resultCount}</span> {resultCount === 1 ? 'job' : 'jobs'} found
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange('query', e.target.value)}
            placeholder="Job title, skill..."
            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Work mode
        </label>
        <div className="flex flex-wrap gap-2">
          {workModes.map((mode) => (
            <button
              key={mode}
              onClick={() => onFilterChange('workMode', filters.workMode === mode ? '' : mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filters.workMode === mode
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Experience
        </label>
        <div className="flex flex-wrap gap-2">
          {experienceLevels.map((level) => (
            <button
              key={level}
              onClick={() => onFilterChange('experience', filters.experience === level ? '' : level)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filters.experience === level
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Minimum salary: <span className="text-brand-600 dark:text-brand-400 font-semibold">${(filters.minSalary / 1000).toFixed(0)}K+</span>
        </label>
        <input
          type="range"
          min={0}
          max={250000}
          step={10000}
          value={filters.minSalary}
          onChange={(e) => onFilterChange('minSalary', Number(e.target.value))}
          className="w-full accent-brand-600 cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Company
        </label>
        <select
          value={filters.company}
          onChange={(e) => onFilterChange('company', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
        >
          <option value="">All companies</option>
          {companies.map((comp) => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {Object.entries({
            query: filters.query,
            category: filters.category,
            workMode: filters.workMode,
            experience: filters.experience,
            company: filters.company,
          }).map(([key, value]) =>
            value ? (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 text-xs font-medium"
              >
                {value}
                <button onClick={() => onFilterChange(key as keyof FilterState, '')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ) : null
          )}
          {filters.minSalary > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 text-xs font-medium">
              ${(filters.minSalary / 1000).toFixed(0)}K+
              <button onClick={() => onFilterChange('minSalary', 0)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
