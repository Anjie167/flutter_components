import React from 'react';

export interface GridViewBuilderProps {
    itemCount: number;
    itemBuilder: (index: number) => React.ReactNode;
    gridDelegate: {
        crossAxisCount: number;
        mainAxisSpacing: number;
        crossAxisSpacing: number;
        childAspectRatio: number;
    };
}

export class GridViewBuilder extends React.Component<GridViewBuilderProps> {
    static defaultGridDelegate = {
        crossAxisCount: 2,
        mainAxisSpacing: 4,
        crossAxisSpacing: 4,
        childAspectRatio: 1,
    };

    render() {
        const { itemBuilder, gridDelegate } = this.props;
        const { crossAxisCount, mainAxisSpacing, crossAxisSpacing, childAspectRatio } = gridDelegate;

        const totalCrossAxisSpacing = (crossAxisCount - 1) * crossAxisSpacing;
        const containerWidth = document.documentElement.clientWidth;
        const availableWidth = containerWidth - totalCrossAxisSpacing;
        const itemWidth = availableWidth / crossAxisCount;

        const children = [];
        for (let i = 0; i < this.props.itemCount; i++) {
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
