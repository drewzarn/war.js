import { Component, OnInit } from '@angular/core';
import { StatsService } from '../_services/stats.service';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.scss']
})
export class StatsDisplayComponent implements OnInit {

  constructor(public statService: StatsService) { }

  ngOnInit() {
  }

}
