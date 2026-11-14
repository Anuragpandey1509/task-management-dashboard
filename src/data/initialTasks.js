// Sample initial tasks to populate the dashboard on first visit.
// If the user clears all tasks or modifies them, their changes are persisted in LocalStorage.

const today = new Date();
const formatDate = (daysOffset) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Design high-fidelity wireframes for checkout flow',
    description: 'Create responsive Figma mockups for desktop, tablet, and mobile with complete payment gateway state transitions.',
    priority: 'High',
    status: 'In Progress',
    dueDate: formatDate(1), // Tomorrow
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Audit application bundle size and optimize assets',
    description: 'Analyze Webpack/Vite bundle analyzer output, remove unused dependencies, and convert png assets to webp.',
    priority: 'Medium',
    status: 'Pending',
    dueDate: formatDate(3), // 3 days from now
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Set up automated CI/CD pipeline on GitHub Actions',
    description: 'Configure automated linting, test coverage reporting, and deployment triggers for staging and production environments.',
    priority: 'High',
    status: 'Pending',
    dueDate: formatDate(-1), // Yesterday (overdue example)
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Implement OAuth 2.0 social login flow',
    description: 'Integrate Google and GitHub authentication providers with secure refresh token rotation and error boundaries.',
    priority: 'Medium',
    status: 'Completed',
    dueDate: formatDate(-2),
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Refactor reusable modal and dialog components',
    description: 'Ensure full keyboard accessibility (Esc to close, focus trapping, aria attributes) across all dialog overlays.',
    priority: 'Low',
    status: 'Completed',
    dueDate: formatDate(-3),
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Draft technical documentation and API reference',
    description: 'Document endpoints, request/response schemas, and onboarding steps for frontend integration.',
    priority: 'Low',
    status: 'In Progress',
    dueDate: formatDate(5),
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now()).toISOString(),
  },
];

