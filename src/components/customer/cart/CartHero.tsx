interface CartHeroProps {
  title: string | React.ReactNode;
  subtitle: string;
  className?: string;
}

export function CartHero({ title, subtitle, className = "" }: CartHeroProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="text-center">
        <h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
          data-aos="fade-up"
        >
          {title}
        </h1>
        <p 
          className="text-xl text-gray-600 max-w-2xl mx-auto" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
