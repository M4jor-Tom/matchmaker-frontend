import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivationState, Client, CompatClient, IFrame, IMessage, Message, Stomp } from "@stomp/stompjs"
import * as SockJS from 'sockjs-client';
import { NodeModel } from 'src/app/logic/model/interface/node-model';
import { NodeId } from '../../model/enum/node-id';
import { Action } from '../../model/interface/request-type/action';
import { ActionType } from '../../model/interface/request-type/action-type';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private static ENDPOINT_URL: Readonly<string> = "http://localhost:8081/ws-endpoint";

  private static BROKER_URL: Readonly<string> = "/user/secured/ws-user";
  // private static BROKER_URL: Readonly<string> = "/secured/ws-user";

  private static DESTINATION_URL: Readonly<string> = "/secured/ws-room";

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
  
  //Click
  public sendClick(nodeId: NodeId): void {
    const action: Action = {nodeId: nodeId, actionType: ActionType.CLICK};
    this.stompClient.send(WebsocketService.DESTINATION_URL, {}, JSON.stringify(action));
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
        self.stompClient.subscribe(self.getBrokerUrl, function(message: Message) {
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
    this.stompClient.reconnect_delay = 10000;
    this.stompClient.activate();
  }

  public wsDisconnect() {
    this.stompClient.disconnect();
  }

  private get getBrokerUrl(): string {
    console.log("Your current session is: " + WebsocketService.getSessionIdFromUrl(this.stompClient.ws._transport.url)); //TODO Remove log
    return WebsocketService.BROKER_URL + "-user" + WebsocketService.getSessionIdFromUrl(this.stompClient.ws._transport.url);
  }

  private static getSessionIdFromUrl(url: string): string {
    const split: string[] = url.split("/");
    return split[split.length - 2];
  }

  private static decodeMessage(message: Message): string {
    return WebsocketService.TEXT_DECODER.decode(message.binaryBody);
  }
}
