import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/ui/auth-layout';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '../api/auth.api';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotMutation = useMutation({
    mutationFn: AuthAPI.forgotPassword,
    onSuccess: () => {
      setIsSuccess(true); // Isse automatically aapka "Check your email" wala UI dikhne lagega
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // API Call
    forgotMutation.mutate({ email });
  };

  if (isSuccess) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We sent a password reset link to ${email}`}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-[#52e7bc]/10 text-[#52e7bc] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(82,231,188,0.2)]">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-center text-[#a1a1aa] mb-8 leading-relaxed">
            If an account exists for that email, you will receive instructions on how to reset your password.
          </p>
          <Link to="/login" className="w-full bg-[rgba(255,255,255,.045)] border border-[var(--line)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center hover:bg-white/5 transition-colors">
            Return to log in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-400 text-[14px]">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Email address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Mail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={forgotMutation.isPending}
          className="w-full mt-4 bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {forgotMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Send reset link'}
        </button>
      </form>

      <div className="mt-8 text-center text-[14px] text-[#a1a1aa]">
        <Link to="/login" className="inline-flex items-center gap-2 text-white font-medium hover:text-primary transition-colors">
          <ArrowLeft size={14} /> Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
};
