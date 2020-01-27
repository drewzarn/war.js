import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private players: number;
  private warCards: number;
  private endsWithLoser: boolean;

  private dealCount: number;
  private warDealCount: number;
  private warCount: number;

  constructor() { }

  public NewGame(players: number, warCards: number, endsWithLoser: boolean) {
    this.players = players;
    this.warCards = warCards;
    this.endsWithLoser = endsWithLoser;

    this.dealCount = 0;
    this.warDealCount = 0;
    this.warCount = 0;
  }

  public TrackDeal() {
    this.dealCount++;
  }

  public TrackWarDeal() {
    this.warDealCount++;
  }

  public TrackWar() {
    this.warCount++;
  }

  public get Deals(): number {
    return this.dealCount;
  }

  public get WarDeals(): number {
    return this.warDealCount;
  }

  public get Wars(): number {
    return this.warCount;
  }
}
