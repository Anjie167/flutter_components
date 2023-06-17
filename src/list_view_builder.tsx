import React from 'react';

export interface ListViewBuilderProps {
    itemCount: number;
    itemBuilder: (index: number) => React.ReactNode;
    itemExtent: string | number;
    padding: number;
    reverse?: boolean;
    scrollDirection?: 'vertical' | 'horizontal';
}

export class ListViewBuilder extends React.Component<ListViewBuilderProps> {
    render() {
        const { itemCount, itemBuilder, itemExtent, padding, reverse, scrollDirection = 'vertical' } = this.props;
        const items: React.ReactNode[] = [];

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

        return <div style={{
            height: `calc(100% - ${padding * 2}px)`,
            padding: `${padding}px`,
            overflowY: scrollDirection === 'horizontal' ? 'hidden' : 'auto',
            overflowX: scrollDirection === 'vertical' ? 'hidden' : 'auto',
            display: 'flex',
            flexDirection: scrollDirection === 'horizontal' ? 'row' : 'column',
        }}>{items}</div>;
    }
}
