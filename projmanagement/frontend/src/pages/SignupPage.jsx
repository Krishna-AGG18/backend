import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/ui/auth-layout';
import { Mail, Lock, User, AtSign, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '../api/auth.api';


export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const signupMutation = useMutation({
    mutationFn: AuthAPI.register,
    onSuccess: () => {
      // Backend automatically verification email bhejega
      alert("Registration successful! Please check your email to verify your account.");
      navigate('/login');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation matching backend constraints
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (formData.username !== formData.username.toLowerCase()) {
      setError('Username must be in lowercase.');
      return;
    }
    if (!formData.email || !formData.username || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Actual API call
    signupMutation.mutate({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName || '',
      role: 'member' // Backend expects role, giving default as 'member'
    });
  };



  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to start planning and shipping with your team."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-400 text-[14px]">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Full Name (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <User size={18} />
            </div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <AtSign size={18} />
            </div>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="johndoe123"
            />
          </div>
          <p className="text-[12px] text-[#a1a1aa]">Must be lowercase, min 3 characters.</p>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Email address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Mail size={18} />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-[#f6f4ff]">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Lock size={18} />
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={signupMutation.isPending}
          className="w-full mt-6 bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(95,40,214,.4)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {signupMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Sign up'}
        </button>
      </form>

      <div className="mt-8 text-center text-[14px] text-[#a1a1aa]">
        Already have an account? <Link to="/login" className="text-white font-medium hover:text-primary transition-colors">Sign in</Link>
      </div>
    </AuthLayout>
  );
};
