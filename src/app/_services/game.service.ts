import { Injectable } from '@angular/core';
import { Player } from '../_classes/player';
import { Card } from '../_classes/card';

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
  private gameState: GameState;
  public GameStates = GameState;

  constructor() {
    this.gameState = GameState.Stopped;
  }

  public get GameState(): GameState {
    return this.gameState;
  }

  public StartGame(playerCount: number, delay: number) {
    this.players = [];
    for (let p = 0; p < playerCount; p++) {
      this.players.push(new Player("Player " + (p + 1)));
    }
    this.NewDeck();
    this.Shuffle();
    this.Deal();
    this.gameState = GameState.EmptyTable;
  }

  private NewDeck() {
    this.deck = [];
    for (let s = 0; s < 4; s++) {
      for (let i = 2; i < 15; i++) {
        this.deck.push(new Card(s, i));
      }
    }
  }

  private Shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private Deal() {
    let deckCount = this.deck.length;
    for (let c = 0; c < deckCount; c++) {
      this.players[c % this.players.length].AddCard(this.deck.shift());
    }
  }

  public LayCards() {
    this.players.forEach(player => {
      player.PlayCard();
    });
    let playedCardValues = new Map<number, number>();
    this.players.forEach(player => {
      playedCardValues.set(player.PlayedCard.Value, isNaN(playedCardValues.get(player.PlayedCard.Value)) ? 1 : playedCardValues.get(player.PlayedCard.Value) + 1);
    });
    if (playedCardValues.get(Math.max.apply(null, [...playedCardValues.keys()])) == 1) {
      this.gameState = GameState.CardsInPlay;
    } else {
      this.gameState = GameState.AtWar;
      this.ResolveWar();
    }
  }

  private ResolveWar() {
    let playedCardValues = new Map<number, number>();
    this.players.forEach(player => {
      playedCardValues.set(player.PlayedCard.Value, isNaN(playedCardValues.get(player.PlayedCard.Value)) ? 1 : playedCardValues.get(player.PlayedCard.Value) + 1);
    });
    let winValue = Math.max.apply(null, [...playedCardValues.keys()]);
    let warMongers = this.players.filter(player => player.PlayedCard.Value == winValue);
    warMongers.forEach(player => {
      player.WarMonger = true;
    });
  }

  public GatherCards() {
    let playedCardValues = new Map<number, number>();
    this.players.forEach(player => {
      playedCardValues.set(player.PlayedCard.Value, isNaN(playedCardValues.get(player.PlayedCard.Value)) ? 1 : playedCardValues.get(player.PlayedCard.Value) + 1);
    });
    console.log(this.gameState);
    let winValue = Math.max.apply(null, [...playedCardValues.keys()]);
    if (this.gameState = GameState.CardsInPlay) {
      let winner = this.players.find(player => player.PlayedCard.Value == winValue);
      let cardsInPlay = [];
      this.players.forEach(player => {
        cardsInPlay.push(player.TakeCard());
      });
      cardsInPlay.forEach(card => winner.AddCard(card));
      this.gameState = GameState.EmptyTable;
    } else if (this.gameState = GameState.AtWar) {
      let warMongers = this.players.filter(player => player.WarMonger);
      console.log(warMongers);
      //this.gameState = GameState.EmptyTable;
    }
  }

  public get Players(): Player[] {
    return this.players;
  }
}