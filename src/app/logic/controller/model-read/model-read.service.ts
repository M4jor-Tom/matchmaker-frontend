import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompatClient, Message, Stomp } from "@stomp/stompjs"
import * as SockJS from 'sockjs-client';
import { NodeModel } from 'src/app/logic/model/interface/node-model';
import { NodeId } from '../../model/enum/node-id';
import { NodeSubscription } from '../../model/interface/request-type/node-subscription';

@Injectable({
  providedIn: 'root'
})
export class ModelReadService {

  private static WEBSOCKET_ENDPOINT_URL: Readonly<string> = "http://localhost:8081/ws-endpoint";

  private static WEBSOCKET_BROKER_URL: Readonly<string> = "http://localhost:8081/ws-broker";

  private static WEBSOCKET_DESTINATION_URL: Readonly<string> = "http://localhost:8081/ws-destination";

  private stompClient: CompatClient;

  private subject: Subject<NodeModel>;

  private static TEXT_DECODER: TextDecoder = new TextDecoder();

  public constructor() {
    this.stompClient = Stomp.over(function() {
      return new SockJS(ModelReadService.WEBSOCKET_ENDPOINT_URL);
    });

    this.subject = new Subject<NodeModel>();

  }

  //  USER ACCESSIBLE FUNCTIONALITIES  --  START
  
  //Write
  public subscribeToNodeOfId(nodeId: NodeId): void {
    this.sendNodeSubscription({
      nodeId: nodeId,
      ifTrueAddElseRemove: true
    });
  }

  //Write
  public unsubscribeFromNodeOfId(nodeId: NodeId): void {
    this.sendNodeSubscription({
      nodeId: nodeId,
      ifTrueAddElseRemove: false
    });
  }

  //Read
  public get getNodeModelSubject(): Subject<NodeModel> {
    return this.subject;
  }

  //  USER ACCESSIBLE FUNCTIONALITIES  --  END

  public wsConnect(): void {
    const self: ModelReadService = this;
    this.stompClient.configure({
      onConnect: function(frame: any) {
        self.stompClient.subscribe(ModelReadService.WEBSOCKET_BROKER_URL, function(message: Message) {
          self.subject.next(JSON.parse(ModelReadService.decodeMessage(message)));
        });
      }
    });
    this.stompClient.activate();
  }

  private sendNodeSubscription(nodeSubscription: NodeSubscription): void {
    this.stompClient.send(ModelReadService.WEBSOCKET_DESTINATION_URL, {}, JSON.stringify(nodeSubscription));
  }

  private static decodeMessage(message: Message): string {
    return ModelReadService.TEXT_DECODER.decode(message.binaryBody);
  }
}
