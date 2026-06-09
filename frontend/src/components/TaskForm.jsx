import { useState } from 'react';

const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-sky-400' },
  { value: 'medium', label: 'Med', color: 'bg-amber-400' },
  { value: 'high', label: 'High', color: 'bg-rose-500' },
];

export default function TaskForm({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setExpanded(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-lime-400/30 bg-ink-800/60 backdrop-blur-sm p-5 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-lime-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!expanded && e.target.value) setExpanded(true);
          }}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new task…"
          className="flex-1 bg-transparent text-ink-100 placeholder-ink-500 font-display text-sm font-medium outline-none"
          disabled={loading}
        />
      </div>

      {expanded && (
        <div className="space-y-3 animate-fade-up">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={2}
            className="w-full bg-ink-900/60 border border-ink-700/60 rounded-xl px-4 py-3 text-sm text-ink-200 placeholder-ink-600 outline-none focus:border-lime-400/50 transition-colors resize-none font-body"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-ink-500 mr-1 font-mono uppercase tracking-wider">
                Priority
              </span>
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all duration-150 ${
                    priority === p.value
                      ? 'bg-ink-700 text-ink-100 ring-1 ring-ink-500'
                      : 'text-ink-500 hover:text-ink-300 hover:bg-ink-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  setTitle('');
                  setDescription('');
                }}
                className="btn-ghost text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || loading}
                className="btn-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? (
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
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
