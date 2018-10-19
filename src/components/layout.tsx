import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid } from './grid';
import { Controls } from './controls';
import { Timer } from './timer';
import { appStore, GameState } from '../stores';

import './layout.css';

@observer
export class Layout extends React.Component {
  render() {
    const { gameState } = appStore;
    return (
      <div className="layout">
        <Controls />
        <Timer />
        {gameState === GameState.Idle || gameState === GameState.Started ? (
          <Grid />
        ) : gameState === GameState.Win ? (
          <div className="end">You win! 🏁</div>
        ) : gameState === GameState.Loss ? (
          <div className="end">Time is over, you lose! 🕒</div>
        ) : null}
      </div>
    );
  }
}
