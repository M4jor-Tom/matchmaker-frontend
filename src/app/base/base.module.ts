import { NgModule } from '@angular/core';
import { NgCoreModule } from '../ng-core/ng-core.module';
import { CelestialTemplateComponent } from './celestial-template/celestial-template.component';



@NgModule({
  declarations: [
    CelestialTemplateComponent,
  ],
  imports: [
    NgCoreModule
  ]
})
export class BaseModule { }
