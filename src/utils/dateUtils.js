/**
 * Utility functions for clean date formatting, overdue checks, and relative badges.
 */

export function formatDisplayDate(dateString) {
  if (!dateString) return 'No due date';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Checks if a task is overdue.
 * Completed tasks are never treated as overdue.
 */
export function isOverdue(dateString, status) {
  if (!dateString || status === 'Completed') return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateString.split('-');
    const taskDate = parts.length === 3
      ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
      : new Date(dateString);

    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() < today.getTime();
  } catch {
    return false;
  }
}

/**
 * Checks if the task is due today.
 */
export function isDueToday(dateString) {
  if (!dateString) return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateString.split('-');
    const taskDate = parts.length === 3
      ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
      : new Date(dateString);

    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  } catch {
    return false;
  }
}

/**
 * Returns a human-friendly relative indicator (e.g. "Due today", "Overdue", etc.)
 */
export function getRelativeDueDateLabel(dateString, status) {
  if (!dateString) return '';
  if (status === 'Completed') return 'Completed';

  if (isOverdue(dateString, status)) {
    return 'Overdue';
  }
  if (isDueToday(dateString)) {
    return 'Due Today';
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateString.split('-');
    const taskDate = parts.length === 3
      ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
      : new Date(dateString);
    taskDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `Due in ${diffDays} days`;
  } catch {
    // Ignore
  }

  return '';
}

