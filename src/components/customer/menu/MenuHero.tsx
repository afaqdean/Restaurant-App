import { Hero } from '@/components/ui/Hero';

interface MenuHeroProps {
  className?: string;
}

export function MenuHero({ className = "" }: MenuHeroProps) {
  const title = (
    <>
      We deliver nothing but the finest{' '}
      <span className="text-emerald-600">dining experience</span>
    </>
  );

  const subtitle = "Discover our carefully crafted menu featuring premium ingredients and authentic flavors that will delight your senses.";

  return (
    <Hero
      title={title}
      subtitle={subtitle}
      variant="menu"
      className={className}
    />
  );
}
