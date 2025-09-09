"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <div className="text-center text-amber-50">
                <div className="text-8xl mb-4">👨‍🍳</div>
                <p className="text-xl font-semibold">Chef's Special</p>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-500 rounded-full opacity-20"></div>
          </div>

          {/* Content side */}
          <div className="space-y-8">
            <div>
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-4">
                SERVE QUALITY FOOD & THING
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Immerse yourself in a culinary experience.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Savor culinary perfection—crafted with tradition, fresh ingredients, and a passion for detail. 
                The artistry of our dishes, meticulously crafted with traditional recipes and an eye for excellence. 
                Every bite tells a story of dedication, quality, and the love of great food.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                FOOD MENU
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="h-5 w-5 text-amber-500" />
                <span className="text-lg font-medium">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">500+</div>
                <div className="text-sm text-slate-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">50+</div>
                <div className="text-sm text-slate-600">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">5★</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
