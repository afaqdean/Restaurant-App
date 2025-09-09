import { Carrot, Leaf, Truck, ChefHat } from 'lucide-react'

export default function RestaurantFeatures() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16 md:pb-8">
          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-12 md:grid-cols-3 md:-mx-9 md:gap-0 items-start md:max-w-none">

            {/* 1st item */}
            <div
              className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-gray-200 last:after:hidden"
              data-aos="fade-up"
            >
              <div className="mb-3 flex items-center space-x-2">
                <Carrot className="w-14 h-14 text-teal-600" />
                <Leaf className="w-14 h-14 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold mb-1">Premium Ingredients</h4>
              <p className="text-gray-500">
                We source only the finest, freshest ingredients from local farms and trusted suppliers to ensure every dish meets our high standards.
              </p>
            </div>

            {/* 2nd item */}
            <div
              className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-gray-200 last:after:hidden"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="mb-3">
                <Truck className="w-14 h-14 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold mb-1">Fast Delivery</h4>
              <p className="text-gray-500">
                Enjoy quick and reliable delivery service. Your delicious meals will arrive hot and fresh, ready to satisfy your cravings.
              </p>
            </div>

            {/* 3rd item */}
            <div
              className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-gray-200 last:after:hidden"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="mb-3">
                <ChefHat className="w-14 h-14 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold mb-1">Expert Chefs</h4>
              <p className="text-gray-500">
                Our experienced chefs craft each dish with passion and precision, bringing you authentic flavors and culinary excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
