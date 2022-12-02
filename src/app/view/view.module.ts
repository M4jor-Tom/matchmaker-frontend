import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeatureModule } from '../feature/feature.module';
import { SolStarChartComponent } from './sol-star-chart/sol-star-chart.component';
import { BaseModule } from '../base/base.module';



@NgModule({
  declarations: [
    SolStarChartComponent
  ],
  imports: [
    SharedModule,
    FeatureModule,
    CommonModule
  ],
  exports: [
    SolStarChartComponent
  ]
})
export class ViewModule { }
