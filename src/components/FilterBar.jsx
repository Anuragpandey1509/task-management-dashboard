import React from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function FilterBar() {
  const {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    hasActiveFilters,
    resetFilters,
  } = useTasks();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-xs space-y-3.5 transition-colors">
      {/* Top Row: Search Input + Status Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input (By Title) */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Status Pills on Desktop */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium">
          {['All', 'Pending', 'In Progress', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === st
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Controls Row: Priority Filter + Status Filter (mobile) + Sort By + Clear Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          {/* Mobile Status Dropdown */}
          <div className="lg:hidden flex items-center gap-1.5">
            <label htmlFor="status-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Status:
            </label>
            <select
              id="status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <label htmlFor="priority-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Priority:
            </label>
            <select
              id="priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Sort By Dropdown (Earliest first / Latest first) */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="dueDate-asc">Due Date: Earliest First</option>
              <option value="dueDate-desc">Due Date: Latest First</option>
              <option value="created-desc">Created: Newest First</option>
              <option value="priority-desc">Priority: High to Low</option>
            </select>
          </div>

          {/* Reset Filters CTA when active */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Results Counter summary */}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredTasks.length}</span> of {tasks.length} tasks
        </div>
      </div>
    </div>
  );
}

