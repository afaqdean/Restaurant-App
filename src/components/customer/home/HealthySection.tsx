"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HealthySection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Eat Healthy, Stay Healthy
            </h2>
            
            {/* Featured Dish */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍗</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Chicken Biryani</h3>
                <p className="text-sm text-gray-600">Featured Dish</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              The Standard Chunk Of Lorem Ipsum Used Since The 1500s Is Reproduced Below For Those Interested. Sections 1.10.32 And 1.10.33 From &ldquo;De Finibus Bonorum Et Malorum&rdquo; By Cicero Are Also Reproduced In Their Exact Original Form.
            </p>

            <Link
              href="/healthy-menu"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-gray-200 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-4">👩‍🍳</div>
                  <p className="text-lg font-medium">Chef in Action</p>
                </div>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">2 days ago</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Verified</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Meet Deanna Cook, a Kids Cookbook Author</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Md. Athik Foisal UI/UX Designer</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">1 week ago</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Verified</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Amazing Food Experience</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Sarah Johnson Food Critic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



