"use client";

import Link from "next/link";
import { Twitter, Linkedin, Facebook, Github } from "lucide-react";

export function ModernFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Restaurant</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Design amazing digital experiences that create more happy in the world.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-600 hover:text-red-500 text-sm transition-colors flex items-center gap-1">
                Products <span className="bg-red-500 text-white text-xs px-1 rounded">New</span>
              </Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-red-500 text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-red-500 text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/releases" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Releases</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Social</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Facebook</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">GitHub</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">AngelList</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Dribbble</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Privacy</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Cookies</Link></li>
              <li><Link href="/licenses" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Licenses</Link></li>
              <li><Link href="/settings" className="text-gray-600 hover:text-red-500 text-sm transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 Restaurant App. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



