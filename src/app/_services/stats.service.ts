import { Injectable } from '@angular/core';
import { Player } from '../_classes/player';
import { PlayerCountStats } from '../_classes/player-count-stats';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private playerCount: number;
  private warCards: number;
  private endsWithLoser: boolean;

  private dealCount: number;
  private warDealCount: number;
  private warCount: number;
  private playerStats: Map<string, PlayerCountStats>;

  public PlayerStats: ReplaySubject<Map<string, PlayerCountStats>>;

  constructor() { 
    this.PlayerStats = new ReplaySubject<Map<string, PlayerCountStats>>(1);
  }

  public NewGame(players: Player[], warCards: number, endsWithLoser: boolean) {
    this.playerCount = players.length;
    this.warCards = warCards;
    this.endsWithLoser = endsWithLoser;

    this.dealCount = 0;
    this.warDealCount = 0;
    this.warCount = 0;

    this.playerStats = new Map<string, PlayerCountStats>();
    players.forEach(player => {
      this.playerStats.set(player.ID, new PlayerCountStats());
    });
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

  public CountCards(allPlayers: Player[]) {
    allPlayers.forEach(player => {
      this.playerStats.get(player.ID).AddCount(player.CardCount);
    })
    this.PlayerStats.next(this.playerStats);
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
