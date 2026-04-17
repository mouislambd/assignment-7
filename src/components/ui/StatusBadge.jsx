const STATUS_STYLES = {
  active: "bg-blue-500 text-white",
  away: "bg-slate-500 text-white",
  "on-track": "bg-green-500 text-white",
  overdue: "bg-red-500 text-white",
  "almost due": "bg-yellow-500 text-white",
};

const STATUS_LABELS = {
  active: "Active",
  away: "Away",
  "on-track": "Active",
  overdue: "Overdue",
  "almost due": "Due Soon",
};

export default function StatusBadge({ status, className = "" }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLES[status] ?? "bg-slate-200 text-slate-700"} ${className}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
