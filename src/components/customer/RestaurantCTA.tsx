import Link from 'next/link'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons'

export default function RestaurantCTA() {
  return (
    <section className="w-full">
      <div className="w-full px-[clamp(1rem,2vw,2rem)]">
        <div className="py-[clamp(2rem,4vw,5rem)]">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 
              className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-gray-900 mb-[clamp(1rem,2vw,1.5rem)] leading-tight" 
              data-aos="fade-up"
            >
              Ready to experience exceptional dining?
            </h2>
            <p 
              className="text-[clamp(0.875rem,2vw,1.25rem)] text-gray-600 mb-[clamp(1.5rem,3vw,2.5rem)] leading-relaxed" 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              Join thousands of satisfied customers who have discovered the perfect blend of flavor, quality, and service at Delicious Bites.
            </p>
            <div 
              className="w-full max-w-md mx-auto md:max-w-none md:flex md:justify-center space-y-[clamp(0.75rem,1.5vw,1rem)] md:space-y-0 md:space-x-[clamp(0.75rem,1.5vw,1rem)]" 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="w-full md:w-auto md:flex-1 md:max-w-xs">
                <Link href="/menu">
                  <PrimaryButton 
                    size="sm" 
                    fullWidth 
                    icon={
                      <svg className="fill-current w-[clamp(0.75rem,1.2vw,1rem)] h-[clamp(0.625rem,1vw,0.875rem)]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                      </svg>
                    }
                    className="shadow-xs text-[clamp(0.75rem,1.2vw,0.875rem)] py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(1rem,2vw,1.5rem)]"
                  >
                    Start Ordering
                  </PrimaryButton>
                </Link>
              </div>
              <div className="w-full md:w-auto md:flex-1 md:max-w-xs">
                <Link href="/cart">
                  <SecondaryButton 
                    size="sm" 
                    variant="ghost" 
                    fullWidth 
                    className="shadow-xs text-[clamp(0.75rem,1.2vw,0.875rem)] py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(1rem,2vw,1.5rem)]"
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
