import React from "react";


export interface ColumnProps {
    children: string;
    mainAxisAlignment: string;
    crossAxisAlignment: string;
}

export const Column = ({ children, mainAxisAlignment, crossAxisAlignment }: ColumnProps) => {
    const getFlexAlign = (alignment: string) => {
        switch (alignment) {
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            case 'center':
                return 'center';
            case 'spaceBetween':
                return 'space-between';
            case 'spaceEvenly':
                return 'space-evenly';
            case 'spaceAround':
                return 'space-around';
            default:
                return 'flex-start';
        }
    };

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: getFlexAlign(mainAxisAlignment),
        alignItems: getFlexAlign(crossAxisAlignment),
    }}>{children}</div>;
};