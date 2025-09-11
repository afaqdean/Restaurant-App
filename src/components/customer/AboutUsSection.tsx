import Image from 'next/image'

export default function AboutUsSection() {
  return (
    <section data-aos-id-3="" className="w-full">
      <div className="relative w-full">

        {/* Bg */}
        <div className="absolute inset-0 rounded-tl-[clamp(50px,8vw,100px)] mb-[clamp(2rem,6vw,6rem)] lg:mb-0 bg-gradient-to-br from-emerald-50 to-teal-50 pointer-events-none -z-10" aria-hidden="true" />

        <div className="w-full px-[clamp(1rem,2vw,2rem)]">
          <div className="pt-[clamp(2rem,4vw,5rem)] pb-[clamp(2rem,4vw,5rem)]">

            {/* Section content */}
            <div className="relative w-full text-center md:text-left md:grid md:grid-cols-2 md:items-center md:gap-[clamp(2rem,6vw,8rem)]">

              {/* Content */}
              <div className="w-full md:max-w-none">

                {/* Copy */}
                <h2 
                  className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-gray-900 mb-[clamp(1rem,2vw,1.5rem)] leading-tight" 
                  data-aos="fade-up" 
                  data-aos-anchor="[data-aos-id-3]" 
                  data-aos-delay="100"
                >
                  Our Story of Culinary Excellence
                </h2>
                <p 
                  className="text-[clamp(0.875rem,2vw,1.25rem)] text-gray-600 mb-[clamp(1.5rem,3vw,2.5rem)] leading-relaxed" 
                  data-aos="fade-up" 
                  data-aos-anchor="[data-aos-id-3]" 
                  data-aos-delay="200"
                >
                  Founded with a passion for exceptional dining, Delicious Bites has been serving our community 
                  with carefully crafted dishes that celebrate both tradition and innovation. Our journey began with 
                  a simple belief: every meal should be an experience worth remembering.
                </p>

                {/* Stats */}
                <div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(1.5rem,3vw,2.5rem)]" 
                  data-aos="fade-up" 
                  data-aos-anchor="[data-aos-id-3]" 
                  data-aos-delay="300"
                >
                  <div className="text-center p-[clamp(0.5rem,1.5vw,1rem)]">
                    <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-600 mb-1">5+</div>
                    <div className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-[clamp(0.5rem,1.5vw,1rem)]">
                    <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-600 mb-1">10K+</div>
                    <div className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center p-[clamp(0.5rem,1.5vw,1rem)]">
                    <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-600 mb-1">50+</div>
                    <div className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600">Signature Dishes</div>
                  </div>
                  <div className="text-center p-[clamp(0.5rem,1.5vw,1rem)]">
                    <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-600 mb-1">4.9</div>
                    <div className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600">Average Rating</div>
                  </div>
                </div>

                {/* Values */}
                <div 
                  className="space-y-[clamp(1rem,2vw,1.5rem)] mb-[clamp(1.5rem,3vw,2.5rem)]" 
                  data-aos="fade-up" 
                  data-aos-anchor="[data-aos-id-3]" 
                  data-aos-delay="400"
                >
                  <div className="flex items-start space-x-[clamp(0.75rem,2vw,1rem)]">
                    <div className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[clamp(0.625rem,1.2vw,0.875rem)]">✓</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-[clamp(0.875rem,1.8vw,1.125rem)]">Fresh Ingredients</h4>
                      <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600 leading-relaxed">We source only the finest, locally-sourced ingredients for every dish.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-[clamp(0.75rem,2vw,1rem)]">
                    <div className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[clamp(0.625rem,1.2vw,0.875rem)]">✓</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-[clamp(0.875rem,1.8vw,1.125rem)]">Expert Craftsmanship</h4>
                      <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600 leading-relaxed">Our chefs bring years of experience and passion to every creation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-[clamp(0.75rem,2vw,1rem)]">
                    <div className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[clamp(0.625rem,1.2vw,0.875rem)]">✓</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-[clamp(0.875rem,1.8vw,1.125rem)]">Community Focus</h4>
                      <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-gray-600 leading-relaxed">We&apos;re proud to be part of our local community and support local suppliers.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Image */}
              <div 
                className="w-full md:flex-1 mt-[clamp(1rem,3vw,2rem)] md:mt-0" 
                data-aos="fade-up" 
                data-aos-anchor="[data-aos-id-3]" 
                data-aos-delay="600"
              >
                <div className="relative w-full h-[clamp(200px,40vw,500px)] md:h-[clamp(300px,50vh,600px)] flex items-center justify-center">
                  <Image
                    src="/images/culinary_experience.svg"
                    alt="Culinary Experience"
                    width={512}
                    height={512}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
