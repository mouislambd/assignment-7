import { Check } from "lucide-react";

export default function Toast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-lg bg-white border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 shadow-lg">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600">
        <Check className="h-3 w-3 text-white" />
      </span>
      <span>{message}</span>
    </div>
  );
}
