export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[20px] flex-col items-center justify-center gap-4 rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <span className="h-20 w-20 animate-spin rounded-full border-8 border-slate-200 border-t-[#285848]" />
      <p className="text-base font-medium text-slate-600">{label}</p>
    </div>
  );
}
