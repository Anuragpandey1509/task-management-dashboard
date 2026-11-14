import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  AlertCircle,
  Flag,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function TaskModal() {
  const { isTaskModalOpen, modalMode, editingTask, closeTaskModal, createTask, updateTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const titleInputRef = useRef(null);

  // Populate form if in edit mode or reset if in create mode
  useEffect(() => {
    if (isTaskModalOpen) {
      if (modalMode === 'edit' && editingTask) {
        setTitle(editingTask.title || '');
        setDescription(editingTask.description || '');
        setPriority(editingTask.priority || 'Medium');
        setDueDate(editingTask.dueDate || '');
        setStatus(editingTask.status || 'Pending');
      } else {
        // Reset defaults
        setTitle('');
        setDescription('');
        setPriority('Medium');
        // Default due date: tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDueDate(tomorrow.toISOString().split('T')[0]);
        setStatus('Pending');
      }
      setErrors({});
      setTouched({});

      // Auto-focus title field
      setTimeout(() => {
        if (titleInputRef.current) titleInputRef.current.focus();
      }, 100);
    }
  }, [isTaskModalOpen, modalMode, editingTask]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isTaskModalOpen) {
        closeTaskModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTaskModalOpen, closeTaskModal]);

  // Validate fields
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, dueDate: true });

    if (!validate()) return;

    if (modalMode === 'edit' && editingTask) {
      updateTask(editingTask.id, {
        title,
        description,
        priority,
        dueDate,
        status,
      });
    } else {
      createTask({
        title,
        description,
        priority,
        dueDate,
        status,
      });
    }

    closeTaskModal();
  };

  if (!isTaskModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {modalMode === 'edit' ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {modalMode === 'edit'
                ? 'Update task details, deadline, and priority.'
                : 'Fill in the information below to add a new task.'}
            </p>
          </div>
          <button
            onClick={closeTaskModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field (Required) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="task-title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Required</span>
            </div>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              placeholder="e.g. Conduct user feedback interviews"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.title && touched.title
                  ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.title && touched.title && (
              <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description Field (Optional) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="task-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Description
              </label>
              <span className="text-[11px] text-slate-400">Optional</span>
            </div>
            <textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key context, links, or acceptance criteria..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Grid: Priority + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Priority */}
            <div>
              <label htmlFor="task-priority" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="task-status" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date Field (Required) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="task-duedate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Required</span>
            </div>
            <div className="relative">
              <input
                id="task-duedate"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, dueDate: true }))}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.dueDate && touched.dueDate
                    ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.dueDate && touched.dueDate && (
              <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.dueDate}</span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/25 active:scale-[0.98] transition-all"
            >
              {modalMode === 'edit' ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

