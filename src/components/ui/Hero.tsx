import React, { useMemo } from 'react';
import { HeroProps } from '@/types/components';

// Pre-computed class maps for better performance
const SECTION_CLASSES = {
  restaurant: "relative",
  menu: "relative py-8 md:py-12",
  simple: "relative py-12 md:py-16"
} as const;

const CONTAINER_CLASSES = {
  restaurant: "max-w-6xl mx-auto px-4 sm:px-6",
  menu: "max-w-6xl mx-auto px-4 sm:px-6",
  simple: ""
} as const;

const CONTENT_CLASSES = {
  restaurant: "relative max-w-xl mx-auto md:max-w-none text-center md:text-left",
  menu: "text-center",
  simple: "text-center"
} as const;

const TITLE_CLASSES = {
  restaurant: "h1 text-white mb-6",
  menu: "text-5xl md:text-6xl font-bold text-gray-900 mb-6",
  simple: "text-4xl md:text-5xl font-bold text-gray-900 mb-6"
} as const;

const SUBTITLE_CLASSES = {
  restaurant: "text-lg text-slate-300 mb-8",
  menu: "text-xl text-gray-600 max-w-3xl mx-auto",
  simple: "text-xl text-gray-600 max-w-2xl mx-auto"
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
      child.props?.className?.includes('max-w-xs mx-auto sm:max-w-none')
    );
    const floatingElement = childrenArray.find(child => 
      React.isValidElement(child) && 
      child.props?.className?.includes('w-full h-[28rem]')
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
        className="absolute inset-0 rounded-bl-[100px] mb-28 md:mb-0 bg-slate-900 pointer-events-none -z-10"
        aria-hidden="true"
      />
    );
  }, [background]);

  // Memoize restaurant content
  const restaurantContent = useMemo(() => {
    if (variant !== 'restaurant') return null;

    return (
      <div className="md:w-[600px]">
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
      <div className="max-w-2xl mx-auto md:max-w-none md:absolute md:left-[550px] lg:left-[660px] xl:left-[715px] md:top-[-40%] -mb-12 md:-mt-8 md:mb-0">
        <div className="relative -ml-3 -mr-24 md:mx-0">
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
          <div className="pt-8 md:pt-12 md:pb-20">
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
