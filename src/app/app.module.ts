import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayTableComponent } from './play-table/play-table.component';
import { GameControlComponent } from './game-control/game-control.component';
import { PlayerComponent } from './player/player.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { WarmongerPipe } from './_pipes/warmonger.pipe';
import { StatsDisplayComponent } from './stats-display/stats-display.component';
import { CardCountChartComponent } from './card-count-chart/card-count-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayTableComponent,
    GameControlComponent,
    PlayerComponent,
    BattlefieldComponent,
    WarmongerPipe,
    StatsDisplayComponent,
    CardCountChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
