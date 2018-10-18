import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Card } from './card';

import { appStore, ICard } from '../stores';

import './grid.css';

@observer
export class Grid extends React.Component {
  render() {
    const { grid, gridDisabled, size } = appStore.gridStore;
    const gridStyles = {
      gridTemplateColumns: `repeat(${size}, 50px)`,
      gridTemplateRows: `repeat(${size}, 50px)`
    };

    return (
      <div className={classNames('grid', { disabled: gridDisabled })} style={gridStyles}>
        {grid.map((card: ICard) => (
          <Card key={card.index} card={card} />
        ))}
      </div>
    );
  }
}
