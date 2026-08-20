"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendResetOtp, verifyOtpAndResetPassword, verifyOtp } from "@/app/actions/password";
import { toast } from "sonner";

type Step = "email" | "otp" | "password" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const router = useRouter();

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [step, timeLeft]);

  // Real Handlers
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await sendResetOtp(email);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("OTP sent to your email!");
      setStep("otp");
      setTimeLeft(60);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);
    const result = await verifyOtp(email, otpCode);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      setStep("password");
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return;
    setLoading(true);
    const result = await sendResetOtp(email);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("New OTP sent!");
      setTimeLeft(60);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const otpCode = otp.join("");
    const result = await verifyOtpAndResetPassword(email, otpCode, password);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Password reset successfully!");
      setStep("success");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // only one digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex">
      {/* Left Column: Flow */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto relative">

          {/* Header & Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-none">LMS Platform</h1>
              <p className="text-xs text-gray-500 font-medium">Account Recovery</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
                  <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading || !email}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send OTP Code"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to log in
                  </Link>
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
                  <p className="text-gray-500 text-sm">We sent a verification code to <span className="font-semibold text-gray-900 dark:text-gray-200">{email}</span></p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                      />
                    ))}
                  </div>

                  <button
                    disabled={loading || otp.join("").length < 6}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center text-sm">
                  <p className="text-gray-500">
                    Didn't receive the email?{" "}
                    <button 
                      type="button"
                      onClick={handleResendOtp}
                      disabled={timeLeft > 0 || loading}
                      className={`font-semibold transition-colors ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"}`}
                    >
                      {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Click to resend"}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {step === "password" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set new password</h2>
                  <p className="text-gray-500 text-sm">Your new password must be different from previously used passwords.</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading || !password || password !== confirmPassword}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-6"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset</h2>
                <p className="text-gray-500 text-sm mb-8">Your password has been successfully reset. Click below to log in magically.</p>

                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center"
                >
                  Continue to Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Visual Presentation */}
      <div className="hidden lg:flex flex-col w-[55%] bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-800/50 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">

          {/* Animated Shield/Lock Container */}
          <div className="relative w-64 h-64 mb-12">
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 border-2 border-white/20 rounded-full"
            />
            <motion.div
              animate={{ scale: [1.1, 1.4, 1.1], opacity: [0.2, 0.05, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 border border-white/10 rounded-full"
            />

            {/* Core Shield */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute inset-0 m-auto w-32 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center rotate-3 shadow-2xl"
            >
              <ShieldCheck className="w-16 h-16 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Floating Keys / Locks */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -right-4 w-12 h-12 bg-blue-500 rounded-xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md"
            >
              <KeyRound className="w-5 h-5 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-6 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-10"
            >
              <div className="w-3 h-3 rounded-full bg-blue-400" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Secure Account<br />Recovery Process
          </h2>
          <p className="text-blue-100/80 text-lg leading-relaxed max-w-sm">
            We use advanced encryption and secure one-time passwords to ensure you can safely recover your account.
          </p>

          <div className="flex justify-center gap-2 mt-8">
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${step === 'email' ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${step === 'otp' ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${step === 'password' ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${step === 'success' ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
