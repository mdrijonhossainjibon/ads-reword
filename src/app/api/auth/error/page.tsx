'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An error occurred during authentication';

  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Invalid credentials. Please check your email and password.';
      break;
    case 'AccessDenied':
      errorMessage = 'You do not have permission to access this area.';
      break;
    default:
      if (error) {
        errorMessage = error;
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Authentication Error</h1>
            <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
          <div className="text-center">
            <Link 
              href="/admin/login"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}