import React from 'react';
import {
  Menu,
  Moon,
  Sun,
  Plus,
  Search,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Header({ onOpenSidebar }) {
  const {
    theme,
    toggleTheme,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    openCreateModal,
    counts,
  } = useTasks();

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 transition-colors">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile Hamburger + Dashboard Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Task Management</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60">
                {counts.total} {counts.total === 1 ? 'task' : 'tasks'}
              </span>
            </h1>
            <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
              Track, organize, and prioritize your daily deliverables.
            </p>
          </div>
        </div>

        {/* Right: Search + View Mode + Theme + New Task CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Header Quick Search (Desktop) */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* View Mode Toggle (Grid / List) */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 border border-slate-200/80 dark:border-slate-600">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* New Task CTA Button */}
          <button
            onClick={openCreateModal}
            className="hidden sm:inline-flex items-center gap-1.5 py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-medium text-xs shadow-sm shadow-indigo-600/20 transition-all duration-150"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}

