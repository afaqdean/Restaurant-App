"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/placeholder.png",
  fallbackElement,
  className = "",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    } else if (!fallbackError) {
      // If the fallback image also fails to load
      setFallbackError(true);
    }
  };

  // Only show custom fallback element if both original and fallback images fail
  if (hasError && fallbackError && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
    />
  );
}
