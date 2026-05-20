import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md">
        {/* Medical/Stethoscope Inspired 404 Visual Icon */}
        <div className="relative flex justify-center">
          <h1 className="text-9xl font-black text-blue-600 tracking-tight opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <svg className="w-16 h-16 text-blue-600 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Invalid Page</h2>
          <p className="text-slate-500 text-sm font-medium px-4">
            The page or doctor profile you are trying to reach is unavailable or has been moved.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}