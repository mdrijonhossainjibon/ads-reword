'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useSearchParams  } from "next/navigation";


export default function authLoginPAGE() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const router = useRouter();

  const {  status } = useSession();
  


  useEffect(() => {
    // Check for saved credentials
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || '';
   

  useEffect(() =>{
     if(status === 'authenticated') {
       router.push(callbackUrl || '/');
     }
  } ,[ callbackUrl  , router , status ])

 
  const handleGoogleSignIn = async () => {
    try {
      await signIn('google' , {  callbackUrl , redirect : true   });
   
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      setError('Please enter a valid email address');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
        console.error(result.error);
        return;
      }

      // Handle "Remember me"
      if (rememberMe) {
        localStorage.setItem('adminEmail', email);
      } else {
        localStorage.removeItem('adminEmail');
      }

      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
          router.push('/tasks');
        }, 1500);
      }
    } catch (error: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
            <p className="text-gray-500 dark:text-gray-400">Please sign in to continue</p>
          </div>

          {/* Success Message */}
          <div
            id="success-message"
            className="hidden transform transition-all duration-300 bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded"
            role="alert"
          >
            <p className="text-green-700 dark:text-green-100 font-medium">Login successful! Redirecting...</p>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="transform transition-all duration-300 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded"
              role="alert"
            >
              <p className="text-red-700 dark:text-red-100 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValidEmail(validateEmail(e.target.value));
                  }}
                  onBlur={() => setIsValidEmail(validateEmail(email))}
                  placeholder="admin@example.com"
                  className={`block w-full pl-10 pr-4 py-3 rounded-lg border ${
                    !isValidEmail ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                  aria-invalid={!isValidEmail}
                  required
                />
              </div>
              {!isValidEmail && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              <span className="text-base font-medium">
                {isLoading ? 'Signing in...' : 'Sign in with Email'}
              </span>
            </button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={ handleGoogleSignIn  } 
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-base font-medium">Sign in with Google</span>
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/admin/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
            >
              <FaGithub className="h-5 w-5" />
              <span className="text-base font-medium">Sign in with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}