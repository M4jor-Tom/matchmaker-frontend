import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as ncdp from 'src/app/logic/model/interface/dynamic-component-properties/node-dynamic-properties';
import { AbstractDataService } from 'src/app/utils/abstract-data-service';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService extends AbstractDataService<ncdp.NodeComponentDynamicProperties> {

  constructor() {
    super(new Subject<ncdp.NodeComponentDynamicProperties>());
  }
}