"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for individuals looking to access premium courses.",
    features: [
      "Access to all standard courses",
      "Community forum access",
      "Basic progress tracking",
      "Email support",
    ],
    highlighted: false,
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    price: "$99",
    period: "/mo",
    description: "Ideal for creators and sales pros needing AI tools.",
    features: [
      "Everything in Starter",
      "AI Sales Automation tools",
      "CRM Integrations",
      "Advanced Deal Tracking",
      "Priority 24/7 support",
      "1-on-1 coaching sessions",
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams and organizations requiring custom solutions.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom API access",
      "Dedicated account manager",
      "White-labeled platform",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
  }
];

export function Pricing() {
  return (
    <section className="w-full px-6 py-32 relative flex flex-col items-center z-40">
       <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium text-gray-300">Simple Pricing</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6"
            >
              Invest in your growth
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl"
            >
              Choose the plan that best fits your needs. Scale your skills and your sales with HG HEALING.
            </motion.p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
             {plans.map((plan, idx) => (
                <motion.div 
                  key={plan.name}
                  className={`w-full relative rounded-[36px] p-[1px] ${
                    plan.highlighted 
                      ? "bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent shadow-[0_20px_50px_rgba(59,130,246,0.2)] md:-translate-y-4" 
                      : "bg-white/[0.08]"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                >
                   <div className={`w-full h-full rounded-[35px] flex flex-col p-8 lg:p-10 ${
                     plan.highlighted ? "bg-[#050505]/90 backdrop-blur-xl" : "bg-[#080808]"
                   }`}>
                      
                      {plan.highlighted && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                      
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                        {plan.period && <span className="text-gray-400 font-medium">{plan.period}</span>}
                      </div>

                      <button className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300 mb-8 ${
                        plan.highlighted 
                          ? "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      }`}>
                        {plan.buttonText}
                      </button>

                      <div className="w-full h-[1px] bg-white/[0.06] mb-8" />

                      <ul className="flex flex-col gap-4">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
