import { Injectable } from '@angular/core';
import { Player } from '../_classes/player';
import { Card } from '../_classes/card';
import { StatsService } from './stats.service';
import { Subject } from 'rxjs';

enum GameState {
  Stopped,
  EmptyTable,
  CardsInPlay,
  AtWar
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private deck: Card[];
  private players: Player[];
  private warCardCount: number;
  private endWithLoser: boolean;
  private gameState: GameState;
  public GameStates = GameState;

  public StepComplete: Subject<null>;

  constructor(private statService: StatsService) {
    this.StepComplete = new Subject();
    this.gameState = GameState.Stopped;
    this.players = [];
  }

  public get WarChestCount(): number {
    let c = 0;
    this.players.filter(player => player.WarMonger).forEach(player => {
      c += player.WarChest.length;
    });
    return c;
  }

  public get HeldCardCount(): number {
    let c = 0;
    this.players.forEach(player => {
      c += player.CardCount;
    })
    return c;
  }

  public get PlayedCardCount(): number {
    return this.players.filter(player => player.PlayedCard).length;
  }

  public get GameState(): GameState {
    return this.gameState;
  }

  public StopGame() {
    this.gameState = GameState.Stopped;
  }

  public StartGame(playerCount: number, warCardCount: number, endWithLoser: boolean) {
    this.endWithLoser = endWithLoser;
    this.warCardCount = warCardCount;
    this.players = [];
    for (let p = 0; p < playerCount; p++) {
      this.players.push(new Player("Player " + (p + 1)));
    }

    this.statService.NewGame(playerCount, warCardCount, endWithLoser);

    this.NewDeck();
    this.Shuffle(this.deck);
    this.Deal();
    this.gameState = GameState.EmptyTable;
    this.StepComplete.next();
  }

  private NewDeck() {
    this.deck = [];
    for (let s = 0; s < 4; s++) {
      for (let i = 2; i < 15; i++) {
        this.deck.push(new Card(s, i));
      }
    }
  }

  private Shuffle(cards: Card[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  private Deal() {
    let deckCount = this.deck.length;
    for (let c = 0; c < deckCount; c++) {
      this.players[c % this.players.length].AddCard(this.deck.shift());
    }
  }

  public LayCards() {
    if (this.gameState == this.GameStates.EmptyTable) {
      this.statService.TrackDeal();
      this.players.filter(player => !player.Lost).forEach(player => {
        player.LastWinner = false;
        player.PlayCard();
      });
    } else if (this.gameState == this.GameStates.AtWar) {
      this.statService.TrackWarDeal();
      let warMongers = this.players.filter(player => player.WarMonger);
      warMongers.forEach(player => {
        player.AddCardToWarChest(player.TakeCard());
        for (let i = 0; i < this.warCardCount; i++) {
          player.AddCardToWarChest();
        }
        player.PlayCard();
      });
    }
    this.CheckForWar();
    this.StepComplete.next();
  }

  private CheckForWar() {
    let playedCardValues = new Map<number, number>();
    let onlyWarmongers = this.players.filter(player => player.WarMonger).length > 0;
    this.players.filter(player => player.PlayedCard).filter(player => (!onlyWarmongers || (onlyWarmongers && player.WarMonger))).forEach(player => {
      playedCardValues.set(player.PlayedCard.Value, isNaN(playedCardValues.get(player.PlayedCard.Value)) ? 1 : playedCardValues.get(player.PlayedCard.Value) + 1);
    });
    if (playedCardValues.get(Math.max.apply(null, [...playedCardValues.keys()])) == 1) {
      this.gameState = GameState.CardsInPlay;
    } else {
      this.statService.TrackWar();
      this.gameState = GameState.AtWar;
      let winValue = Math.max.apply(null, [...playedCardValues.keys()]);
      let warMongers = this.players.filter(player => player.PlayedCard).filter(player => player.PlayedCard.Value == winValue);
      warMongers.forEach(player => {
        player.WarMonger = true;
      });
    }
  }

  public GatherCards() {
    let playedCardValues = new Map<number, number>();
    let onlyWarmongers = this.players.filter(player => player.WarMonger).length > 0;
    this.players.filter(player => player.PlayedCard).filter(player => (!onlyWarmongers || (onlyWarmongers && player.WarMonger))).forEach(player => {
      playedCardValues.set(player.PlayedCard.Value, isNaN(playedCardValues.get(player.PlayedCard.Value)) ? 1 : playedCardValues.get(player.PlayedCard.Value) + 1);
    });
    let winValue = Math.max.apply(null, [...playedCardValues.keys()]);
    let winner = this.players.filter(player => player.PlayedCard).find(player => player.PlayedCard.Value == winValue);
    winner.LastWinner = true;
    let cardsInPlay = [];
    this.players.filter(player => player.PlayedCard).forEach(player => {
      cardsInPlay.push(player.TakeCard());
    });
    this.Shuffle(cardsInPlay);
    cardsInPlay.forEach(card => winner.AddCard(card));
    this.players.forEach(player => {
      player.EmptyWarChest().forEach(card => winner.AddCard(card));
      player.WarMonger = false;
    });

    this.players.filter(player => player.CardCount == 0).forEach(player => player.Lost = true);

    if (this.endWithLoser && this.players.filter(player => player.Lost).length > 0) {
      this.gameState = GameState.Stopped;
    } else if (!this.endWithLoser && this.players.filter(player => player.CardCount > 0).length == 1) {
      this.gameState = GameState.Stopped;
    } else {
      this.gameState = GameState.EmptyTable;
    }
    this.StepComplete.next();
  }

  public get Players(): Player[] {
    return [...this.players];
  }
}