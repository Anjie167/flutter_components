import React, { CSSProperties, ReactNode } from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  style?: CSSProperties;
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
  fontWeight?: string;
  fontSize?: string;
  color?: string;
  textDecoration?: string;
}

export const Text = ({
  children,
  style,
  textAlign,
  fontWeight,
  fontSize,
  color,
  textDecoration,
  ...otherProps
}: TextProps) => {
  const textStyle: CSSProperties = {
    textAlign,
    fontWeight,
    fontSize,
    color,
    textDecoration,
    ...style,
  };

  return (
    <p style={textStyle} {...otherProps}>
      {children}
    </p>
  );
};
