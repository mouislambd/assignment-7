import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-10">
      <LoadingSpinner label="Loading page..." />
    </div>
  );
}
