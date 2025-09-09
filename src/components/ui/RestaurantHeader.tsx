import Link from 'next/link'

export default function RestaurantHeader() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link className="block" href="/" aria-label="Delicious Bites">
              <div className="relative">
                <span className="text-teal-600 font-bold text-4xl italic tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Delicious Bites
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
