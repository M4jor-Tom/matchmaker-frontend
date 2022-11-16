import { CompatClient, Message, Stomp } from '@stomp/stompjs';

export class WebSocketApi {

  private static REST_API_URL: Readonly<string> = "http://localhost:8081";

  private static URL_REQUESTOR_FRAGMENT: Readonly<string> = "/requestor";

  private static URL_RECEPTOR_FRAGMENT: Readonly<string> = "/receptor";

  private urlPrefix: string;

  private webSocket: WebSocket | null;

  private stompClient: CompatClient | null;

  private handleMessage: HandleMessage;

  constructor(urlPrefix: string, handleMessage: HandleMessage) {
    this.webSocket = null;
    this.stompClient = null;

    this.urlPrefix = urlPrefix;
    this.handleMessage = handleMessage;
  }

  private connect(): void {
    const self: WebSocketApi = this;
    this.getStompClient().connect({}, function() {
          self.getStompClient().subscribe(self.getReceptorUrl, function(message: Message) {
              self.onMessageReceived(message);
          });
          //self.getStompClient().reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  public disconnect() {
      if(this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  private errorCallBack(error: string) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this.connect();
      }, 5000);
  }

  public send(message: string) {
      console.log("calling logout api via web socket");
      this.getStompClient().send(this.getReceptorUrl, {}, message);
  }

  private onMessageReceived(message: Message) {
      console.log("Message Recieved from Server :: " + message);
      this.handleMessage(message);
  }

  private getWebSocket(): WebSocket {
    if(this.webSocket === null) {
      this.webSocket = new WebSocket(this.getRequestorUrl);
    }

    return this.webSocket;
  }

  private getStompClient(): CompatClient {
    if(this.stompClient === null) {
      this.stompClient = Stomp.over(this.getWebSocket());
    }

    return this.stompClient;
  }

  private get getRequestorUrl(): string {
    return WebSocketApi.REST_API_URL + this.urlPrefix + WebSocketApi.URL_REQUESTOR_FRAGMENT;
  }

  private get getReceptorUrl(): string {
    return WebSocketApi.REST_API_URL + this.urlPrefix + WebSocketApi.URL_RECEPTOR_FRAGMENT;
  }
}

interface HandleMessage {
  (message: Message): void;
}