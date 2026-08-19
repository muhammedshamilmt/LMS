"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  Tag,
  CreditCard,
  ShieldCheck,
  Star,
  PlaySquare,
  Clock,
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Mock data for the cart to show a detailed UI
const INITIAL_CART = [
  {
    id: "course-1",
    title: "Complete Web Design: from Figma to Webflow to Freelancing",
    author: "Vako Shvili",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10",
    rating: 4.8,
    reviews: 14500,
    price: 89.99,
    originalPrice: 119.99,
    lectures: 142,
    duration: "28.5 total hours",
    level: "All Levels"
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [coupon, setCoupon] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "razorpay" | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.originalPrice, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0) - discount;

  useEffect(() => {
    // Check for Stripe success or cancel
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast.success("Payment successful!");
      setCartItems([]);
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (query.get("canceled")) {
      toast.error("Payment was canceled.");
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleCheckout = async () => {
    if (!paymentMethod) return;

    if (paymentMethod === "stripe") {
      setIsCheckingOut(true);
      try {
        const sessionResponse = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            originUrl: window.location.origin + window.location.pathname
          }),
        });

        const sessionData = await sessionResponse.json();

        if (!sessionResponse.ok) {
          throw new Error(sessionData.error || "Failed to create Stripe session");
        }

        if (sessionData.url) {
          window.location.href = sessionData.url;
        } else {
          throw new Error("Stripe checkout URL not found.");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred with Stripe checkout.");
        setIsCheckingOut(false);
      }
      return;
    }

    setIsCheckingOut(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setIsCheckingOut(false);
        return;
      }

      const orderResponse = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 83, currency: "INR" }), // Convert to INR to unlock UPI, Netbanking, etc.
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LMS Platform",
        description: "Course Enrollment Payment",
        order_id: orderData.id,
        handler: function (response: any) {
          toast.success("Payment successful!");
          setCartItems([]); // Empty cart on success
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "+919999999999",
        },
        theme: {
          color: "#7956ED",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        toast.error("Payment failed. Please try again.");
      });

      paymentObject.open();

    } catch (error: any) {
      toast.error(error.message || "An error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      setDiscount(10); // Mock a $10 discount
      setIsApplying(false);
    }, 800);
  };

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-[#0a0a0a] px-6">
        <div className="w-40 h-40 bg-gray-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-zinc-700" />
        </div>
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Keep shopping to find a course! We have a wide variety of topics to help you learn and grow.
        </p>
        <Link href="/students/courses">
          <Button className="h-14 px-8 rounded-2xl bg-[#7956ED] hover:bg-[#6b4ce6] text-white font-medium text-lg shadow-[0_8px_20px_rgba(121,86,237,0.3)] transition-all hover:shadow-[0_8px_25px_rgba(121,86,237,0.4)] hover:-translate-y-0.5">
            Keep Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-[#0a0a0a] p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="mb-10 mt-4">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-3 tracking-tight">Shopping Cart</h1>
        <p className="text-lg text-gray-500 font-medium">
          {cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'} in Cart
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

        {/* Left Column - Cart Items */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 p-6 rounded-[28px] border border-gray-100 dark:border-zinc-800/60 bg-white dark:bg-[#0f0f0f] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative group transition-all hover:border-gray-200 dark:hover:border-zinc-700"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-[240px] h-[140px] flex-shrink-0 rounded-[20px] overflow-hidden relative bg-gray-100 dark:bg-zinc-800">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col pt-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-medium text-[#7956ED] dark:text-[#9b7aff]">
                      ${item.price}
                    </div>
                    {item.originalPrice > item.price && (
                      <div className="text-sm text-gray-400 line-through font-medium">
                        ${item.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[14px] text-gray-500 mb-3 font-medium">By {item.author}</p>

                <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-600 dark:text-gray-400 mb-6 font-medium">
                  <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium">{item.rating}</span>
                    <span className="opacity-70">({item.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {item.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PlaySquare className="w-4 h-4 text-gray-400" />
                    {item.lectures} lectures
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600"></span>
                    {item.level}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-4 border-t border-gray-100 dark:border-zinc-800/60 pt-4">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-[14px] font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                  <button className="text-[14px] font-semibold text-[#7956ED] hover:text-[#6b4ce6] transition-colors">
                    Save for later
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
          <div className="bg-gray-50/50 dark:bg-[#0f0f0f] rounded-[32px] p-8 border border-gray-100 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none sticky top-8">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-gray-500 font-medium">Original Price</span>
                <span className="text-gray-900 dark:text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-gray-500 font-medium">Discounts</span>
                <span className="text-green-500 font-semibold">-${(subtotal - total - discount).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500 font-medium">Coupon</span>
                  <span className="text-green-500 font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full my-4"></div>

              <div className="flex justify-between items-end">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                <div className="text-right">
                  <span className="text-4xl font-medium text-[#7956ED] dark:text-[#9b7aff] block leading-none mb-1">
                    ${Math.max(0, total).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">USD</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-3 block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`h-14 rounded-xl border flex items-center justify-center transition-all ${paymentMethod === "stripe" ? "border-[#7956ED] bg-[#7956ED]/5 ring-2 ring-[#7956ED]/20" : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-white dark:bg-[#0a0a0a]"}`}
                >
                  <svg className="h-7" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 1000 597.02"><path fill="gray" fillRule="nonzero" d="M94.1 0h811.8c25.89 0 49.42 10.58 66.47 27.63C989.42 44.68 1000 68.21 1000 94.1v408.82c0 25.89-10.59 49.42-27.63 66.47-17.05 17.05-40.58 27.63-66.47 27.63H94.1c-25.89 0-49.42-10.58-66.47-27.63C10.59 552.34 0 528.82 0 502.92V94.1c0-25.89 10.58-49.42 27.63-66.47C44.68 10.58 68.21 0 94.1 0zm811.8 32.43H94.1c-16.94 0-32.36 6.95-43.54 18.13S32.43 77.16 32.43 94.1v408.82c0 16.94 6.95 32.35 18.13 43.54 11.19 11.18 26.6 18.13 43.54 18.13h811.8c16.94 0 32.35-6.95 43.54-18.13 11.18-11.19 18.13-26.6 18.13-43.54V94.1c0-16.94-6.95-32.35-18.13-43.54-11.19-11.18-26.6-18.13-43.54-18.13z" /><path fill="#635BFF" d="M811.73 302.84c0-44.33-21.48-79.32-62.52-79.32-41.22 0-66.16 34.99-66.16 78.97 0 52.13 29.45 78.45 71.7 78.45 20.61 0 36.2-4.67 47.98-11.25v-34.64c-11.78 5.89-25.29 9.53-42.43 9.53-16.8 0-31.7-5.89-33.6-26.33h84.69c0-2.25.34-11.25.34-15.41zm-85.55-16.45c0-19.57 11.95-27.71 22.86-27.71 10.56 0 21.82 8.14 21.82 27.71h-44.68zm-109.97-62.87c-16.98 0-27.89 7.97-33.95 13.51l-2.25-10.74h-38.1v201.93l43.29-9.18.18-49.01c6.23 4.51 15.41 10.91 30.65 10.91 31 0 59.23-24.94 59.23-79.83-.17-50.22-28.75-77.59-59.05-77.59zm-10.39 119.32c-10.22 0-16.28-3.63-20.44-8.14l-.18-64.24c4.51-5.03 10.74-8.49 20.62-8.49 15.75 0 26.66 17.66 26.66 40.35 0 23.21-10.73 40.52-26.66 40.52zM482.34 213.31l43.47-9.35V168.8l-43.47 9.18v35.33zm0 13.16h43.47V378h-43.47V226.47zm-46.59 12.81l-2.77-12.81h-37.41V378h43.3V275.3c10.21-13.33 27.53-10.91 32.9-9v-39.83c-5.54-2.08-25.81-5.89-36.02 12.81zm-86.59-50.39l-42.26 9.01-.17 138.71c0 25.63 19.22 44.51 44.85 44.51 14.2 0 24.59-2.6 30.31-5.72v-35.15c-5.54 2.25-32.91 10.21-32.91-15.42v-61.47h32.91v-36.89h-32.91l.18-37.58zm-117.08 81.57c0-6.76 5.55-9.35 14.73-9.35 13.16 0 29.78 3.98 42.95 11.08v-40.7c-14.38-5.71-28.58-7.97-42.95-7.97-35.16 0-58.54 18.36-58.54 49.01 0 47.8 65.81 40.18 65.81 60.79 0 7.97-6.93 10.56-16.63 10.56-14.37 0-32.73-5.88-47.27-13.85v41.21c16.1 6.93 32.38 9.88 47.27 9.88 36.03 0 60.79-17.84 60.79-48.84-.17-51.61-66.16-42.43-66.16-61.82z" /></svg>
                </button>
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`h-14 rounded-xl border flex items-center justify-center transition-all ${paymentMethod === "razorpay" ? "border-[#7956ED] bg-[#7956ED]/5 ring-2 ring-[#7956ED]/20" : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-white dark:bg-[#0a0a0a]"}`}
                >
                  <svg className="h-5" viewBox="0 0 122.88 26.53" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"><style>{".st0{fill:#3395FF;}.st1{fill:#072654;}.dark .st1{fill:#FFFFFF;}"}</style><g><polygon className="st1" points="11.19,9.03 7.94,21.47 0,21.47 1.61,15.35 11.19,9.03" /><path className="st1" d="M28.09,5.08C29.95,5.09,31.26,5.5,32,6.33s0.92,2.01,0.51,3.56c-0.27,1.06-0.82,2.03-1.59,2.8 c-0.8,0.8-1.78,1.38-2.87,1.68c0.83,0.19,1.34,0.78,1.5,1.79l0.03,0.22l0.6,5.09h-3.7l-0.62-5.48c-0.01-0.18-0.06-0.36-0.15-0.52 c-0.09-0.16-0.22-0.29-0.37-0.39c-0.31-0.16-0.65-0.24-1-0.25h-0.21h-2.28l-1.74,6.63h-3.46l4.3-16.38H28.09L28.09,5.08z M122.88,9.37l-4.4,6.34l-5.19,7.52l-0.04,0.04l-1.16,1.68l-0.04,0.06L112,25.09l-1,1.44h-3.44l4.02-5.67l-1.82-11.09h3.57 l0.9,7.23l4.36-6.19l0.06-0.09l0.07-0.1l0.07-0.09l0.54-1.15H122.88L122.88,9.37z M92.4,10.25c0.66,0.56,1.09,1.33,1.24,2.19 c0.18,1.07,0.1,2.18-0.21,3.22c-0.29,1.15-0.78,2.23-1.46,3.19c-0.62,0.88-1.42,1.61-2.35,2.13c-0.88,0.48-1.85,0.73-2.85,0.73 c-0.71,0.03-1.41-0.15-2.02-0.51c-0.47-0.28-0.83-0.71-1.03-1.22l-0.06-0.2l-1.77,6.75h-3.43l3.51-13.4l0.02-0.06l0.01-0.06 l0.86-3.25h3.35l-0.57,1.88l-0.01,0.08c0.49-0.7,1.15-1.27,1.91-1.64c0.76-0.4,1.6-0.6,2.45-0.6C90.84,9.43,91.7,9.71,92.4,10.25 L92.4,10.25z M88.26,12.11c-0.4-0.01-0.8,0.07-1.18,0.22c-0.37,0.15-0.71,0.38-1,0.66c-0.68,0.7-1.15,1.59-1.36,2.54 c-0.3,1.11-0.28,1.95,0.02,2.53c0.3,0.58,0.87,0.88,1.72,0.88c0.81,0.02,1.59-0.29,2.18-0.86c0.66-0.69,1.12-1.55,1.33-2.49 c0.29-1.09,0.27-1.96-0.03-2.57S89.08,12.11,88.26,12.11L88.26,12.11z M103.66,9.99c0.46,0.29,0.82,0.72,1.02,1.23l0.07,0.19 l0.44-1.66h3.36l-3.08,11.7h-3.37l0.45-1.73c-0.51,0.61-1.15,1.09-1.87,1.42c-0.7,0.32-1.45,0.49-2.21,0.49 c-0.88,0.04-1.76-0.21-2.48-0.74c-0.66-0.52-1.1-1.28-1.24-2.11c-0.18-1.06-0.12-2.14,0.19-3.17c0.3-1.15,0.8-2.24,1.49-3.21 c0.63-0.89,1.44-1.64,2.38-2.18c0.86-0.5,1.84-0.77,2.83-0.77C102.36,9.43,103.06,9.61,103.66,9.99L103.66,9.99z M101.92,12.14 c-0.41,0-0.82,0.08-1.19,0.24c-0.38,0.16-0.72,0.39-1.01,0.68c-0.67,0.71-1.15,1.59-1.36,2.55c-0.28,1.08-0.28,1.9,0.04,2.49 c0.31,0.59,0.89,0.87,1.75,0.87c0.4,0.01,0.8-0.07,1.18-0.22s0.71-0.38,1-0.66c0.59-0.63,1.02-1.38,1.26-2.22l0.08-0.31 c0.3-1.11,0.29-1.96-0.03-2.53C103.33,12.44,102.76,12.14,101.92,12.14L101.92,12.14z M81.13,9.63l0.22,0.09l-0.86,3.19 c-0.49-0.26-1.03-0.39-1.57-0.39c-0.82-0.03-1.62,0.24-2.27,0.75c-0.56,0.48-0.97,1.12-1.18,1.82l-0.07,0.27l-1.6,6.11h-3.42 l3.1-11.7h3.37l-0.44,1.72c0.42-0.58,0.96-1.05,1.57-1.4c0.68-0.39,1.44-0.59,2.22-0.59C80.51,9.48,80.83,9.52,81.13,9.63 L81.13,9.63z M68.5,10.19c0.76,0.48,1.31,1.24,1.52,2.12c0.25,1.06,0.21,2.18-0.11,3.22c-0.3,1.18-0.83,2.28-1.58,3.22 c-0.71,0.91-1.61,1.63-2.64,2.12c-1.05,0.49-2.19,0.74-3.35,0.73c-1.22,0-2.22-0.24-3-0.73c-0.77-0.48-1.32-1.24-1.54-2.12 c-0.24-1.06-0.2-2.18,0.11-3.22c0.3-1.17,0.83-2.27,1.58-3.22c0.71-0.9,1.62-1.63,2.66-2.12c1.06-0.49,2.22-0.75,3.39-0.73 C66.57,9.41,67.6,9.67,68.5,10.19L68.5,10.19z M64.84,12.1c-0.81-0.01-1.59,0.3-2.18,0.86c-0.61,0.58-1.07,1.43-1.36,2.57 c-0.6,2.29-0.02,3.43,1.74,3.43c0.8,0.02,1.57-0.29,2.15-0.85c0.6-0.57,1.04-1.43,1.34-2.58c0.3-1.13,0.31-1.98,0.01-2.57 C66.25,12.37,65.68,12.1,64.84,12.1L64.84,12.1z M57.89,9.76l-0.6,2.32l-7.55,6.67h6.06l-0.72,2.73H45.05l0.63-2.41l7.43-6.57 h-5.65l0.72-2.73H57.89L57.89,9.76z M40.96,9.99c0.46,0.29,0.82,0.72,1.02,1.23l0.07,0.19l0.44-1.66h3.37l-3.07,11.7h-3.37 l0.45-1.73c-0.51,0.6-1.14,1.08-1.85,1.41s-1.48,0.5-2.27,0.5c-0.88,0.04-1.74-0.22-2.45-0.74c-0.66-0.52-1.1-1.28-1.24-2.11 c-0.18-1.06-0.12-2.14,0.19-3.17c0.29-1.15,0.8-2.24,1.49-3.21c0.63-0.89,1.44-1.64,2.37-2.18c0.86-0.5,1.84-0.76,2.83-0.76 C39.66,9.44,40.36,9.62,40.96,9.99L40.96,9.99z M39.23,12.14c-0.41,0-0.81,0.08-1.19,0.24c-0.38,0.16-0.72,0.39-1.01,0.68 c-0.68,0.71-1.15,1.59-1.36,2.55c-0.28,1.08-0.27,1.9,0.04,2.49c0.31,0.59,0.89,0.87,1.75,0.87c0.4,0.01,0.8-0.07,1.18-0.22 c0.37-0.15,0.72-0.38,1-0.66c0.59-0.62,1.03-1.38,1.26-2.22l0.08-0.31c0.29-1.11,0.26-1.94-0.03-2.53 C40.64,12.44,40.06,12.14,39.23,12.14L39.23,12.14z M26.85,7.81h-3.21l-1.13,4.28h3.21c1.01,0,1.81-0.17,2.35-0.52 c0.57-0.37,0.98-0.95,1.13-1.63c0.2-0.72,0.11-1.27-0.27-1.62C28.55,7.99,27.86,7.81,26.85,7.81L26.85,7.81z" /><polygon className="st0" points="18.4,0 12.76,21.47 8.89,21.47 12.7,6.93 6.86,10.78 7.9,6.95 18.4,0" /></g></svg>
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            {paymentMethod ? (
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-16 bg-[#111] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-2xl font-medium text-[16px] shadow-lg transition-transform active:scale-95 flex items-center justify-center mb-6 group"
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>
                    Checkout with {paymentMethod === "stripe" ? "Stripe" : "Razorpay"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            ) : (
              <Button disabled className="w-full h-16 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 rounded-2xl font-medium text-[16px] mb-6 flex items-center justify-center cursor-not-allowed">
                Select a payment method
              </Button>
            )}

            {/* Coupon Section */}
            {/* <div className="mb-8">
              <label className="text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-3 block">
                Promotions
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter Coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] focus-visible:ring-[#7956ED]"
                  />
                </div>
                <Button
                  onClick={handleApplyCoupon}
                  disabled={!coupon.trim() || isApplying}
                  variant="outline"
                  className="h-12 px-6 rounded-xl border-gray-200 dark:border-zinc-800 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  {isApplying ? '...' : 'Apply'}
                </Button>
              </div>
            </div> */}

            {/* Security Assurances */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <p className="text-[13px] text-gray-500 font-medium">30-Day Money-Back Guarantee</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <p className="text-[13px] text-gray-500 font-medium">Secure Payment Processing</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
