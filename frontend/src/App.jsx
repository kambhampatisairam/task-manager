import { useState, useEffect, useCallback } from 'react';
import { api } from './api/tasks';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import StatsBar from './components/StatsBar';
import FilterTabs from './components/FilterTabs';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();
  }, [fetchTasks]);

  // Add task
  const handleAdd = async (payload) => {
    setAdding(true);
    try {
      const { data } = await api.createTask(payload);
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  // Toggle complete
  const handleToggle = async (id, completed) => {
    try {
      const { data } = await api.updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtered tasks
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-ink-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-ink-50 tracking-tight">
              TaskFlow
            </h1>
          </div>
          <p className="text-ink-500 text-sm font-body ml-11">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400 animate-fade-up">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
            <button onClick={() => setError(null)} className="ml-auto hover:text-rose-300">
              ✕
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <StatsBar tasks={tasks} />
        </div>

        {/* Add task form */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <TaskForm onAdd={handleAdd} loading={adding} />
        </div>

        {/* Filter tabs */}
        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <FilterTabs active={filter} onChange={setFilter} counts={counts} />
        </div>

        {/* Task list */}
        <div className="space-y-2.5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <svg className="w-8 h-8 text-lime-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-ink-500 text-sm font-mono">Loading tasks…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-700/60 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-ink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-ink-400 font-display font-semibold text-sm">
                  {filter === 'completed'
                    ? 'No completed tasks yet'
                    : filter === 'active'
                      ? 'All tasks done!'
                      : 'No tasks yet'}
                </p>
                <p className="text-ink-600 text-xs mt-1 font-body">
                  {filter === 'all'
                    ? 'Add your first task above'
                    : 'Switch filter to see other tasks'}
                </p>
              </div>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-ink-700 font-mono pb-4">
          React · Vite · Tailwind · Express · MongoDB
        </p>
      </div>
    </div>
  );
}
// changes done in frontend