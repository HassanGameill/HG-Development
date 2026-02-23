import Image, { ImageProps, StaticImageData } from 'next/image';
import React, { FC } from 'react';

type CustomImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  lazy?: boolean;
};

const CustomImage: FC<CustomImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 768px',
  lazy = true,
  ...rest
}) => {
  if (!src) {
    console.warn('CustomImage: "src" prop is missing');
    return null;
  }

  // If priority, don't lazy load
  const loading = priority ? 'eager' : lazy ? 'lazy' : 'eager';

  // Optional: use dynamic blurDataURL for StaticImageData
  const blurDataURL =
    typeof src === 'object' && 'blurDataURL' in src ? src.blurDataURL : '/placeholder.png';

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataURL}
      sizes={sizes}
      loading={loading}
      {...rest}
    />
  );
};

export default CustomImage;
