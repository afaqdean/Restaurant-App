"use client";

import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-red-500">Eat healthy, Stay Healthy</span>
                <br />
                <span className="text-gray-900">
                  Be The <span className="text-red-500">First</span> Delivery & Easy Pick Up
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                We will deliver your food within 30 minutes in your town, if we would fail we will give the food free.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Order Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/reservations"
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Book a Table
              </Link>
            </div>

            {/* Featured Dishes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Featured Dishes</h3>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-2xl">🍗</span>
                  </div>
                  <p className="text-sm text-gray-600">Chicken Biryani</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-2xl">🍖</span>
                  </div>
                  <p className="text-sm text-gray-600">Hundi Mutton</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-2xl">🍛</span>
                  </div>
                  <p className="text-sm text-gray-600">Kala Bhuna</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Promotional Image */}
            <div className="relative bg-gray-800 rounded-3xl p-8 overflow-hidden">
              <div className="relative h-96 flex items-center justify-center">
                {/* Floating Burger Elements */}
                <div className="relative">
                  <div className="w-32 h-32 bg-yellow-400 rounded-full mb-4 mx-auto"></div>
                  <div className="w-28 h-28 bg-green-500 rounded-full mb-4 mx-auto"></div>
                  <div className="w-24 h-24 bg-red-500 rounded-full mb-4 mx-auto"></div>
                  <div className="w-20 h-20 bg-orange-500 rounded-full mb-4 mx-auto"></div>
                  <div className="w-16 h-16 bg-yellow-600 rounded-full mx-auto"></div>
                </div>
              </div>
              
              {/* Discount Tag */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                10% Discount for 2 orders
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">We will deliver your food within 30 minutes in your town</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}