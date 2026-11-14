import React from 'react';
import {
  Layers,
  Clock,
  PlayCircle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function SummaryCards() {
  const { counts, statusFilter, setStatusFilter } = useTasks();

  const cards = [
    {
      id: 'All',
      title: 'Total Tasks',
      count: counts.total,
      icon: Layers,
      bgLight: 'bg-indigo-50/70',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderActive: 'ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-md shadow-indigo-500/10',
      badge: 'All Items',
      badgeColor: 'bg-indigo-100/70 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
    },
    {
      id: 'Pending',
      title: 'Pending',
      count: counts.pending,
      icon: Clock,
      bgLight: 'bg-amber-50/70',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderActive: 'ring-2 ring-amber-500 dark:ring-amber-400 shadow-md shadow-amber-500/10',
      badge: 'Awaiting Action',
      badgeColor: 'bg-amber-100/70 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      count: counts.inProgress,
      icon: PlayCircle,
      bgLight: 'bg-blue-50/70',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderActive: 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-md shadow-blue-500/10',
      badge: 'Active Work',
      badgeColor: 'bg-blue-100/70 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
    },
    {
      id: 'Completed',
      title: 'Completed',
      count: counts.completed,
      icon: CheckCircle2,
      bgLight: 'bg-emerald-50/70',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderActive: 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-md shadow-emerald-500/10',
      badge: `${counts.completionRate}% Done`,
      badgeColor: 'bg-emerald-100/70 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = statusFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => setStatusFilter(card.id)}
            className={`text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer ${
              isActive ? card.borderActive : 'shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bgLight} dark:bg-slate-700/60`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {card.count}
              </span>
              <span
                className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}
              >
                {card.badge}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

