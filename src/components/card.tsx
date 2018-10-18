import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { appStore, ICard } from '../stores';

import './card.css';

export interface CardProps {
  card: ICard;
}

@observer
export class Card extends React.Component<CardProps> {
  onClick = () => {
    appStore.gridStore.flipCard(this.props.card.index);
  }

  render() {
    const { card } = this.props;
    return (
      <div className={classNames('card', { revealed: card.revealed })} onClick={this.onClick}>
        {card.flipped || card.revealed ? card.value : '#'}
      </div>
    );
  }
}
