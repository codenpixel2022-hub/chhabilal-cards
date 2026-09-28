import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Building, FileText, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'login' | 'register';
  checkoutReason?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
  checkoutReason = false,
}) => {
  if (!isOpen) return null;

  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMsg('Login successful!');
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 500);
      } else {
        setErrorMsg(res.message || 'Invalid credentials');
      }
    } else {
      if (!name || !email || !phone || !password) {
        setErrorMsg('Please fill in all required fields.');
        return;
      }
      const res = await register(name, email, phone, password, businessName, gstNumber);
      if (res.success) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 500);
      } else {
        setErrorMsg(res.message || 'Registration failed');
      }
    }
  };

  const handleQuickDemoAdmin = async () => {
    setEmail('admin@chhabilalcards.in');
    setPassword('ChangeMe@12345');
    const res = await login('admin@chhabilalcards.in', 'ChangeMe@12345');
    if (res.success) {
      onClose();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div 
        className="w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#58141C] text-[#FAF9F6] p-6 text-center relative border-b border-[#D4AF37]/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#E5E1DA] hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="text-[#D4AF37] font-royal font-bold text-xs uppercase tracking-widest block mb-1">
            Chhabilal Cards Account
          </span>
          <h3 className="font-royal text-2xl font-bold text-[#F2EDE4]">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-xs text-[#E5E1DA]/80 mt-1">
            {checkoutReason 
              ? 'Please login or register to complete your order checkout.' 
              : 'Access wholesale prices, saved orders & persistent wishlist'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D2926]">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C847C] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D2926]">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C847C] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D2926]">Phone / WhatsApp Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C847C] absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D2926]">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C847C] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4A443F]">School / Org Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-2.5 py-1.5 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4A443F]">GSTIN (Optional)</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="GST Number"
                  className="w-full px-2.5 py-1.5 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
          </button>

          {/* Quick Demo Admin Auto Fill */}
          {mode === 'login' && (
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="w-full py-2 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#8B0000] text-[11px] uppercase tracking-wider font-bold rounded-xl transition-colors"
            >
              🔑 Quick Demo Login as Admin
            </button>
          )}

          <div className="text-center pt-2 border-t border-[#E5E1DA]">
            {mode === 'login' ? (
              <p className="text-xs text-[#4A443F]">
                New to Chhabilal Cards?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#8B0000] font-bold hover:underline"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p className="text-xs text-[#4A443F]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#8B0000] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
