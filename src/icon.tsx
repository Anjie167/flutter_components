import React from 'react';

export interface IconProps {
  icon: string;
  size?: number;
  color?: string;
  semanticLabel?: string;
  semanticDescription?: string;
  onTap?: () => void;
}

export const Icon = ({
  icon,
  size = 24,
  color = 'black',
  semanticLabel,
  semanticDescription,
  onTap,
}: IconProps) => {
  const handleClick = () => {
    if (onTap) {
      onTap();
    }
  };

  return (
    <span
      className={`icon ${icon}`}
      style={{
        fontSize: `${size}px`,
        color,
      }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
      aria-label={semanticLabel}
      aria-describedby={semanticDescription}
    />
  );
};
