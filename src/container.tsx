import React from 'react';

export interface ContainerProps{
    child : React.ReactNode;
    width : string;
    height : string;
    color : string;
    padding : string;
    margin : string;
    alignment : string;
    borderRadius : string;
    boxShadow : string;
}

export const Container = ({
    child,
    width,
    height,
    color,
    padding,
    margin,
    alignment,
    borderRadius,
    boxShadow,
} : ContainerProps) => {
    const containerStyle = {
        width: width || '100%',
        height: height || '100%',
        backgroundColor: color || 'transparent',
        padding: padding || 0,
        margin: margin || 0,
        display: 'flex',
        justifyContent: alignment || 'flex-start',
        alignItems: alignment || 'flex-start',
        borderRadius: borderRadius || 0,
        boxShadow: boxShadow || 'none',
    };

    return <div style={containerStyle}>{child}</div>;
};