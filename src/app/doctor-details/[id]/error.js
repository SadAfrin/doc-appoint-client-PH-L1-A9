'use client';

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
      <div className="text-center max-w-md bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-blue-200">
        
        <h1 className="text-6xl font-extrabold text-blue-600">Oops!</h1>

        <h2 className="mt-4 text-2xl font-semibold text-blue-900">
          Something went wrong
        </h2>

        <p className="mt-3 text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;