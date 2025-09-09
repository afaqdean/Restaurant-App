interface MenuHeroProps {
  className?: string;
}

export function MenuHero({ className = "" }: MenuHeroProps) {
  return (
    <section className={`relative py-8 md:py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" 
            data-aos="fade-up"
          >
            We deliver nothing but the finest{' '}
            <span className="text-emerald-600">dining experience</span>
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            Discover our carefully crafted menu featuring premium ingredients and authentic flavors that will delight your senses.
          </p>
        </div>
      </div>
    </section>
  );
}
