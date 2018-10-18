import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid } from './grid';
import { appStore, GameDifficulty, GameState } from '../stores';

import './layout.css';

@observer
export class Layout extends React.Component {

  toggleGameState = () => {
    if (appStore.gameState === GameState.Started) {
      appStore.setGameState(GameState.Idle);
    } else {
      appStore.setGameState(GameState.Started);
    }
  }

  onSelectDifficulty = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
    const difficulty = event.currentTarget.value;
    appStore.setGameDifficulty(GameDifficulty[difficulty]);
  }

  render() {
    const { gameState, remainingTime } = appStore;
    return (
      <div className="layout">
        <div className="controls">
          <select
            className="difficulty"
            name="difficulty"
            onChange={this.onSelectDifficulty}
            disabled={gameState === GameState.Started}
          >
            {Object.keys(GameDifficulty).map((difficulty) => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          <button onClick={this.toggleGameState} className="start">
            {gameState === GameState.Started ? 'Stop Game' : 'Start Game'}
          </button>
        </div>
        <div className="timer">
          Time left: {remainingTime}s
        </div>
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
