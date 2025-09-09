"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-slate-900 text-amber-50">
      {/* Main footer content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold text-amber-50 mb-6">
                Timeless recipes to savor & enjoy
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Experience culinary excellence with our carefully crafted dishes, 
                made with the finest ingredients and traditional techniques passed down through generations.
              </p>
              
              {/* Contact info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-100">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <span>123 Main Street, City, State 12345</span>
                </div>
                <div className="flex items-center gap-3 text-slate-100">
                  <Mail className="h-5 w-5 text-amber-500" />
                  <span>info@restaurant.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-100">
                  <Phone className="h-5 w-5 text-amber-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xl font-semibold text-amber-50 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/menu" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-slate-400 hover:text-amber-500 transition-colors">
                    My Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account links */}
            <div>
              <h4 className="text-xl font-semibold text-amber-50 mb-6">Account</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/auth/signin" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-slate-400 hover:text-amber-500 transition-colors">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2024 Restaurant App. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-slate-400 hover:text-amber-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-amber-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/careers" className="text-slate-400 hover:text-amber-500 text-sm transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
