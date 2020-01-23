import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayTableComponent } from './play-table/play-table.component';

const routes: Routes = [
  { path: '', component: PlayTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
