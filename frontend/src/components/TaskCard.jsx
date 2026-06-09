import { useState } from 'react';

const PRIORITY_CONFIG = {
  low: {
    color: 'bg-sky-400',
    text: 'text-sky-400',
    label: 'Low',
    badge: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
  },
  medium: {
    color: 'bg-amber-400',
    text: 'text-amber-400',
    label: 'Med',
    badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  },
  high: {
    color: 'bg-rose-500',
    text: 'text-rose-400',
    label: 'High',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const p = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(task._id, !task.completed);
    setToggling(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task._id);
    // component unmounts after delete, no need to reset
  };

  return (
    <div
      className={`task-card p-4 group animate-slide-in ${
        task.completed ? 'opacity-60' : ''
      } ${deleting ? 'scale-95 opacity-0 transition-all duration-200' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-lime-400 border-lime-400'
              : 'border-ink-600 hover:border-lime-400/60'
          }`}
        >
          {task.completed && (
            <svg
              className="w-3 h-3 text-ink-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-display font-semibold text-sm leading-snug ${
                task.completed ? 'line-through text-ink-500' : 'text-ink-100'
              }`}
            >
              {task.title}
            </h3>

            {/* Priority badge */}
            <span
              className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border ${p.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
              {p.label}
            </span>
          </div>

          {task.description && (
            <p className="mt-1 text-xs text-ink-400 leading-relaxed line-clamp-2 font-body">
              {task.description}
            </p>
          )}

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs text-ink-600 font-mono">{formatDate(task.createdAt)}</span>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-ink-500 hover:text-rose-400 transition-all duration-150 rounded-lg px-2 py-1 hover:bg-rose-500/10"
            >
              {deleting ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
