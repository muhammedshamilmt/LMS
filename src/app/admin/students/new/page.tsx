"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Mail, Phone, MapPin, Monitor, CheckCircle2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewStudentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    platform: 'Web',
    status: 'Active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log("Submitting new student", formData);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-20 animate-in zoom-in-95 duration-500">
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl p-10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Student Added Successfully!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md">
            {formData.firstName} {formData.lastName} has been added to the system and an invitation email has been sent to {formData.email}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/admin/students">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300">
                Back to Students
              </Button>
            </Link>
            <Link href="/admin/students/1">
              <Button className="w-full sm:w-auto rounded-full px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white border-0 transition-colors">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/students">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Add New Student</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create a new student profile in the system</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
        <div className="flex items-center justify-between relative mb-12 px-2">
          <div className="absolute left-5 top-5 -translate-y-1/2 w-[95%] h-1 bg-gray-100 dark:bg-zinc-800 rounded-full z-0"></div>
          <div
            className="absolute left-0 top-5 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>

          {[1, 2, 3].map((step) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep === step
                  ? 'bg-blue-600 text-white ring-4 ring-blue-50 dark:ring-blue-900/30'
                  : currentStep > step
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 text-gray-400'
                  }`}
              >
                {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
              <span className={`absolute top-12 whitespace-nowrap mt-1 text-xs font-medium ${currentStep >= step ? 'text-gray-900 dark:text-zinc-100' : 'text-gray-400 dark:text-zinc-500'}`}>
                {step === 1 ? 'Personal Info' : step === 2 ? 'Preferences' : 'Confirm'}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="pt-4">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jenny"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" /> Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Wilson"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jenny.w@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, USA"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" /> Platform Preference
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white appearance-none"
                  >
                    <option value="Web">Web Platform</option>
                    <option value="App">Mobile App</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" /> Account Status
                  </label>
                  <div className="flex gap-4 mt-2">
                    {['Active', 'Pending', 'Inactive'].map((status) => (
                      <label key={status} className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.status === status ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 font-semibold' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {formData.firstName || 'New'} {formData.lastName || 'Student'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Review the details before confirming
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 px-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Address</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{formData.email || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone Number</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{formData.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{formData.location || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Platform</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{formData.platform}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</div>
                  <div className="inline-flex px-2 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200">
                    {formData.status}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-zinc-800">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`gap-2 rounded-full px-6 transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="gap-2 rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white border-0 transition-colors"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="gap-2 rounded-full px-8 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 border-0 transition-colors shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              <Save className="w-4 h-4" /> Confirm & Add Student
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
