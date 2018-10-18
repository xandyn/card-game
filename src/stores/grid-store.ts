import { action, observable } from 'mobx';
import { delay, shuffle } from 'lodash';
import randomEmoji from 'random-emoji';
import { AppStore, GameDifficulty, GameState } from './app-store';

export interface ICard {
  index: number;
  value: number;
  flipped: boolean;
  revealed: boolean;
}

export class GridStore {
  appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    this.generateGrid();
  }

  @observable
  public grid: ICard[] = [];

  @observable
  public size: number = 4;

  @observable
  private cardsLeftToReveal: number;

  @observable
  public gridDisabled: boolean = true;

  @observable
  private flippedCards: number[] = [];

  @action
  public setSizeByDifficulty(difficulty: GameDifficulty): void {
    const sizes = {
      [GameDifficulty.Easy]: 4,
      [GameDifficulty.Medium]: 6,
      [GameDifficulty.Hard]: 8
    };
    this.size = sizes[difficulty];
    this.generateGrid();
  }

  @action
  public enableGrid(): void {
    this.gridDisabled = false;
  }

  @action
  public disableGrid(): void {
    this.gridDisabled = true;
  }

  @action
  public generateGrid(): void {
    const grid = [];
    const gridSize = this.size * this.size;
    const totalPairs = gridSize / 2;
    const emojis = randomEmoji.random({ count: totalPairs });
    const values = shuffle(emojis.concat(emojis));
    const indices = shuffle(Array.from(Array(gridSize).keys()));
    for (const i of indices) {
      grid[i] = {
        index: i,
        value: values[i].character,
        flipped: false,
        revealed: false
      } as ICard;
    }

    this.grid = grid;
    this.cardsLeftToReveal = gridSize;
    this.flippedCards = [];
  }

  @action
  public flipCard(index: number): void {
    this.grid[index].flipped = true;
    this.flippedCards.push(index);
    if (this.flippedCards.length === 2) {
      this.checkPair();
    }
  }

  @action
  private checkPair(): void {
    const flippedCardsIsPair = this.grid[this.flippedCards[0]].value === this.grid[this.flippedCards[1]].value;
    if (flippedCardsIsPair) {
      this.revealCards();
    } else {
      this.hideCards();
    }
  }

  @action
  private revealCards(): void {
    for (const i of this.flippedCards) {
      this.grid[i].revealed = true;
    }
    this.flippedCards = [];
    this.cardsLeftToReveal = this.cardsLeftToReveal - 2;
    if (this.cardsLeftToReveal === 0) {
      this.appStore.setGameState(GameState.Win);
    }
  }

  @action
  private hideCards(): void {
    // make delay and disable grid, so user can memoize cards
    this.disableGrid();
    delay(() => {
      for (const i of this.flippedCards) {
        this.grid[i].flipped = false;
      }
      this.flippedCards = [];
      this.enableGrid();
    }, 1000);
  }
}
