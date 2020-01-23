import { Component, OnInit } from '@angular/core';
import { Card } from '../_classes/card';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.scss']
})
export class PlayTableComponent implements OnInit {
  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

}
