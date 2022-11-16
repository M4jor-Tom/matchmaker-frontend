import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from "@stomp/stompjs"
import * as nm from 'src/app/model/node-model';
import { WebSocketApi } from '../web-socket/web-socket-api';

@Injectable({
  providedIn: 'root'
})
export class ModelReadService {

  private webSocketApi: WebSocketApi;

  public constructor() {
    this.webSocketApi = new WebSocketApi("/nodes", function(message: Message) {
      console.log("<ModelReadService> Received: " + JSON.stringify(message));
    });

    this.webSocketApi.send("HELLO");
  }

  public getNodeModelSubject(): BehaviorSubject<nm.NodeModel> {
    //  [TODO] Unmock
    return new BehaviorSubject<nm.NodeModel>(nm.cloneDefaultValue());
  }
}
