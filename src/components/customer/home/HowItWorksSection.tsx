"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: "🍗",
      title: "Choose your Meals",
      description: "We will deliver your food within 30 minutes in your town, if we would",
      color: "bg-red-500"
    },
    {
      icon: "📦",
      title: "Track Your Order",
      description: "We will deliver your food within 30 minutes in your town, if we would",
      color: "bg-blue-500"
    },
    {
      icon: "🛍️",
      title: "Collect Your Order",
      description: "We will deliver your food within 30 minutes in your town, if we would",
      color: "bg-green-500"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How does it Works
            <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon Circle */}
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">{step.icon}</span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 font-medium text-sm transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



