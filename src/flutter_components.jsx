import React from "react";


const NullWidget = () => { };


//Container
//Column, Row, Stack,
//Image, Text, Icon
//GridViewBuilder, ListviewBuilder

//import * as MyMaterial from "{path}";


export const Column = ({ children, mainAxisAlignment, crossAxisAlignment }) => {
    const getFlexAlign = (alignment) => {
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

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: getFlexAlign(mainAxisAlignment),
        alignItems: getFlexAlign(crossAxisAlignment),
    };

    return <div style={columnStyle}>{children}</div>;
};

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
}) => {
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

export class GridViewBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCount: props.itemCount || 0,
            itemBuilder: props.itemBuilder || (() => null),
            gridDelegate: props.gridDelegate || GridViewBuilder.defaultGridDelegate,
        };
    }

    static defaultGridDelegate(itemCount) {
        return {
            crossAxisCount: 2,
            mainAxisSpacing: 4,
            crossAxisSpacing: 4,
            childAspectRatio: 1,
        };
    }

    render() {
        const { itemCount, itemBuilder, gridDelegate } = this.state;
        const { crossAxisCount, mainAxisSpacing, crossAxisSpacing, childAspectRatio } = gridDelegate;

        const totalCrossAxisSpacing = (crossAxisCount - 1) * crossAxisSpacing;
        const availableWidth = this.props.width - totalCrossAxisSpacing;
        const itemWidth = availableWidth / crossAxisCount;

        const children = [];
        for (let i = 0; i < itemCount; i++) {
            children.push(
                <div
                    key={i}
                    style={{
                        width: itemWidth,
                        height: itemWidth * childAspectRatio,
                        margin: `${mainAxisSpacing / 2}px ${crossAxisSpacing / 2}px`,
                    }}
                >
                    {itemBuilder(i)}
                </div>
            );
        }

        return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{children}</div>;
    }
}

export const Image = ({ src, width, height, fit, alignment, borderRadius, onTap }) => {
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

export class ListViewBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCount: props.itemCount,
        };
    }

    render() {
        const { itemCount } = this.state;
        const { itemBuilder, itemExtent, padding, reverse, scrollDirection } = this.props;
        const items = [];

        for (let index = 0; index < itemCount; index++) {
            const item = itemBuilder(index);
            items.push(
                <div key={index} style={{ height: itemExtent }}>
                    {item}
                </div>
            );
        }

        if (reverse) {
            items.reverse();
        }

        const containerStyle = {
            height: `calc(100% - ${padding * 2}px)`,
            padding: `${padding}px`,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: scrollDirection === 'horizontal' ? 'row' : 'column',
        };

        return <div style={containerStyle}>{items}</div>;
    }
}

export const Row = ({ children, mainAxisAlignment, crossAxisAlignment, mainAxisSize, verticalDirection, textDirection, verticalAlignment }) => {
    const rowStyles = {
        display: 'flex',
        flexDirection: verticalDirection === 'down' ? 'column' : 'row',
        justifyContent: mainAxisAlignment === 'start' ? 'flex-start' :
            mainAxisAlignment === 'end' ? 'flex-end' :
                mainAxisAlignment === 'center' ? 'center' :
                    mainAxisAlignment === 'spaceBetween' ? 'space-between' :
                        mainAxisAlignment === 'spaceAround' ? 'space-around' : 'flex-start',
        alignItems: crossAxisAlignment === 'start' ? 'flex-start' :
            crossAxisAlignment === 'end' ? 'flex-end' :
                crossAxisAlignment === 'center' ? 'center' :
                    crossAxisAlignment === 'stretch' ? 'stretch' :
                        crossAxisAlignment === 'baseline' ? 'baseline' : 'stretch',
        width: mainAxisSize === 'min' ? 'fit-content' : '100%',
        height: verticalAlignment === 'fill' ? '100%' : 'auto',
        textAlign: textDirection === 'rtl' ? 'right' : 'left'
    };

    return (
        <div style={rowStyles}>
            {children}
        </div>
    );
};

export const Stack = ({ children, alignment = 'topLeft', spacing = 0, direction = 'vertical', fit = 'loose', style }) => {
    // Apply alignment styles based on the alignment prop
    const getAlignmentStyles = () => {
        const alignmentStyles = {};
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

    // Apply spacing styles based on the spacing prop and direction prop
    const getSpacingStyles = () => {
        const spacingStyles = {};

        if (direction === 'horizontal') {
            spacingStyles.gap = `${spacing}px`;
        } else if (direction === 'vertical') {
            spacingStyles.columnGap = '0';
            spacingStyles.rowGap = `${spacing}px`;
        }

        return spacingStyles;
    };

    // Apply fit styles based on the fit prop
    const getFitStyles = () => {
        const fitStyles = {};

        if (fit === 'expand') {
            fitStyles.width = '100%';
            fitStyles.height = '100%';
        }

        return fitStyles;
    };

    // Merge the styles together
    const mergedStyles = {
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

export const Text = ({
    children,
    style,
    textAlign,
    fontWeight,
    fontSize,
    color,
    textDecoration,
    ...otherProps
}) => {
    const textStyle = {
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

export const Icon = ({
    icon,
    size = 24,
    color = 'black',
    semanticLabel,
    semanticDescription,
    onTap,
  }) => {
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

export default NullWidget;