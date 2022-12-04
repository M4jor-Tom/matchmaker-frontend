import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivationState, Client, CompatClient, IFrame, IMessage, Message, Stomp } from "@stomp/stompjs"
import * as SockJS from 'sockjs-client';
import { NodeModel } from 'src/app/logic/model/interface/node-model';
import { NodeId } from '../../model/enum/node-id';
import { NodeSubscription } from '../../model/interface/request-type/node-subscription';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private static ENDPOINT_URL: Readonly<string> = "http://localhost:8081/ws-endpoint";

  private static BROKER_URL: Readonly<string> = "/ws-broker";

  private static DESTINATION_URL: Readonly<string> = "/ws-destination";

  private stompClient: CompatClient;

  private subject: Subject<NodeModel[]>;

  private static TEXT_DECODER: TextDecoder = new TextDecoder();

  public constructor() {
    this.stompClient = Stomp.over(function() {
      return new SockJS(WebsocketService.ENDPOINT_URL);
    });

    this.subject = new Subject<NodeModel[]>();
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
  public get getNodeModelSubjects(): Subject<NodeModel[]> {
    return this.subject;
  }

  //  USER ACCESSIBLE FUNCTIONALITIES  --  END

  public wsConnect(): void {
    const self: WebsocketService = this;
    this.stompClient.configure({
      onConnect: function(frame: IFrame) {
        // frame.headers = {"server": "matchmaker-backend"};
        console.log("onConnect: " + frame.body);
        self.stompClient.subscribe(WebsocketService.BROKER_URL, function(message: Message) {
          self.subject.next(JSON.parse(WebsocketService.decodeMessage(message)));
        });
      },

      onChangeState: function(state: ActivationState) {
        console.log("onChangeState: " + state.toString());
      },

      onStompError: function(frame: IFrame) {
        console.error("onStompError: " + frame.body);
      },

      onWebSocketError: function(evt: any) {
        console.error("WebSocketError");
      },

      onWebSocketClose: function(evt: any) {
        console.log("WebSocketClose");
      },

      onDisconnect: function(receipt: IFrame) {
        console.log("onDisconnect: " + receipt.body);
      },

      onUnhandledFrame: function(receipt: IFrame) {
        console.warn("onUnhandledFrame: " + receipt.body)
      },

      onUnhandledMessage: function(message: IMessage) {
        console.warn("onUnhandledMessage: " + message.body)
      },

      onUnhandledReceipt: function(receipt: IFrame) {
        console.warn("onUnhandledReceipt: " + receipt.body);
      }
    });
    this.stompClient.activate();
  }

  public wsDisconnect() {
    this.stompClient.disconnect();
  }

  private sendNodeSubscription(nodeSubscription: NodeSubscription): void {
    this.stompClient.send(WebsocketService.DESTINATION_URL, {}, JSON.stringify(nodeSubscription));
  }

  private static decodeMessage(message: Message): string {
    return WebsocketService.TEXT_DECODER.decode(message.binaryBody);
  }
}
