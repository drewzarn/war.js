import { Injectable } from '@angular/core';
import { Player } from '../_classes/player';
import { Card } from '../_classes/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private deck: Card[];
  private players: Player[];

  constructor() { }

  public StartGame(playerCount: number, delay: number) {
    this.players = [];
    for (let p = 0; p < playerCount; p++) {
      this.players.push(new Player("Player " + (p + 1)));
    }
    this.NewDeck();
    this.Shuffle();

    let deckCount = this.deck.length;
    for (let c = 0; c < deckCount; c++) {
      this.players[c % this.players.length].AddCard(this.deck.shift());
    }
  }

  private Shuffle() {
    for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }

  public get Players(): Player[] {
    return this.players;
  }

  private NewDeck() {
    this.deck = [];
    for (let s = 0; s < 4; s++) {
      for (let i = 2; i < 15; i++) {
        this.deck.push(new Card(s, i));
      }
    }
  }
}
