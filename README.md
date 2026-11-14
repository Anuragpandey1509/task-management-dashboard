# TaskFlow — Modern Task Management Dashboard

A responsive, feature-rich task management dashboard built with **React.js (functional components & custom hooks)**, **Tailwind CSS**, and **LocalStorage persistence**. Designed and engineered to satisfy all requirements and edge cases of the Frontend Developer Assessment.

---

## 🌟 Live Demo & Preview

* **Live Deployment:** [Deploy on Vercel or Netlify](https://vercel.com)
* **Experience Level Target:** ~1 Year Frontend Engineer
* **Zero Dependencies Backend:** 100% Client-side state with fail-safe LocalStorage syncing.

---

## 🚀 Key Functional Requirements Satisfied

| Requirement | Implementation & Features |
| :--- | :--- |
| **1. Full Task CRUD** | Create, view, edit, and delete tasks with instant UI updates and toast notifications. |
| **2. Task Data Model** | `id` (unique), `title` (required), `description` (optional), `priority` (`Low`, `Medium`, `High`), `dueDate` (required YYYY-MM-DD), `status` (`Pending`, `In Progress`, `Completed`), and audit timestamps (`createdAt`, `updatedAt`). |
| **3. Supported Statuses** | `Pending`, `In Progress`, and `Completed` with color-coded status badges and quick dropdown switches. |
| **4. Real-time Summary Cards** | 4 responsive metric cards: **Total Tasks**, **Pending Tasks**, **In Progress**, and **Completed** (plus a completion progress bar). Cards update immediately when any task changes, is created, or is deleted. Clicking a card immediately filters to that status. |
| **5. Title Search** | Case-insensitive search bar with instant substring matching and clear button (✕). |
| **6. Multi-dimensional Filters** | Filter simultaneously by **Status** (`All`, `Pending`, `In Progress`, `Completed`) and **Priority** (`All`, `Low`, `Medium`, `High`). |
| **7. Due Date Sorting** | Sort by **Earliest Due First** (`dueDate-asc`), **Latest Due First** (`dueDate-desc`), **Newest Created**, or **Priority Level**. |
| **8. LocalStorage Persistence** | Tasks automatically persist in `localStorage` across page reloads and browser sessions. |
| **9. Form Validation & Error States** | Form validates required fields (`title` and `dueDate`). Displays clear, accessible inline error messages and red border highlights. Prevents submission of invalid data. |
| **10. Deletion Confirmation** | Accessible confirmation modal before any deletion occurs to prevent accidental data loss. |

---

## 🛡️ Edge Cases Handled

1. **Title and Due Date Requirement**: A task cannot be submitted without a valid, trimmed title (minimum 3 characters) and a due date.
2. **Combined Filtering**: Search query + Status filter + Priority filter + Sort order work simultaneously together without conflict.
3. **Instant Metric Synchronization**: Summary counters are computed dynamically via `useMemo` so any status toggle or deletion immediately updates all metric counters.
4. **Resilient LocalStorage Guard**: If LocalStorage data is corrupted, empty, tampered with, or non-array, the app safely catches the error and recovers with valid defaults without crashing.
5. **Distinct Empty States**:
   * **Workspace Empty State**: When zero tasks exist in the workspace, shows an inviting empty state with a "Create Your First Task" CTA.
   * **Filter Empty State**: When search or filters return no matches, shows a search empty state explaining no tasks match the active filters, with a 1-click "Reset All Filters" CTA.
6. **No Horizontal Overflow**: Thoroughly tested grid, table, and header layouts ensure zero horizontal scrolling on mobile, tablet, and desktop screens.
7. **Overdue Task Warnings**: Visual badges alert users if a pending or in-progress task is past its due date.

---

## 🎨 UI/UX & Responsive Highlights

* **Responsive Layout**: Collapsible sidebar navigation for mobile/tablet and fixed drawer for desktop (`lg:pl-64`).
* **View Modes**: Toggle between **Grid Cards view** and **Table List view**.
* **Theme Support**: Seamless **Light Mode** and **Dark Mode** toggle saved to LocalStorage.
* **Micro-interactions**: Subtle hover elevations, animated toast feedback, relative date labels ("Due Today", "Due Tomorrow", "Overdue").

---

## 📁 Project Directory Structure

```
task-management-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx                     # Application root entry
    ├── App.jsx                      # Main dashboard layout
    ├── index.css                    # Tailwind directives & animations
    ├── context/
    │   └── TaskContext.jsx          # Central state, CRUD operations, filters
    ├── data/
    │   └── initialTasks.js          # Realistic seed tasks for initial launch
    ├── utils/
    │   ├── storage.js               # Safe LocalStorage handler with schema validation
    │   └── dateUtils.js             # Date formatting, overdue check, relative labels
    └── components/
        ├── Sidebar.jsx              # Navigation sidebar with status shortcuts & progress
        ├── Header.jsx               # Header with search, view toggle, theme switcher
        ├── SummaryCards.jsx         # 4 Real-time summary metric cards
        ├── FilterBar.jsx            # Combined search, status, priority, sorting controls
        ├── TaskList.jsx             # Grid / Table task presentation
        ├── TaskCard.jsx             # Individual task card with inline status change
        ├── TaskModal.jsx            # Create and Edit task modal with validation
        ├── DeleteConfirmModal.jsx   # Delete confirmation dialog
        ├── TaskDetailModal.jsx      # Task detail view dialog
        ├── EmptyState.jsx           # Differentiated empty states (0 tasks vs 0 matches)
        └── Toast.jsx                # Action feedback alert
```

---

## 💻 Getting Started Locally

### Prerequisites
* Node.js (v18.x or higher)
* npm (v9.x or higher)

### Setup & Run
```bash
# 1. Clone repository
git clone https://github.com/Anuragpandey1509/task-management-dashboard.git

# 2. Enter directory
cd task-management-dashboard

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```
Open **`http://localhost:3000`** in your web browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🚢 Quick Deployment to Vercel or Netlify

### Deploy on Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**.

### Deploy on Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## 📹 Video Walkthrough Script (Suggested for 3–5 min Recording)

1. **Introduction (30s)**: Introduce yourself, mention the project goal (Task Management Dashboard with React.js, Tailwind, LocalStorage), and show the clean UI on desktop and mobile.
2. **Dashboard Overview (45s)**: Walk through the 4 summary cards, progress bar, theme switcher (Dark/Light), and view mode toggle (Grid vs Table).
3. **Task CRUD (60s)**:
   * Create a new task: Show form validation when submitting without title or due date.
   * Edit an existing task: Change title, priority, or due date and show immediate update.
   * View details in the task modal.
   * Delete a task: Show the confirmation modal and explain why asking for confirmation prevents accidental loss.
4. **Search, Filters & Sorting (60s)**:
   * Demonstrate combined filtering: Type a search word, select "Pending" status, select "High" priority.
   * Sort by due date (earliest vs latest).
   * Show the empty state when filters return zero results, and click "Reset Filters".
5. **Code Decisions & Resilience (45s)**:
   * Briefly highlight `TaskContext.jsx` for clean separation of concerns.
   * Highlight `storage.js` for safe LocalStorage schema validation that prevents corruption or crashes.
   * Refresh the page to prove persistence.

