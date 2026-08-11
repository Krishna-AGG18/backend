import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthLayout } from '../components/ui/auth-layout';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { AuthAPI } from '../api/auth.api';

export const VerifyEmailPage = () => {
  const { verificationToken  } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const hasCalled = useRef(false);

  useEffect(() => {
    if (!verificationToken) {
      setStatus('error');
      return;
    }

    // Simulate API call to verify token
    const verifyToken = async () => {
      if (hasCalled.current) return;
      hasCalled.current = true;

      try {
        // Backend API call
        await AuthAPI.verifyEmail(verificationToken);
        setStatus('success');
      } catch (err) {
        // Token galat/expire hone par error status dikhayega
        setStatus('error');
      }
    };

    verifyToken();
  }, [verificationToken ]);

  return (
    <AuthLayout 
      title="Email Verification" 
      subtitle={
        status === 'verifying' ? "Please wait while we verify your email address..." :
        status === 'success' ? "Your email has been successfully verified." :
        "We couldn't verify your email address."
      }
    >
      <div className="flex flex-col items-center justify-center py-8">
        
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="text-primary animate-spin mb-6" />
            <p className="text-center text-[#a1a1aa] mb-8 leading-relaxed">
              Verifying your email token...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 bg-[#52e7bc]/10 text-[#52e7bc] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(82,231,188,0.2)]">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-center text-[#a1a1aa] mb-8 leading-relaxed">
              Thank you for verifying your email. You can now access all features of your workspace.
            </p>
            <Link to="/login" className="w-full bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center hover:opacity-90 transition-opacity">
              Continue to log in
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <XCircle size={32} />
            </div>
            <p className="text-center text-[#a1a1aa] mb-8 leading-relaxed">
              The verification link is invalid or has expired. Please request a new verification email.
            </p>
            <Link to="/login" className="w-full bg-[rgba(255,255,255,.045)] border border-[var(--line)] text-white py-3 rounded-[12px] font-semibold flex items-center justify-center hover:bg-white/5 transition-colors">
              Return to log in
            </Link>
          </div>
        )}

      </div>
    </AuthLayout>
  );
};
