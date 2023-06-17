import React from 'react';

export interface ImageProps {
  src: string;
  width?: string;
  height?: string;
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  alignment?: string;
  borderRadius?: number;
  onTap?: () => void;
}

export const Image = ({ src, width, height, fit, alignment, borderRadius, onTap }: ImageProps) => {
  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
    objectFit: fit || 'cover',
    objectPosition: alignment || 'center',
    borderRadius: borderRadius || 0,
  };

  return (
    <img src={src} style={imageStyle} onClick={onTap} alt="custom" />
  );
};
