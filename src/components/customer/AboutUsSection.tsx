import Image from 'next/image'

export default function AboutUsSection() {
  return (
    <section data-aos-id-3="">
      <div className="relative max-w-7xl mx-auto">

        {/* Bg */}
        <div className="absolute inset-0 rounded-tl-[100px] mb-24 md:mb-0 bg-gradient-to-br from-emerald-50 to-teal-50 pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:py-20">

            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

              {/* Content */}
              <div className="md:max-w-lg">

                {/* Copy */}
                <h2 className="h2 text-gray-900 mb-4" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="100">
                  Our Story of Culinary Excellence
                </h2>
                <p className="text-lg text-gray-600 mb-8" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="200">
                  Founded with a passion for exceptional dining, Delicious Bites has been serving our community 
                  with carefully crafted dishes that celebrate both tradition and innovation. Our journey began with 
                  a simple belief: every meal should be an experience worth remembering.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="300">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">10K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Signature Dishes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">4.9</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>

                {/* Values */}
                <div className="space-y-4 mb-8" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="400">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Fresh Ingredients</h4>
                      <p className="text-sm text-gray-600">We source only the finest, locally-sourced ingredients for every dish.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Expert Craftsmanship</h4>
                      <p className="text-sm text-gray-600">Our chefs bring years of experience and passion to every creation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Community Focus</h4>
                      <p className="text-sm text-gray-600">We&apos;re proud to be part of our local community and support local suppliers.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Image */}
              <div className="md:absolute md:left-[536px] md:top-[-20%] -mb-12 mt-8 md:mt-36 md:mb-0" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="600">
                <div className="relative -mx-16 md:mx-0">
                  <div className="w-[150%] h-[150%] flex items-center justify-center mx-auto">
                    <Image
                      src="/images/culinary_experience.svg"
                      alt="Culinary Experience"
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
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
