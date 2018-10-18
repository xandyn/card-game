import { observable, action } from 'mobx';
import { GridStore } from './grid-store';

export enum GameState {
  Idle,
  Started,
  Win,
  Loss
}

export enum GameDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export const remainingTime: number = 30;

export class AppStore {
  gridStore: GridStore;

  constructor() {
    this.gridStore = new GridStore(this);

    this.setGameDifficulty(GameDifficulty.Easy);
    this.setGameState(GameState.Idle);
  }

  @observable
  public gameState: GameState;

  @observable
  public gameDifficulty: GameDifficulty;

  @observable
  public remainingTime: number = remainingTime;

  private timerId: NodeJS.Timer;

  @action
  public setGameDifficulty(difficulty: GameDifficulty): void {
    this.gameDifficulty = difficulty;
    this.setGameState(GameState.Idle);
    this.gridStore.setSizeByDifficulty(difficulty);
  }

  @action
  public setGameState(state: GameState): void {
    this.gameState = state;
    this.gridStore.generateGrid();
    if (state === GameState.Started) {
      this.gridStore.enableGrid();
      this.startTimer();
    } else {
      this.gridStore.disableGrid();
      this.resetTimer();
    }
  }

  @action
  private startTimer(): void {
    this.setRemainingTime(remainingTime);
    this.timerId = setInterval(() => {
      const newTime = this.remainingTime - 1;
      if (newTime < 0) {
        this.setGameState(GameState.Loss);
      } else {
        this.setRemainingTime(newTime);
      }
    }, 1000);
  }

  @action
  private resetTimer(): void {
    clearInterval(this.timerId);
    this.setRemainingTime(remainingTime);
  }

  @action
  private setRemainingTime(time: number): void {
    this.remainingTime = time;
  }
}

export const appStore = new AppStore();
