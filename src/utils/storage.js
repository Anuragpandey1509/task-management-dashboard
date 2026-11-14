import { INITIAL_TASKS } from '../data/initialTasks';

export const STORAGE_KEY = 'taskflow_dashboard_tasks_v1';
export const THEME_KEY = 'taskflow_dashboard_theme_v1';

/**
 * Validates whether an item matches the required Task shape.
 */
function isValidTask(task) {
  if (!task || typeof task !== 'object') return false;
  const hasId = typeof task.id === 'string' && task.id.length > 0;
  const hasTitle = typeof task.title === 'string' && task.title.trim().length > 0;
  const hasDueDate = typeof task.dueDate === 'string' && task.dueDate.length > 0;
  const hasValidPriority = ['Low', 'Medium', 'High'].includes(task.priority);
  const hasValidStatus = ['Pending', 'In Progress', 'Completed'].includes(task.status);

  return hasId && hasTitle && hasDueDate && hasValidPriority && hasValidStatus;
}

/**
 * Safely loads tasks from localStorage.
 * If data is missing, corrupt, non-array, or invalid, falls back to INITIAL_TASKS.
 * Never crashes the application.
 */
export function loadTasksFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return INITIAL_TASKS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    
    // First time visitor: populate with initial sample tasks
    if (raw === null) {
      saveTasksToStorage(INITIAL_TASKS);
      return INITIAL_TASKS;
    }

    // Explicitly empty array saved by user (e.g. they deleted all tasks)
    if (raw.trim() === '[]') {
      return [];
    }

    const parsed = JSON.parse(raw);

    // Guard: Must be an array
    if (!Array.isArray(parsed)) {
      console.warn('[LocalStorage] Expected array of tasks, got:', typeof parsed, '— resetting to sample tasks.');
      saveTasksToStorage(INITIAL_TASKS);
      return INITIAL_TASKS;
    }

    // Filter out any malformed tasks from old versions or tampering
    const sanitized = parsed.filter(isValidTask);

    return sanitized;
  } catch (error) {
    console.error('[LocalStorage] Error parsing stored tasks:', error, '— falling back safely.');
    return INITIAL_TASKS;
  }
}

/**
 * Safely saves tasks array to localStorage.
 */
export function saveTasksToStorage(tasks) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const data = Array.isArray(tasks) ? tasks : [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('[LocalStorage] Error writing tasks to storage:', error);
    return false;
  }
}

/**
 * Safely loads the saved UI theme (light / dark).
 */
export function loadThemeFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'light';
  }

  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Ignore storage errors
  }

  return 'light';
}

/**
 * Safely saves the UI theme.
 */
export function saveThemeToStorage(theme) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(THEME_KEY, theme === 'dark' ? 'dark' : 'light');
  } catch {
    // Ignore storage errors
  }
}

