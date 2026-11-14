import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function DeleteConfirmModal() {
  const { isDeleteModalOpen, taskToDelete, closeDeleteModal, confirmDelete } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        closeDeleteModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeleteModalOpen, closeDeleteModal]);

  if (!isDeleteModalOpen || !taskToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in p-6"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0 shadow-inner">
            <Trash2 className="w-6 h-6 stroke-[2]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 id="delete-dialog-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Delete Task Confirmation
            </h3>
            <p id="delete-dialog-desc" className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">&ldquo;{taskToDelete.title}&rdquo;</span>? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/25 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Yes, Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

