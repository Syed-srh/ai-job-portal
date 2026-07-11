import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface SavedJobsContextValue {
  savedJobIds: string[];
  toggleSave: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  clearAll: () => void;
}

const SavedJobsContext = createContext<SavedJobsContextValue | undefined>(undefined);

const STORAGE_KEY = 'hireflow-saved-jobs';

function getInitialSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getInitialSaved);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const toggleSave = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const isSaved = (jobId: string) => savedJobIds.includes(jobId);

  const clearAll = () => setSavedJobIds([]);

  return (
    <SavedJobsContext.Provider value={{ savedJobIds, toggleSave, isSaved, clearAll }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used within SavedJobsProvider');
  return ctx;
}
