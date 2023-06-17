import React, { CSSProperties, ReactNode } from 'react';

export interface StackProps {
  children: ReactNode;
  alignment?: 'topLeft' | 'center' | 'bottomRight';
  spacing?: number;
  direction?: 'horizontal' | 'vertical';
  fit?: 'loose' | 'expand';
  style?: CSSProperties;
}

export const Stack = ({
  children,
  alignment = 'topLeft',
  spacing = 0,
  direction = 'vertical',
  fit = 'loose',
  style,
}: StackProps) => {
  const getAlignmentStyles = (): CSSProperties => {
    const alignmentStyles: CSSProperties = {};
    const [horizontal, vertical] = alignment.split('');

    if (horizontal === 'center') {
      alignmentStyles.justifyContent = 'center';
    } else if (horizontal === 'end' || horizontal === 'right') {
      alignmentStyles.justifyContent = 'flex-end';
    }

    if (vertical === 'center') {
      alignmentStyles.alignItems = 'center';
    } else if (vertical === 'end' || vertical === 'bottom') {
      alignmentStyles.alignItems = 'flex-end';
    }

    return alignmentStyles;
  };

  const getSpacingStyles = (): CSSProperties => {
    const spacingStyles: CSSProperties = {};

    if (direction === 'horizontal') {
      spacingStyles.gap = `${spacing}px`;
    } else if (direction === 'vertical') {
      spacingStyles.columnGap = '0';
      spacingStyles.rowGap = `${spacing}px`;
    }

    return spacingStyles;
  };

  const getFitStyles = (): CSSProperties => {
    const fitStyles: CSSProperties = {};

    if (fit === 'expand') {
      fitStyles.width = '100%';
      fitStyles.height = '100%';
    }

    return fitStyles;
  };

  const mergedStyles: CSSProperties = {
    ...getAlignmentStyles(),
    ...getSpacingStyles(),
    ...getFitStyles(),
    ...style,
  };

  return (
    <div style={mergedStyles}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};
