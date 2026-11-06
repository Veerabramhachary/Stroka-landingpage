import React, { useState } from 'react';
import { X, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signup' | 'signin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signup',
}) => {
  const [mode, setMode] = useState<'signup' | 'signin'>(
    defaultMode === 'signin' ? 'signin' : 'signup'
  );
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ledgerPreference, setLedgerPreference] = useState<'both' | 'business' | 'personal'>('both');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252922]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E2DED4] p-6 sm:p-8 z-10 transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#898A80] hover:text-[#252922] transition-colors p-1 rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#E7EEE7] text-[#42634A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#CBC6BA]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#252922] mb-2">
              {mode === 'signup' ? 'Welcome to Stroka!' : 'Secure Sign In Link Dispatched'}
            </h3>
            <p className="text-sm text-[#65685F] mb-6 leading-relaxed">
              We have dispatched your encrypted login link to{' '}
              <span className="font-semibold text-[#252922]">{email}</span>.
              Your records are encrypted in transit and at rest.
            </p>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2DED4] text-xs text-[#65685F] text-left mb-6 space-y-1">
              <div className="font-semibold text-[#252922]">Ledger Configuration:</div>
              <div>· Accounting Currency: Indian Rupee (₹ INR)</div>
              <div>· Dual Ledgers: Personal & Business Active</div>
              <div>· 18% GST Tax Summary tagging (up to 400 days & 20k rows)</div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 bg-[#667267] hover:bg-[#505D52] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
            >
              Continue to Stroka
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Logo size={24} />
              <span className="text-xs font-bold tracking-widest uppercase text-[#B18B58]">
                Stroka INR Ledger
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#252922] mb-1">
              {mode === 'signup' ? 'Create your free account' : 'Welcome back'}
            </h2>
            <p className="text-xs text-[#65685F] mb-6">
              {mode === 'signup'
                ? 'Free forever · Encrypted in transit & at rest · No credit card required'
                : 'Enter your email to receive a passwordless login link'}
            </p>

            {/* Mode switch */}
            <div className="grid grid-cols-2 p-1 bg-[#EDEAE1] rounded-xl mb-6 border border-[#E2DED4]">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-[#FFFFFF] text-[#252922] shadow-xs'
                    : 'text-[#65685F] hover:text-[#252922]'
                }`}
              >
                Sign Up Free
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-[#FFFFFF] text-[#252922] shadow-xs'
                    : 'text-[#65685F] hover:text-[#252922]'
                }`}
              >
                Sign In
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-[#F4E7E3] border border-[#A34F43]/30 text-[#A34F43] rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#65685F] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DED4] rounded-xl text-[#252922] placeholder-[#898A80] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#65685F] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DED4] rounded-xl text-[#252922] placeholder-[#898A80] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#65685F] mb-1">
                    Primary Usage
                  </label>
                  <select
                    value={ledgerPreference}
                    onChange={(e) => setLedgerPreference(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#E2DED4] rounded-xl text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#9AA697]"
                  >
                    <option value="both">Both Personal & Business Ledgers</option>
                    <option value="business">Business & Freelance (GST Tax Focus)</option>
                    <option value="personal">Personal Subscriptions Only</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group"
              >
                <span>{mode === 'signup' ? 'Create Free INR Ledger' : 'Send Sign In Link'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#E2DED4] flex items-center justify-center gap-2 text-[#898A80] text-xs">
              <Shield className="w-4 h-4 text-[#42634A]" />
              <span>Encrypted in transit & at rest · Zero ad telemetry</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
