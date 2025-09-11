import Link from 'next/link'

export default function RestaurantFooter() {
  return (
    <footer className="relative w-full">
      {/* Bg */}
      <div className="absolute inset-0 bg-gray-900 -z-10" aria-hidden="true" />

      <div className="w-full px-[clamp(1rem,2vw,2rem)]">
        {/* Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[clamp(1rem,2vw,2rem)] py-[clamp(1.5rem,3vw,2rem)] border-t border-gray-700">
          {/* 1st block */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link className="block" href="/" aria-label="Delicious Bites">
              <div className="flex items-center space-x-[clamp(0.5rem,1vw,0.75rem)]">
                <div className="w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-[clamp(1rem,1.5vw,1.25rem)]">🍽️</span>
                </div>
                <span className="text-white font-bold text-[clamp(1rem,2vw,1.25rem)]">Delicious Bites</span>
              </div>
            </Link>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h6 className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-100 font-bold mb-[clamp(0.5rem,1vw,0.75rem)]">Menu</h6>
            <ul className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-[450] space-y-[clamp(0.25rem,0.5vw,0.5rem)]">
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
          <div className="sm:col-span-1 lg:col-span-1">
            <h6 className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-100 font-bold mb-[clamp(0.5rem,1vw,0.75rem)]">Services</h6>
            <ul className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-[450] space-y-[clamp(0.25rem,0.5vw,0.5rem)]">
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
          <div className="sm:col-span-1 lg:col-span-1">
            <h6 className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-100 font-bold mb-[clamp(0.5rem,1vw,0.75rem)]">About</h6>
            <ul className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-[450] space-y-[clamp(0.25rem,0.5vw,0.5rem)]">
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
          <div className="sm:col-span-1 lg:col-span-1">
            <h6 className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-100 font-bold mb-[clamp(0.5rem,1vw,0.75rem)]">Connect</h6>
            <ul className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-[450] space-y-[clamp(0.25rem,0.5vw,0.5rem)]">
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
        <div className="pb-[clamp(1rem,2vw,2rem)]">
          <div className="text-[clamp(0.625rem,1vw,0.75rem)] text-gray-500 leading-relaxed">
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
