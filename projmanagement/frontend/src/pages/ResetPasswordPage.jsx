import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthLayout } from '../components/ui/auth-layout';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log('Resetting password with token:', token);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password reset" 
        subtitle="Your password has been successfully reset."
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-[#52e7bc]/10 text-[#52e7bc] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(82,231,188,0.2)]">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-center text-[#a1a1aa] mb-8 leading-relaxed">
            You can now use your new password to log in to your account.
          </p>
          <Link to="/login" className="w-full bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center hover:opacity-90 transition-opacity">
            Continue to log in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Set new password" 
      subtitle="Must be at least 8 characters."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-400 text-[14px]">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">New password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Confirm password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(95,40,214,.4)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Reset password'}
        </button>
      </form>
    </AuthLayout>
  );
};
