import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/ui/auth-layout';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';


export const LoginPage = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore(state => state.setLogin);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (data) => {
      // Backend response structure ke according data nikal rahe hain
      const user = data.data.user;
      const token = data.data.accessToken;
      setLogin(user, token); // Zustand & localStorage me save ho jayega
      navigate('/dashboard'); // Dashboard par redirect
    },
    onError: (err) => {
      // Backend se jo error aayega wo dikhayenge, warna default error
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  });

    const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Actual API Call trigger karega
    loginMutation.mutate({ 
      email: formData.email, 
      password: formData.password 
    });
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your email to sign in to your workspace."
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
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#f6f4ff]">Password</label>
            <Link to="/forgot-password" className="text-[13px] text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a1a1aa]">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full bg-[#0a0812]/50 border border-white/10 rounded-[12px] py-3 pl-10 pr-4 text-white placeholder:text-[#a1a1aa]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loginMutation.isPending}
          className="w-full mt-4 bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(95,40,214,.4)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loginMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Sign in'}
        </button>
      </form>

      <div className="mt-8 text-center text-[14px] text-[#a1a1aa]">
        Don't have an account? <Link to="/signup" className="text-white font-medium hover:text-primary transition-colors">Sign up</Link>
      </div>
    </AuthLayout>
  );
};
