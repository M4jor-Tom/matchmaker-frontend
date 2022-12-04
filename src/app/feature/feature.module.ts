import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeListComponent } from './node-list/node-list.component';
import { BaseModule } from '../base/base.module';



@NgModule({
  declarations: [
    NodeListComponent
  ],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [
    NodeListComponent
  ]
})
export class FeatureModule { }
