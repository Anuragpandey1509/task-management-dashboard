import React from 'react';
import {
  Calendar,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { useTasks } from '../context/TaskContext';
import { formatDisplayDate, isOverdue } from '../utils/dateUtils';

export default function TaskList() {
  const {
    tasks,
    filteredTasks,
    viewMode,
    hasActiveFilters,
    openEditModal,
    openDeleteModal,
    openDetailModal,
    updateTaskStatus,
  } = useTasks();

  // 1. Completely empty workspace
  if (tasks.length === 0) {
    return <EmptyState isFiltered={false} />;
  }

  // 2. Filters returned zero results
  if (filteredTasks.length === 0) {
    return <EmptyState isFiltered={true} />;
  }

  // 3. Grid Mode View
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    );
  }

  // 4. Table / List Mode View
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-900/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3.5 px-4 sm:px-6">Task Title</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
            {filteredTasks.map((task) => {
              const overdue = isOverdue(task.dueDate, task.status);

              return (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group"
                >
                  {/* Title & Description */}
                  <td className="py-3.5 px-4 sm:px-6 max-w-xs sm:max-w-md">
                    <div
                      onClick={() => openDetailModal(task)}
                      className="cursor-pointer"
                    >
                      <span
                        className={`font-semibold block truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
                          task.status === 'Completed'
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.description && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 truncate block mt-0.5">
                          {task.description}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className="text-xs font-semibold py-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : task.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center gap-1.5 font-medium ${
                        overdue
                          ? 'text-rose-600 dark:text-rose-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {overdue ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{formatDisplayDate(task.dueDate)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openDetailModal(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(task)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

