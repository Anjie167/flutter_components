import React, { CSSProperties } from 'react';

export interface RowProps {
  children: React.ReactNode;
  mainAxisAlignment: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround';
  crossAxisAlignment: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  mainAxisSize: 'min' | 'max';
  verticalDirection: 'up' | 'down';
  textDirection: 'ltr' | 'rtl';
  verticalAlignment: 'fill' | 'auto';
  style?: CSSProperties; // Added style prop with CSSProperties type
}

export const Row = ({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  mainAxisSize,
  verticalDirection,
  textDirection,
  verticalAlignment,
  style, // Destructure the style prop
}: RowProps) => {
  const rowStyles: CSSProperties = {
    display: 'flex',
    flexDirection: verticalDirection === 'down' ? 'column' : 'row',
    justifyContent:
      mainAxisAlignment === 'start'
        ? 'flex-start'
        : mainAxisAlignment === 'end'
        ? 'flex-end'
        : mainAxisAlignment === 'center'
        ? 'center'
        : mainAxisAlignment === 'spaceBetween'
        ? 'space-between'
        : mainAxisAlignment === 'spaceAround'
        ? 'space-around'
        : 'flex-start',
    alignItems:
      crossAxisAlignment === 'start'
        ? 'flex-start'
        : crossAxisAlignment === 'end'
        ? 'flex-end'
        : crossAxisAlignment === 'center'
        ? 'center'
        : crossAxisAlignment === 'stretch'
        ? 'stretch'
        : crossAxisAlignment === 'baseline'
        ? 'baseline'
        : 'stretch',
    width: mainAxisSize === 'min' ? 'fit-content' : '100%',
    height: verticalAlignment === 'fill' ? '100%' : 'auto',
    textAlign: textDirection === 'rtl' ? 'right' : 'left',
    ...style, // Merge the style prop with the component's styles
  };

  return <div style={rowStyles}>{children}</div>;
};
