import React, { useEffect } from 'react';
import {
  X,
  Calendar,
  AlertCircle,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  Flag,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { formatDisplayDate, isOverdue, getRelativeDueDateLabel } from '../utils/dateUtils';

export default function TaskDetailModal() {
  const {
    isDetailModalOpen,
    viewingTask,
    closeDetailModal,
    openEditModal,
    openDeleteModal,
    updateTaskStatus,
  } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDetailModalOpen) {
        closeDetailModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailModalOpen, closeDetailModal]);

  if (!isDetailModalOpen || !viewingTask) return null;

  const overdue = isOverdue(viewingTask.dueDate, viewingTask.status);
  const relativeLabel = getRelativeDueDateLabel(viewingTask.dueDate, viewingTask.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                viewingTask.priority === 'High'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  : viewingTask.priority === 'Medium'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {viewingTask.priority} Priority
            </span>
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                viewingTask.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : viewingTask.status === 'In Progress'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {viewingTask.status}
            </span>
          </div>

          <button
            onClick={closeDetailModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h2 id="detail-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {viewingTask.title}
            </h2>
          </div>

          {/* Description */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
              Description
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {viewingTask.description || 'No description provided for this task.'}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Due Date */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Due Date</span>
              <div
                className={`font-semibold flex items-center gap-1.5 ${
                  overdue ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDisplayDate(viewingTask.dueDate)}</span>
                {relativeLabel && <span className="text-[10px] font-bold">({relativeLabel})</span>}
              </div>
            </div>

            {/* Created Timestamp */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Created At</span>
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {viewingTask.createdAt ? new Date(viewingTask.createdAt).toLocaleDateString() : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Status Update Selector */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
              Update Current Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Pending', 'In Progress', 'Completed'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => updateTaskStatus(viewingTask.id, st)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    viewingTask.status === st
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-400 dark:text-indigo-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              closeDetailModal();
              openDeleteModal(viewingTask);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Task</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeDetailModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                closeDetailModal();
                openEditModal(viewingTask);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

