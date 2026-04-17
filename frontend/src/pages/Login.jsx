import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Briefcase, Search, ArrowRight, CheckCircle2, Phone, Fingerprint, Smartphone, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';

export default function Login() {
  const [searchParams] = useSearchParams();
  const isSignupMode = searchParams.get('mode') === 'signup';
  
  const [isLogin, setIsLogin] = useState(!isSignupMode);
  // Steps: 'role' → 'phone' → 'otp' → 'details' (sign-up) | 'auth' (sign-in)
  const [step, setStep] = useState(isSignupMode ? 'role' : 'auth');
  const [role, setRole] = useState(null); // 'client' or 'freelancer'
  const navigate = useNavigate();

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const inputRefs = useRef([]);

  // Generate a random 6-digit OTP
  const generateOtp = useCallback(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setResendTimer(30);
    setCanResend(false);
    setOtpError('');
    setOtp(['', '', '', '', '', '']);
    return code;
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    let interval;
    if (step === 'otp' && resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer, canResend]);

  // Handle Sign In submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  // Handle Phone number submit → go to OTP
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setUserPhone(phone);
    setPhoneError('');
    const code = generateOtp();
    setStep('otp');
    console.log(`[AutoTrust Demo] OTP sent to ${phone}: ${code}`);
  };

  // Handle remaining details submit → go to dashboard
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    navigate(role === 'freelancer' ? '/freelancer' : '/dashboard');
  };

  // Handle OTP input change with auto-focus
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      verifyOtp();
    }
  };

  // Handle paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Verify OTP → go to details step (not dashboard)
  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }
    if (enteredOtp === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
      // After success animation, go to details form
      setTimeout(() => {
        setStep('details');
      }, 1800);
    } else {
      setOtpError('Invalid OTP. Please check and try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (!canResend) return;
    const code = generateOtp();
    console.log(`[AutoTrust Demo] New OTP sent: ${code}`);
  };

  // Dynamic title & subtitle
  const getTitle = () => {
    switch (step) {
      case 'role': return 'Choose Your Role';
      case 'phone': return 'Enter Your Mobile Number';
      case 'otp': return otpVerified ? 'Phone Verified!' : 'Verify Your Phone Number';
      case 'details': return 'Complete Your Profile';
      case 'auth': return 'Welcome Back';
      default: return '';
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 'role': return 'To get started, please tell us how you plan to use the platform.';
      case 'phone': return 'We\'ll send you a one-time verification code via SMS.';
      case 'otp': return otpVerified 
        ? 'Your phone number has been verified successfully.' 
        : 'We\'ve sent a 6-digit OTP via SMS to your mobile number.';
      case 'details': return 'Fill in your details to finish setting up your account.';
      case 'auth': return 'Sign in with your email and password to continue.';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen -top-[20%] -right-[10%]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen -bottom-[20%] -left-[10%]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-xl z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white mb-6 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 hover:scale-105 transition-transform">
            <ShieldCheck size={32} />
          </Link>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
            {getTitle()}
          </h1>
          <p className="text-slate-400 mt-3 text-sm max-w-sm mx-auto">
            {getSubtitle()}
          </p>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none"></div>

          <AnimatePresence mode="wait">

            {/* ═══════════════ STEP: ROLE SELECTION ═══════════════ */}
            {step === 'role' && (
              <motion.div 
                key="role-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Client */}
                  <div 
                    onClick={() => setRole('client')}
                    className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden ${
                      role === 'client' 
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]' 
                        : 'border-slate-700 hover:border-slate-500 bg-slate-800/40'
                    }`}
                  >
                    {role === 'client' && (
                      <div className="absolute top-4 right-4 text-indigo-400"><CheckCircle2 size={20} /></div>
                    )}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                      role === 'client' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      <Search size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">Hire Talent</h3>
                      <p className="text-xs text-slate-400">I'm a client searching for freelancers</p>
                    </div>
                  </div>

                  {/* Freelancer */}
                  <div 
                     onClick={() => setRole('freelancer')}
                     className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden ${
                       role === 'freelancer' 
                         ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]' 
                         : 'border-slate-700 hover:border-slate-500 bg-slate-800/40'
                     }`}
                  >
                    {role === 'freelancer' && (
                      <div className="absolute top-4 right-4 text-blue-400"><CheckCircle2 size={20} /></div>
                    )}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                      role === 'freelancer' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">Work as Freelancer</h3>
                      <p className="text-xs text-slate-400">I'm looking for work and projects</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setStep('phone')}
                    disabled={!role}
                    className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 px-6"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════ STEP: PHONE NUMBER INPUT ═══════════════ */}
            {step === 'phone' && (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  {/* Phone Icon */}
                  <div className="flex flex-col items-center gap-4 mb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center">
                      <Smartphone size={28} className="text-indigo-400" />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-3.5 flex items-center gap-1.5 text-slate-500">
                      <Phone size={20} />
                      <span className="text-sm font-medium text-slate-400">+91</span>
                    </div>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Enter 10-digit mobile number" 
                      pattern="[0-9]{10}" 
                      maxLength={10}
                      defaultValue={userPhone}
                      className="w-full pl-[5.5rem] pr-4 py-3.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-lg tracking-wider font-mono" 
                      required 
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {phoneError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center justify-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={14} />
                        <span>{phoneError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Send OTP Button */}
                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    Send OTP
                    <ArrowRight size={18} />
                  </button>

                  {/* Back Button */}
                  <button 
                    type="button" 
                    onClick={() => setStep('role')}
                    className="w-full py-3 rounded-xl text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all text-sm"
                  >
                    ← Back to role selection
                  </button>
                </form>
              </motion.div>
            )}

            {/* ═══════════════ STEP: OTP VERIFICATION ═══════════════ */}
            {step === 'otp' && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <AnimatePresence mode="wait">
                  {otpVerified ? (
                    /* ── Success State ── */
                    <motion.div
                      key="otp-success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                      className="flex flex-col items-center justify-center py-8 gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                      >
                        <CheckCircle2 size={40} className="text-white" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Phone Verified Successfully</h3>
                        <p className="text-slate-400 text-sm">Continuing to account setup...</p>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.6, ease: 'easeInOut' }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    /* ── OTP Input State ── */
                    <motion.div
                      key="otp-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Icon & Info */}
                      <div className="flex flex-col items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center">
                          <Smartphone size={28} className="text-indigo-400" />
                        </div>
                        {userPhone && (
                          <p className="text-sm text-slate-400 text-center">
                            OTP sent to <span className="text-indigo-400 font-medium">+91 {userPhone.slice(0, 2)}●●●●●{userPhone.slice(-2)}</span>
                          </p>
                        )}
                      </div>

                      {/* Demo OTP Display */}
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                        <Sparkles size={16} className="text-indigo-400 flex-shrink-0" />
                        <p className="text-xs text-indigo-300">
                          <span className="font-semibold">Demo Mode:</span> SMS OTP is{' '}
                          <span className="font-mono font-bold text-indigo-200 tracking-widest text-sm">{generatedOtp}</span>
                        </p>
                      </div>

                      {/* OTP Input Boxes */}
                      <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                          <motion.input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleOtpChange(index, e.target.value)}
                            onKeyDown={e => handleOtpKeyDown(index, e)}
                            onPaste={index === 0 ? handleOtpPaste : undefined}
                            autoFocus={index === 0}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-xl border-2 bg-slate-900/60 outline-none transition-all duration-200 caret-indigo-400 ${
                              digit 
                                ? 'border-indigo-500 text-indigo-300 shadow-[0_0_12px_-3px_rgba(99,102,241,0.4)]' 
                                : 'border-slate-700 text-slate-200'
                            } focus:border-indigo-500 focus:shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]`}
                          />
                        ))}
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {otpError && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center justify-center gap-2 text-red-400 text-sm"
                          >
                            <AlertCircle size={14} />
                            <span>{otpError}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Verify Button */}
                      <button
                        onClick={verifyOtp}
                        disabled={otp.join('').length !== 6}
                        className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Verify OTP
                      </button>

                      {/* Resend & Timer */}
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {canResend ? (
                          <button
                            onClick={handleResend}
                            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                          >
                            <RotateCcw size={14} />
                            Resend Code
                          </button>
                        ) : (
                          <span className="text-slate-500">
                            Resend code in <span className="text-slate-400 font-mono font-semibold">{resendTimer}s</span>
                          </span>
                        )}
                      </div>

                      {/* Back Button */}
                      <button 
                        type="button" 
                        onClick={() => {
                          setStep('phone');
                          setOtp(['', '', '', '', '', '']);
                          setOtpError('');
                          setOtpVerified(false);
                        }}
                        className="w-full py-3 rounded-xl text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all text-sm"
                      >
                        ← Change phone number
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ═══════════════ STEP: REMAINING DETAILS (after OTP verified) ═══════════════ */}
            {step === 'details' && (
              <motion.div
                key="details-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Verified badge */}
                <div className="flex items-center gap-2 mb-6 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-medium">
                    +91 {userPhone.slice(0, 2)}●●●●●{userPhone.slice(-2)} — Verified
                  </span>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="email" name="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>

                  <div className="relative">
                    <Fingerprint className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="text" placeholder="Aadhaar Card No. (xxxx xxxx xxxx)" pattern="[0-9]{12}" maxLength={12} className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>


                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="password" placeholder="Create Password" className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all">
                      Create Account
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-slate-500 text-sm">
                      Already have an account?{' '}
                      <button 
                        type="button" 
                        onClick={() => { setIsLogin(true); setStep('auth'); }}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ═══════════════ STEP: SIGN IN (auth) ═══════════════ */}
            {step === 'auth' && (
              <motion.div 
                key="auth-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="email" name="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600" required />
                  </div>

                  <div className="text-right pt-1">
                    <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all">
                      Sign In
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-slate-500 text-sm">
                      Don't have an account?{' '}
                      <button 
                        type="button" 
                        onClick={() => { setIsLogin(false); setStep('role'); }}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute border-t border-slate-700 w-full"></div>
                    <p className="relative bg-[#0f172a] px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Or continue with</p>
                  </div>
                  
                  <button type="button" className="mt-6 w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 py-3 rounded-xl transition-all font-semibold shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
