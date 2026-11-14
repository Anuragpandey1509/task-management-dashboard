import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import TaskDetailModal from './components/TaskDetailModal';
import Toast from './components/Toast';
import { Plus } from 'lucide-react';
import { useTasks } from './context/TaskContext';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { openCreateModal } = useTasks();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dashboard Main Scrollable Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          {/* Section 1: Summary Metric Cards */}
          <section aria-label="Task Summary Cards">
            <SummaryCards />
          </section>

          {/* Section 2: Search, Filters & Sorting Bar */}
          <section aria-label="Task Filters and Search">
            <FilterBar />
          </section>

          {/* Section 3: Task List / Grid Display */}
          <section aria-label="Task Catalog Area" className="min-h-[300px]">
            <TaskList />
          </section>
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200/60 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
          TaskFlow Management Dashboard &bull; React.js &bull; LocalStorage Persisted &bull; Responsive Design
        </footer>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <button
        onClick={openCreateModal}
        className="fixed sm:hidden right-5 bottom-6 z-30 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-xl shadow-indigo-600/40 flex items-center justify-center transition-transform"
        aria-label="Create task"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Global Modals & Notifications */}
      <TaskModal />
      <DeleteConfirmModal />
      <TaskDetailModal />
      <Toast />
    </div>
  );
}

