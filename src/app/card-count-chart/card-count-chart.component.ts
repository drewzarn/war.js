import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { StatsService } from '../_services/stats.service';
import { PlayerCountStats } from '../_classes/player-count-stats';
import { min } from 'd3';

@Component({
  selector: 'app-card-count-chart',
  templateUrl: './card-count-chart.component.html',
  styleUrls: ['./card-count-chart.component.scss']
})
export class CardCountChartComponent implements OnInit {
  @ViewChild('chart', { static: false })
  private chartContainer: ElementRef;
  margin = { top: 0, right: 20, bottom: 20, left: 20 };
  colors = ["steelblue", "blueviolet", "coral", "darkgreen", "deeppink", "greenyellow"];

  constructor(public statService: StatsService) {
    this.statService.PlayerStats.subscribe(stats => {
      console.log(stats);
      let chartMap = new Map<Number, object>();
      stats.forEach((playerCounts: PlayerCountStats, player: string) => {
        playerCounts.Counts.forEach((count, i) => {
          if (!chartMap.has(i)) {
            chartMap.set(i, { deal: i });
          }
          let dealStat = chartMap.get(i);
          dealStat[player] = count;
          chartMap.set(i, dealStat);
        });
      });
      this.createChart(stats);
    });
  }

  ngOnInit() {
  }

  private createChart(data: Map<string, PlayerCountStats>): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth - this.margin.left - this.margin.right;
    const height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + this.margin.left + this.margin.right)
      .attr("height", height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (this.margin.left + this.margin.right) + "," + (0) + ")");

    var x = d3.scaleLinear()
      .domain([1, data.get(data.keys().next().value).Counts.length])
      .range([0, width - this.margin.right]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x axis")
      .call(d3.axisBottom(x).ticks(data.get(data.keys().next().value).Counts.length - 1, "f"));

    var y = d3.scaleLinear()
      .domain([0, 52])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    let playerIds = [...data.keys()];
    data.forEach((player, playerId) => {
      let line = d3.line()
        .x(function (d, i) { return x(i + 1); })
        .y(function (d, i) { return y(d); });
      console.log(playerIds, playerId, this.colors[playerIds.indexOf(playerId)]);
      svg.append("path")
        .datum([...player.Counts])
        .attr("fill", "none")
        .attr("stroke", this.colors[playerIds.indexOf(playerId)])
        .attr("stroke-width", 1)
        .attr("d", line);
    });

    d3.selectAll("g.x.axis g.tick")
      .attr("class", function (d: number) {
        let tickCount = data.get(data.keys().next().value).Counts.length;
        let minTickWidth = 20;
        if (width / tickCount < minTickWidth) {
          if (d % 10 > 0)
            return 'd-none';
        }
        return '';
        console.log(width, tickCount);
        //d for the tick line is the value
        //of that tick 
        //(a number between 0 and 1, in this case)
        if ((10 * d) % 2) //if it's an even multiple of 10%
          return 10;
        else
          return 4;
      });

  }

}
