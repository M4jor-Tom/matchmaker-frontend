import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompatClient, Stomp } from "@stomp/stompjs"
import * as nm from 'src/app/model/node-model';

@Injectable({
  providedIn: 'root'
})
export class ModelReadService {

  public constructor() {
    
  }

  public getNodeModelSubject(): BehaviorSubject<nm.NodeModel> {
    //  [TODO] Unmock
    return new BehaviorSubject<nm.NodeModel>(nm.cloneDefaultValue());
  }
}
