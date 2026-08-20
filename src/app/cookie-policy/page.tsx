import React from 'react';
import { Navbar } from '@/components/Landing/Navbar';
import { Footer } from '@/components/Landing/Footer';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-semibold text-center tracking-tighter mb-12 bg-gradient-to-t from-black via-white/20 to-white bg-clip-text text-transparent pb-4">
          Cookie Policy.
        </h1>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disabling Cookies</h2>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. The Cookies We Set</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Account related cookies:</strong> If you create an account with us, we will use cookies for the management of the signup process and general administration.</li>
              <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.</li>
              <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
