export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 p-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin">
      </div>
      <p className="mt-4 text-gray-500 font-medium italic">
        Loading...
      </p>
    </div>
  );
}