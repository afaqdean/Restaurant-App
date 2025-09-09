import Link from 'next/link'

export default function RestaurantFooter() {
  return (
    <footer className="relative">
      {/* Bg */}
      <div className="absolute inset-0 bg-gray-900 -z-10" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blocks */}
        <div className="grid sm:grid-cols-12 lg:grid-cols-10 gap-8 py-8 border-t border-gray-700">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-2 lg:max-w-xs">
            {/* Logo */}
            <Link className="block" href="/" aria-label="Delicious Bites">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <span className="text-white font-bold text-xl">Delicious Bites</span>
              </div>
            </Link>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-gray-100 font-bold mb-3">Menu</h6>
            <ul className="text-sm font-[450] space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/menu">
                  Appetizers
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/menu">
                  Main Courses
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/menu">
                  Desserts
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/menu">
                  Beverages
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-gray-100 font-bold mb-3">Services</h6>
            <ul className="text-sm font-[450] space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/cart">
                  Online Ordering
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/order">
                  Delivery
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/order">
                  Pickup
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="/account">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-gray-100 font-bold mb-3">About</h6>
            <ul className="text-sm font-[450] space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-gray-100 font-bold mb-3">Connect</h6>
            <ul className="text-sm font-[450] space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Facebook
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  Twitter
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
                  TikTok
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom area */}
        <div className="pb-4 md:pb-8">
          <div className="text-xs text-gray-500">
            © 2024 Delicious Bites. All rights reserved. Experience exceptional dining with our premium restaurant service.
            For any questions or concerns, please contact us through our{' '}
            <Link className="font-medium underline hover:text-emerald-500 transition duration-150 ease-in-out" href="#0">
              customer support
            </Link>{' '}
            or visit our restaurant location.
          </div>
        </div>
      </div>
    </footer>
  )
}
