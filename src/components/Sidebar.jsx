import React from 'react';
import {
  CheckSquare,
  LayoutDashboard,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Sidebar({ isOpen, onClose }) {
  const { counts, statusFilter, setStatusFilter, openCreateModal, resetFilters } = useTasks();

  const navItems = [
    {
      id: 'All',
      label: 'All Tasks',
      icon: LayoutDashboard,
      count: counts.total,
      color: 'text-indigo-600 dark:text-indigo-400',
      activeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold',
    },
    {
      id: 'Pending',
      label: 'Pending',
      icon: Clock,
      count: counts.pending,
      color: 'text-amber-500',
      activeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 font-semibold',
    },
    {
      id: 'In Progress',
      label: 'In Progress',
      icon: PlayCircle,
      count: counts.inProgress,
      color: 'text-blue-500',
      activeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-semibold',
    },
    {
      id: 'Completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: counts.completed,
      color: 'text-emerald-500',
      activeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 font-semibold',
    },
  ];

  const handleSelectStatus = (statusId) => {
    setStatusFilter(statusId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <CheckSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                TaskFlow
              </span>
              <span className="block text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                Dashboard
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary CTA */}
        <div className="p-4">
          <button
            onClick={() => {
              openCreateModal();
              if (onClose) onClose();
            }}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 transition-all duration-150"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Task</span>
          </button>
        </div>

        {/* Navigation / Status Views */}
        <div className="px-3 py-2 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Views & Filters
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = statusFilter === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectStatus(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? item.activeBg
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? '' : item.color}`} />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isActive
                      ? 'bg-white/80 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Productivity Widget */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/60">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/60 dark:from-slate-700/60 dark:to-slate-800/80 border border-indigo-100/60 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Completion Rate
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {counts.completionRate}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${counts.completionRate}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              {counts.completed} of {counts.total} tasks completed
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

