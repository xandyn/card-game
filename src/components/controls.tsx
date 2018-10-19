import * as React from 'react';
import { observer } from 'mobx-react';
import { appStore, GameDifficulty, GameState } from '../stores';

import './layout.css';

@observer
export class Controls extends React.Component {
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
    const { gameState } = appStore;
    return (
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
    );
  }
}
