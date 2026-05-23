const TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterTabs({ active, onChange, counts }) {
  return (
    <div className="flex gap-1 p-1 bg-ink-800/60 rounded-xl border border-ink-700/60">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-display font-semibold transition-all duration-150 ${
            active === tab.value
              ? 'bg-lime-400 text-ink-900'
              : 'text-ink-400 hover:text-ink-200 hover:bg-ink-700/60'
          }`}
        >
          {tab.label}
          <span
            className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${
              active === tab.value
                ? 'bg-ink-900/20 text-ink-900'
                : 'bg-ink-700/60 text-ink-500'
            }`}
          >
            {counts[tab.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
