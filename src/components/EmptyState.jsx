import React from 'react';
import {
  ClipboardList,
  SearchX,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function EmptyState({ isFiltered }) {
  const { openCreateModal, resetFilters } = useTasks();

  if (isFiltered) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-12 text-center transition-colors">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 shadow-inner">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          No matching tasks found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          We couldn&apos;t find any tasks matching your active search query or filter combination.
          Try adjusting or clearing your filters to see more results.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-14 text-center transition-colors">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
        No tasks in your workspace yet
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
        Get started by creating your first task. Organize your workload, set due dates, and track your progress all in one place.
      </p>
      <button
        onClick={openCreateModal}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 active:scale-[0.98] transition-all"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Create Your First Task</span>
      </button>
    </div>
  );
}

