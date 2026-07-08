"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Settings as SettingsIcon,
  Upload,
  Mail,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  History,
  Download,
  Zap,
  Layout
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigationStyle } from "@/contexts/NavigationContext";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { navStyle, setNavStyle } = useNavigationStyle();

  // State for toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    newSales: true,
    weeklySummary: true,
    marketing: false
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <SettingsIcon className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "billing", label: "Billing & Payment", icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col gap-8 mx-auto w-full max-w-6xl text-gray-900 dark:text-gray-100 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings, preferences, and security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-2 bg-white dark:bg-zinc-900 p-4 rounded-[20px] border border-gray-100 dark:border-zinc-800 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-[15px] ${activeTab === tab.id
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-zinc-900 rounded-[24px] border border-gray-100 dark:border-zinc-800 p-6 sm:p-8 shadow-sm min-h-[600px]">

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Profile Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your photo and personal details here.</p>
              </div>

              <div className="flex flex-col-reverse lg:flex-row gap-8 items-start border-b border-gray-100 dark:border-zinc-800 pb-8">
                <div className="flex-1 w-full space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                      <input type="text" defaultValue="Sajibur" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                      <input type="text" defaultValue="Rahman" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Public Email</label>
                    <input type="email" defaultValue="hello@sajibur.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea rows={4} defaultValue="Platform Admin and Course Creator." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                  </div>
                </div>

                <div className="w-full lg:w-48 shrink-0 flex flex-col items-center gap-4 pt-2">
                  <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-zinc-900 shadow-xl transition-transform group-hover:scale-105">
                      <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                      <AvatarFallback className="text-3xl">SR</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">Profile Photo</div>
                    <div className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm">Save Changes</button>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Account Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your connected accounts and primary email.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">Primary Email Address</div>
                      <div className="text-sm text-gray-500 mt-0.5">hello@sajibur.com</div>
                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800/50">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Account
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2.5 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm w-full sm:w-auto">
                    Change Email
                  </button>
                </div>

                {/* Navigation Style Toggle */}
                <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl shrink-0">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">Navigation Style</div>
                      <div className="text-sm text-gray-500 mt-0.5">Choose between a traditional top menu bar or a Mac-style dock.</div>
                    </div>
                  </div>
                  <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => setNavStyle('topbar')}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${navStyle === 'topbar' ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      Top Bar
                    </button>
                    <button
                      onClick={() => setNavStyle('dock')}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${navStyle === 'dock' ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      Dock
                    </button>
                  </div>
                </div>

                <div className="p-6 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </div>
                    <div className="text-sm text-red-500/80 mt-1.5 max-w-md leading-relaxed">
                      Permanently delete your account and all of your data. This action is irreversible and requires confirmation.
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors w-full sm:w-auto">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Security</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Keep your account secure with strong passwords and 2FA.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-5 max-w-lg">
                  <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-zinc-800 pb-3">Change Password</h3>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-medium transition-colors shadow-md mt-2">
                    Update Password
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 max-w-3xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                    <div>
                      <h3 className="font-semibold text-lg">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {twoFactorEnabled ? (
                    <div className="p-5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full shrink-0">
                        <Smartphone className="w-5 h-5 text-green-700 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-green-800 dark:text-green-300">Two-factor authentication is active</div>
                        <div className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
                          Your account is protected by an authenticator app.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-gray-200 dark:bg-zinc-700 rounded-full shrink-0">
                        <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">Two-factor authentication is disabled</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">
                          Protect your account by enabling 2FA.
                        </div>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Set up 2FA now &rarr;</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Notifications</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose what you want to be notified about via email.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center p-5 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-gray-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">New Course Sales</div>
                      <div className="text-sm text-gray-500 mt-0.5">Get notified instantly when a student purchases a course.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.newSales}
                        onChange={() => setNotifications({ ...notifications, newSales: !notifications.newSales })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center p-5 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-gray-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">Weekly Summary</div>
                      <div className="text-sm text-gray-500 mt-0.5">Receive a digest of platform activity every Monday.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.weeklySummary}
                        onChange={() => setNotifications({ ...notifications, weeklySummary: !notifications.weeklySummary })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center p-5 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-gray-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">Marketing & Updates</div>
                      <div className="text-sm text-gray-500 mt-0.5">Platform news, feature updates, and special offers.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.marketing}
                        onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-1">Billing & Payment</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription and view billing history.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plan Card */}
                <div className="p-8 border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-zinc-900 rounded-[24px] relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider">PRO PLAN</div>
                  
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  
                  <div className="font-bold text-xl text-gray-900 dark:text-white mb-2">Platform Pro</div>
                  <div className="text-4xl font-extrabold mb-6">$49<span className="text-lg text-gray-500 font-medium">/mo</span></div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Unlimited Courses & Students
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Advanced Analytics
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> 0% Transaction Fees
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                    Manage Subscription
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Payment Method */}
                  <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                      <div className="w-14 h-9 bg-[#1a1f36] rounded flex items-center justify-center font-bold text-sm text-white italic tracking-wider">
                        VISA
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-gray-900 dark:text-gray-100">Visa ending in 4242</div>
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">Expires 12/26</div>
                      </div>
                    </div>
                    <button className="w-full py-2.5 mt-5 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl font-semibold transition-colors text-sm text-gray-700 dark:text-gray-300">
                      Update Payment Method
                    </button>
                  </div>

                  {/* Billing History preview */}
                  <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Billing History</h3>
                      <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <History className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">Aug 1, 2023</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm">$49.00</span>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"><Download className="w-4 h-4 text-gray-500" /></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <History className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">Jul 1, 2023</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="font-bold text-sm">$49.00</span>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"><Download className="w-4 h-4 text-gray-500" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

