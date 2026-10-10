"use client";

import { useState, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    if (email === 'alex.johnson@university.edu' && password === 'password123') {
      // In a real app, you'd set context/auth state here
      router.push('/dashboard');
    } else {
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-indigo-600 text-white flex-col justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-8">
            <div className="w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center">L</div>
            LearnEase
          </Link>
          <h1 className="text-5xl font-bold leading-tight mb-6 mt-20">
            Welcome back to <br /> your learning journey.
          </h1>
          <p className="text-indigo-200 text-lg max-w-md">
            Pick up exactly where you left off and discover new ways to expand your knowledge today.
          </p>
        </div>
        
        <div className="bg-indigo-700/50 p-6 rounded-2xl backdrop-blur-sm border border-indigo-500/30">
          <p className="italic text-indigo-100 mb-4">
            "LearnEase has completely simplified my study routine. Everything is just one click away."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center font-bold">SM</div>
            <div>
              <p className="font-semibold text-sm">Sarah Miller</p>
              <p className="text-xs text-indigo-300">Computer Science Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 lg:hidden flex items-center gap-2 font-bold text-xl text-indigo-600">
          <div className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs">L</div>
          LearnEase
        </Link>
        
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign in</h2>
            <p className="text-slate-500">Welcome back! Please enter your details.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1">Demo Credentials</p>
            <p className="text-sm text-indigo-900 font-mono">alex.johnson@university.edu</p>
            <p className="text-sm text-indigo-900 font-mono">password123</p>
            <button
              type="button"
              onClick={() => { setEmail('alex.johnson@university.edu'); setPassword('password123'); }}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Use Demo Credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all pr-12"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => showToast('Password reset link sent to your email.')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => showToast('Google sign-in is not available in demo mode')}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
