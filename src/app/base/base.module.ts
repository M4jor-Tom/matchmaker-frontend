import { NgModule } from '@angular/core';
import { NgCoreModule } from '../ng-core/ng-core.module';
import { CelestialTemplateComponent } from './celestial-template/celestial-template.component';
import { NodeComponent } from './node/node.component';



@NgModule({
  declarations: [
    CelestialTemplateComponent,
    NodeComponent,
  ],
  imports: [
    NgCoreModule
  ]
})
export class BaseModule { }
