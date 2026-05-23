export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;
  const high = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-500">Progress</span>
        <span className="text-2xl font-display font-bold text-lime-400">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-lime-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: total, color: 'text-ink-200' },
          { label: 'Done', value: done, color: 'text-lime-400' },
          { label: '🔥 Urgent', value: high, color: 'text-rose-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <div className={`text-xl font-display font-bold ${color}`}>{value}</div>
            <div className="text-xs text-ink-500 font-mono mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
