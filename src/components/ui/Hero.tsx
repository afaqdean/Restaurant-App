import React, { useMemo } from 'react';
import { HeroProps } from '@/types/components';

// Pre-computed class maps for better performance
const SECTION_CLASSES = {
  restaurant: "relative",
  menu: "relative py-8 md:py-12",
  simple: "relative py-12 md:py-16"
} as const;

const CONTAINER_CLASSES = {
  restaurant: "w-full px-[clamp(1rem,2vw,2rem)]",
  menu: "w-full px-[clamp(1rem,2vw,2rem)]",
  simple: ""
} as const;

const CONTENT_CLASSES = {
  restaurant: "relative w-full text-center md:text-left md:grid md:grid-cols-2 md:items-center md:gap-[clamp(2rem,6vw,8rem)]",
  menu: "text-center",
  simple: "text-center"
} as const;

const TITLE_CLASSES = {
  restaurant: "text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-[clamp(1rem,2vw,1.5rem)] leading-tight",
  menu: "text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-[clamp(1rem,2vw,1.5rem)] leading-tight",
  simple: "text-[clamp(2rem,4vw,3.5rem)] font-bold text-gray-900 mb-[clamp(1rem,2vw,1.5rem)] leading-tight"
} as const;

const SUBTITLE_CLASSES = {
  restaurant: "text-[clamp(0.875rem,2vw,1.25rem)] text-slate-300 mb-[clamp(1.5rem,3vw,2.5rem)] leading-relaxed",
  menu: "text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-4xl mx-auto leading-relaxed",
  simple: "text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-3xl mx-auto leading-relaxed"
} as const;

export function Hero({
  title,
  subtitle,
  className = "",
  variant = 'simple',
  background = 'none',
  children,
  titleClassName = "",
  subtitleClassName = ""
}: HeroProps) {
  // Memoize expensive computations
  const { buttons, floatingElement } = useMemo(() => {
    if (!children || variant !== 'restaurant') {
      return { buttons: null, floatingElement: null };
    }

    const childrenArray = React.Children.toArray(children);
    const buttons = childrenArray.find(child => 
      React.isValidElement(child) && 
      child.props?.className?.includes('w-full max-w-md mx-auto')
    );
    const floatingElement = childrenArray.find(child => 
      React.isValidElement(child) && 
      child.props?.className?.includes('w-full h-[')
    );

    return { buttons, floatingElement };
  }, [children, variant]);

  // Memoize class computations
  const classes = useMemo(() => ({
    section: `${SECTION_CLASSES[variant]} ${className}`,
    container: CONTAINER_CLASSES[variant],
    content: CONTENT_CLASSES[variant],
    title: `${TITLE_CLASSES[variant]} ${titleClassName}`,
    subtitle: `${SUBTITLE_CLASSES[variant]} ${subtitleClassName}`
  }), [variant, className, titleClassName, subtitleClassName]);

  // Memoize background element
  const backgroundElement = useMemo(() => {
    if (background !== 'dark') return null;
    
    return (
      <div
        className="absolute inset-0 rounded-bl-[clamp(50px,8vw,100px)] mb-[clamp(4rem,8vw,7rem)] md:mb-0 bg-slate-900 pointer-events-none -z-10"
        aria-hidden="true"
      />
    );
  }, [background]);

  // Memoize restaurant content
  const restaurantContent = useMemo(() => {
    if (variant !== 'restaurant') return null;

    return (
      <div className="w-full md:max-w-none">
        <h1 className={classes.title} data-aos="fade-up" data-aos-delay="100">
          {title}
        </h1>
        {subtitle && (
          <p className={classes.subtitle} data-aos="fade-up" data-aos-delay="200">
            {subtitle}
          </p>
        )}
        {buttons}
      </div>
    );
  }, [variant, classes.title, classes.subtitle, title, subtitle, buttons]);

  // Memoize default content
  const defaultContent = useMemo(() => {
    if (variant === 'restaurant') return null;

    return (
      <>
        <h1 className={classes.title} data-aos="fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className={classes.subtitle} data-aos="fade-up" data-aos-delay="100">
            {subtitle}
          </p>
        )}
        {children}
      </>
    );
  }, [variant, classes.title, classes.subtitle, title, subtitle, children]);

  // Memoize floating element
  const floatingElementRender = useMemo(() => {
    if (!floatingElement || variant !== 'restaurant') return null;

    return (
      <div className="w-full md:flex-1 mt-[clamp(1rem,3vw,2rem)] md:mt-0">
        <div className="relative w-full flex justify-center md:justify-end">
          {floatingElement}
        </div>
      </div>
    );
  }, [floatingElement, variant]);

  return (
    <section className={classes.section}>
      {backgroundElement}
      
      {variant === 'restaurant' ? (
        <div className={classes.container}>
          <div className="pt-[clamp(1rem,2vw,3rem)] pb-[clamp(2rem,4vw,5rem)]">
            <div className={classes.content}>
              {restaurantContent}
              {floatingElementRender}
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.content}>
            {defaultContent}
          </div>
        </div>
      )}
    </section>
  );
}
