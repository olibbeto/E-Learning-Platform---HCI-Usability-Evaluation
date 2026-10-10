"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength meter logic
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthBars = [
    { score: 1, color: 'bg-red-500', text: 'Weak', textColor: 'text-red-500' },
    { score: 2, color: 'bg-amber-500', text: 'Fair', textColor: 'text-amber-500' },
    { score: 3, color: 'bg-blue-500', text: 'Good', textColor: 'text-blue-500' },
    { score: 4, color: 'bg-green-500', text: 'Strong', textColor: 'text-green-500' }
  ];
  
  const currentStrength = password ? strengthBars[Math.max(0, strength - 1)] : { text: '', color: 'bg-slate-200', textColor: 'text-slate-400' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Success - demo navigation
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-indigo-600 text-white flex-col justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-8">
            <div className="w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center">L</div>
            LearnEase
          </Link>
          <h1 className="text-5xl font-bold leading-tight mb-6 mt-20">
            Start your learning <br /> journey today.
          </h1>
          <p className="text-indigo-200 text-lg max-w-md">
            Join thousands of students and discover a simpler way to manage your education.
          </p>
        </div>
        
        <div className="bg-indigo-700/50 p-6 rounded-2xl backdrop-blur-sm border border-indigo-500/30">
          <p className="italic text-indigo-100 mb-4">
            "Switching to LearnEase was the best decision for my academic career. Highly recommended!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center font-bold">JD</div>
            <div>
              <p className="font-semibold text-sm">James Davis</p>
              <p className="text-xs text-indigo-300">Engineering Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white relative py-12">
        <Link href="/" className="absolute top-8 left-8 lg:hidden flex items-center gap-2 font-bold text-xl text-indigo-600">
          <div className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs">L</div>
          LearnEase
        </Link>
        
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
            <p className="text-slate-500">Sign up to get started with LearnEase.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onInput={e => setName((e.target as HTMLInputElement).value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onInput={e => setEmail((e.target as HTMLInputElement).value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="john.doe@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">Password</label>
              <div className="relative mb-2">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onInput={e => setPassword((e.target as HTMLInputElement).value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all pr-12"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {password && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map(num => (
                      <div
                        key={num}
                        className={`h-full flex-1 rounded-full ${strength >= num ? strengthBars[strength - 1].color : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${currentStrength.textColor} min-w-[45px] text-right`}>
                    {currentStrength.text}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm mt-4"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
