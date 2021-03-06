import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameService } from '../_services/game.service';
import { interval, Observable, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  gamePlayers = new FormControl(2);
  warCards = new FormControl(2);
  gameEndsWith = new FormControl('winner');
  autoPlay = new FormControl(true);
  gameDelay = new FormControl(25);
  ticker: Observable<number>;

  constructor(public gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.StepComplete.subscribe(() => {
      if (this.gameService.HeldCardCount + this.gameService.PlayedCardCount + this.gameService.WarChestCount > 52) {
        this.autoPlay.setValue(false);
        debugger;
      }
      if (this.autoPlay.value) {
        this.ticker.subscribe(() => {
          this.NextStep();
        });
      }
    });
  }

  NextStep() {
    switch (this.gameService.GameState) {
      case this.gameService.GameStates.EmptyTable:
        this.gameService.LayCards();
        break;
      case this.gameService.GameStates.AtWar:
        this.gameService.LayCards();
        break;
      case this.gameService.GameStates.CardsInPlay:
        this.gameService.GatherCards();
        break;
    }
  }

  StartGame() {
    this.ticker = timer(this.gameDelay.value);
    this.gameService.StartGame(this.gamePlayers.value, this.warCards.value, this.gameEndsWith.value == "loser");
  }

  StopGame() {
    this.gameService.StopGame();
  }

}
