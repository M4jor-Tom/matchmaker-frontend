import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolStarChartComponent } from './view/sol-star-chart/sol-star-chart/sol-star-chart.component';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'sol-star-chart'
  },
  {
    path: 'sol-star-chart',
    component: SolStarChartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
