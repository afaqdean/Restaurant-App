import Link from 'next/link'

export default function MenuShowcase() {
  return (
    <section data-aos-id-2="">
      <div className="relative max-w-7xl mx-auto">

        {/* Bg */}
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:py-20">

            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

              {/* Content */}
              <div className="md:max-w-lg">

                {/* Copy */}
                <h2 className="h2 text-white mb-4" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="100">
                  Discover our signature dishes crafted with passion
                </h2>
                <p className="text-lg text-gray-400 mb-8" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="200">
                  From traditional favorites to innovative creations, our menu offers something special for every palate. Each dish tells a story of flavor, quality, and culinary artistry.
                </p>

                {/* Button */}
                <div className="max-w-xs mx-auto sm:max-w-none mb-8" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="300">
                  <div>
                    <Link className="btn-sm inline-flex items-center text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 group shadow-xs" href="/menu">
                      Explore Menu
                      <span className="tracking-normal text-emerald-100 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                        <svg className="fill-current" width={12} height={10} xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex max-w-md mx-auto md:mx-0 text-left" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="300">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full self-start shrink-0 mr-3 flex items-center justify-center">
                    <span className="text-white font-bold">⭐</span>
                  </div>
                  <div>
                    <blockquote className="text-gray-400 m-0">
                      &quot; The flavors are incredible and the presentation is simply beautiful. This is dining at its finest. &quot;
                    </blockquote>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
