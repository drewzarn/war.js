import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  gamePlayers = new FormControl(2);
  gameDelay = new FormControl(250);

  constructor(public gameService: GameService) {
   }

  ngOnInit() {
  }

  StartGame() {
    this.gameService.StartGame(this.gamePlayers.value, this.gameDelay.value);
  }

}
