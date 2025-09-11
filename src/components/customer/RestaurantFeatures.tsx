import { Carrot, Leaf, Truck, ChefHat } from 'lucide-react'

export default function RestaurantFeatures() {
  return (
    <section className="w-full">
      <div className="2xl:max-w-8xl 3xl:max-w-10xl 4xl:max-w-16xl 5xl:max-w-20xl 6xl:max-w-25xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-8 5xl:px-12 6xl:px-16">
        <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32 4xl:py-36 5xl:py-40 6xl:py-48">
          {/* Items */}
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 3xl:gap-28 4xl:gap-32 5xl:gap-36 6xl:gap-44 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-3 5xl:grid-cols-3 6xl:grid-cols-3">
            
            {/* 1st item */}
            <div
              className="relative group text-center md:text-left"
              data-aos="fade-up"
            >
              {/* Divider line for desktop */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 lg:h-20 xl:h-24 2xl:h-28 3xl:h-32 4xl:h-36 5xl:h-40 6xl:h-48 bg-gradient-to-b from-transparent via-gray-200 to-transparent last:hidden" />
              
              <div className="flex flex-col items-center md:items-start space-y-4 sm:space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12 5xl:space-y-14 6xl:space-y-16">
                {/* Icon container */}
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 2xl:space-x-4 3xl:space-x-5 4xl:space-x-6 5xl:space-x-8 6xl:space-x-10">
                  <div className="p-2 sm:p-3 2xl:p-4 3xl:p-5 4xl:p-6 5xl:p-8 6xl:p-10 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                    <Carrot className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-18 3xl:h-18 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 6xl:w-28 6xl:h-28 text-teal-600" />
                  </div>
                  <div className="p-2 sm:p-3 2xl:p-4 3xl:p-5 4xl:p-6 5xl:p-8 6xl:p-10 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                    <Leaf className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-18 3xl:h-18 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 6xl:w-28 6xl:h-28 text-teal-600" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-8 6xl:space-y-10">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    Premium Ingredients
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl text-gray-600 leading-relaxed max-w-sm 2xl:max-w-md 3xl:max-w-lg 4xl:max-w-xl 5xl:max-w-2xl 6xl:max-w-3xl mx-auto md:mx-0">
                    We source only the finest, freshest ingredients from local farms and trusted suppliers to ensure every dish meets our high standards.
                  </p>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div
              className="relative group text-center md:text-left"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Divider line for desktop */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 lg:h-20 xl:h-24 2xl:h-28 3xl:h-32 4xl:h-36 5xl:h-40 6xl:h-48 bg-gradient-to-b from-transparent via-gray-200 to-transparent last:hidden" />
              
              <div className="flex flex-col items-center md:items-start space-y-4 sm:space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12 5xl:space-y-14 6xl:space-y-16">
                {/* Icon container */}
                <div className="flex items-center justify-center">
                  <div className="p-2 sm:p-3 2xl:p-4 3xl:p-5 4xl:p-6 5xl:p-8 6xl:p-10 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                    <Truck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-18 3xl:h-18 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 6xl:w-28 6xl:h-28 text-teal-600" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-8 6xl:space-y-10">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    Fast Delivery
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl text-gray-600 leading-relaxed max-w-sm 2xl:max-w-md 3xl:max-w-lg 4xl:max-w-xl 5xl:max-w-2xl 6xl:max-w-3xl mx-auto md:mx-0">
                    Enjoy quick and reliable delivery service. Your delicious meals will arrive hot and fresh, ready to satisfy your cravings.
                  </p>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div
              className="relative group text-center md:text-left"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex flex-col items-center md:items-start space-y-4 sm:space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12 5xl:space-y-14 6xl:space-y-16">
                {/* Icon container */}
                <div className="flex items-center justify-center">
                  <div className="p-2 sm:p-3 2xl:p-4 3xl:p-5 4xl:p-6 5xl:p-8 6xl:p-10 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                    <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-18 3xl:h-18 4xl:w-20 4xl:h-20 5xl:w-24 5xl:h-24 6xl:w-28 6xl:h-28 text-teal-600" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-8 6xl:space-y-10">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                    Expert Chefs
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl text-gray-600 leading-relaxed max-w-sm 2xl:max-w-md 3xl:max-w-lg 4xl:max-w-xl 5xl:max-w-2xl 6xl:max-w-3xl mx-auto md:mx-0">
                    Our experienced chefs craft each dish with passion and precision, bringing you authentic flavors and culinary excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
