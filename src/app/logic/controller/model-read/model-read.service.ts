import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompatClient, Message, Stomp } from "@stomp/stompjs"
import * as SockJS from 'sockjs-client';
import { NodeModel } from 'src/app/model/node-model';

@Injectable({
  providedIn: 'root'
})
export class ModelReadService {

  private static WEBSOCKET_ENDPOINT_URL: Readonly<string> = "http://localhost:8081/ws-endpoint";

  private stompClient: CompatClient;

  private subject: Subject<NodeModel>;

  private static TEXT_DECODER: TextDecoder = new TextDecoder();

  public constructor() {
    this.stompClient = Stomp.over(function() {
      return new SockJS(ModelReadService.WEBSOCKET_ENDPOINT_URL);
    });

    this.subject = new Subject<NodeModel>();

  }

  public wsConnect(brokerUrl: string): void {
    const self: ModelReadService = this;
    this.stompClient.configure({
      onConnect: function(frame: any) {
        self.stompClient.subscribe(brokerUrl, function(message: Message) {
          self.subject.next(JSON.parse(ModelReadService.decodeMessage(message)));
        });
      }
    });
    this.stompClient.activate();
  }

  public get getNodeModelSubject(): Subject<NodeModel> {
    return this.subject;
  }

  private static decodeMessage(message: Message): string {
    return ModelReadService.TEXT_DECODER.decode(message.binaryBody);
  }
}
