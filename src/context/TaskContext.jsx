import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loadTasksFromStorage, saveTasksToStorage, loadThemeFromStorage, saveThemeToStorage } from '../utils/storage';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // ── 1. Main State ──
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());
  const [theme, setTheme] = useState(() => loadThemeFromStorage());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // ── 2. Combined Filter & Sort State ──
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'In Progress' | 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All' | 'Low' | 'Medium' | 'High'
  const [sortBy, setSortBy] = useState('dueDate-asc'); // 'dueDate-asc' | 'dueDate-desc' | 'created-desc' | 'priority-desc'

  // ── 3. Modals State ──
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingTask, setEditingTask] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);

  // ── 4. Toast Notification State ──
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Sync theme with HTML document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync tasks to LocalStorage whenever tasks state updates
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // ── 5. Real-Time Summary Counts ──
  // Immediately reflects any addition, edit, deletion, or status toggle
  const counts = useMemo(() => {
    const total = tasks.length;
    let pending = 0;
    let inProgress = 0;
    let completed = 0;

    for (const t of tasks) {
      if (t.status === 'Pending') pending++;
      else if (t.status === 'In Progress') inProgress++;
      else if (t.status === 'Completed') completed++;
    }

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, pending, inProgress, completed, completionRate };
  }, [tasks]);

  // ── 6. Filtered and Sorted Tasks ──
  // Combines: Search Query (by title) + Status Filter + Priority Filter + Sort Order
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // 1. Search by title (case-insensitive)
        if (searchQuery.trim()) {
          const query = searchQuery.trim().toLowerCase();
          const matchesTitle = task.title.toLowerCase().includes(query);
          if (!matchesTitle) return false;
        }

        // 2. Status filter
        if (statusFilter !== 'All' && task.status !== statusFilter) {
          return false;
        }

        // 3. Priority filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by Due Date Earliest First (asc)
        if (sortBy === 'dueDate-asc') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        // Sort by Due Date Latest First (desc)
        if (sortBy === 'dueDate-desc') {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
        // Sort by Created Date (Newest first)
        if (sortBy === 'created-desc') {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        // Sort by Priority (High -> Medium -> Low)
        if (sortBy === 'priority-desc') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  // Are any active filters or search terms applied?
  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim().length > 0 || statusFilter !== 'All' || priorityFilter !== 'All';
  }, [searchQuery, statusFilter, priorityFilter]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSortBy('dueDate-asc');
  }, []);

  // ── 7. CRUD Operations ──

  // CREATE
  const createTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: taskData.title.trim(),
      description: (taskData.description || '').trim(),
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate,
      status: taskData.status || 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast('Task created successfully!', 'success');
    return newTask;
  }, [showToast]);

  // UPDATE
  const updateTask = useCallback((id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...updatedData,
            title: updatedData.title !== undefined ? updatedData.title.trim() : task.title,
            description: updatedData.description !== undefined ? updatedData.description.trim() : task.description,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
    showToast('Task updated successfully!', 'success');
  }, [showToast]);

  // QUICK STATUS TOGGLE / CHANGE
  const updateTaskStatus = useCallback((id, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus, updatedAt: new Date().toISOString() } : t))
    );
    showToast(`Status updated to "${nextStatus}"`, 'info');
  }, [showToast]);

  // DELETE
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task deleted successfully', 'warning');
  }, [showToast]);

  // ── 8. Modal Open / Close Handlers ──
  const openCreateModal = useCallback(() => {
    setModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const openEditModal = useCallback((task) => {
    setModalMode('edit');
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, []);

  const openDeleteModal = useCallback((task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      closeDeleteModal();
    }
  }, [taskToDelete, deleteTask, closeDeleteModal]);

  const openDetailModal = useCallback((task) => {
    setViewingTask(task);
    setIsDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setViewingTask(null);
  }, []);

  const value = {
    // Tasks & counts
    tasks,
    filteredTasks,
    counts,
    hasActiveFilters,

    // Filters & sorting
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    resetFilters,

    // View & theme
    viewMode,
    setViewMode,
    theme,
    toggleTheme,

    // Operations
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,

    // Modals
    isTaskModalOpen,
    modalMode,
    editingTask,
    openCreateModal,
    openEditModal,
    closeTaskModal,

    isDeleteModalOpen,
    taskToDelete,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,

    isDetailModalOpen,
    viewingTask,
    openDetailModal,
    closeDetailModal,

    // Toast
    toast,
    showToast,
    hideToast,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

