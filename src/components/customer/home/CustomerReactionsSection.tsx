"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";

export function CustomerReactionsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Customers Reaction
            <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Customer Image */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block">
              <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto lg:mx-0 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-4">👨‍💼</div>
                  <p className="text-lg font-medium">Happy Customer</p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Verified Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Verified Purchase</span>
                <span className="text-sm text-gray-500">23 Nov 2021</span>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-6">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">AF</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Md. Athik Foisal</h4>
                    <p className="text-sm text-gray-600">UI/UX Designer</p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4">
              <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-3 bg-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



