import React from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import { formatDisplayDate, isOverdue, getRelativeDueDateLabel } from '../utils/dateUtils';
import { useTasks } from '../context/TaskContext';

export default function TaskCard({ task }) {
  const { openEditModal, openDeleteModal, openDetailModal, updateTaskStatus } = useTasks();

  const overdue = isOverdue(task.dueDate, task.status);
  const relativeLabel = getRelativeDueDateLabel(task.dueDate, task.status);

  // Priority badge styling
  const priorityStyles = {
    High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    Low: 'bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300 border-slate-200 dark:border-slate-600',
  };

  // Status badge styling
  const statusStyles = {
    Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-900',
    'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/80 dark:border-blue-900',
    Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900',
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 flex flex-col justify-between">
      {/* Top Meta: Priority + Status Dropdown */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Priority Badge */}
        <span
          className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority} Priority
        </span>

        {/* Quick Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-1 cursor-pointer transition-colors ${
            statusStyles[task.status] || statusStyles.Pending
          }`}
          title="Change task status"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Content: Title & Description */}
      <div className="flex-1 cursor-pointer" onClick={() => openDetailModal(task)}>
        <h3
          className={`text-sm sm:text-base font-semibold leading-snug tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
            task.status === 'Completed' ? 'line-through text-slate-400 dark:text-slate-500' : ''
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {task.description}
          </p>
        )}
      </div>

      {/* Bottom Footer: Due Date + Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 text-xs">
        {/* Due Date Indicator */}
        <div
          className={`inline-flex items-center gap-1.5 font-medium ${
            overdue
              ? 'text-rose-600 dark:text-rose-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
          title={overdue ? 'This task is past its due date!' : `Due ${formatDisplayDate(task.dueDate)}`}
        >
          {overdue ? (
            <AlertCircle className="w-3.5 h-3.5 text-rose-500 stroke-[2.2]" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>{formatDisplayDate(task.dueDate)}</span>
          {relativeLabel && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                overdue
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {relativeLabel}
            </span>
          )}
        </div>

        {/* Action Buttons: View, Edit, Delete */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => openDetailModal(task)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
            title="View Task Details"
            aria-label="View task"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => openEditModal(task)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
            title="Edit Task"
            aria-label="Edit task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => openDeleteModal(task)}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
            title="Delete Task"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

