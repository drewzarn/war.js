import { Component, OnInit } from '@angular/core';
import { Card } from '../_classes/card';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.scss']
})
export class PlayTableComponent implements OnInit {
  cards: Card[];

  constructor() { }

  ngOnInit() {
    this.cards = [];
    for(let s=0; s<4; s++) {
      for(let i=2; i<15; i++) {
        this.cards.push(new Card(s, i));
      }
    }
  }

}
