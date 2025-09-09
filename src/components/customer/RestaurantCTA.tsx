import Link from 'next/link'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons'

export default function RestaurantCTA() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 text-gray-900 mb-4" data-aos="fade-up">
              Ready to experience exceptional dining?
            </h2>
            <p className="text-lg text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">
              Join thousands of satisfied customers who have discovered the perfect blend of flavor, quality, and service at Delicious Bites.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="200">
              <div>
                <Link href="/menu">
                  <PrimaryButton 
                    size="sm" 
                    fullWidth 
                    icon={
                      <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                      </svg>
                    }
                    className="shadow-xs"
                  >
                    Start Ordering
                  </PrimaryButton>
                </Link>
              </div>
              <div>
                <Link href="/cart">
                  <SecondaryButton 
                    size="sm" 
                    variant="ghost" 
                    fullWidth 
                    className="shadow-xs"
                  >
                    View Cart
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
