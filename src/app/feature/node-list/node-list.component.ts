import { AfterViewInit, Component } from '@angular/core';
import { WebsocketService } from 'src/app/logic/controller/websocket/websocket.service';
import { NodeId } from 'src/app/logic/model/enum/node-id';
import { NodeModel } from 'src/app/logic/model/interface/node-model';
import { getElementByIdOrThrow } from 'src/app/utils/html-utils';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.sass']
})
export class NodeListComponent implements AfterViewInit {

  private nodeListElement: HTMLDivElement | null;

  constructor(private websocketService: WebsocketService) {
    this.nodeListElement = null;
  }

  ngAfterViewInit(): void {
    this.initHtml();
  }

  private initHtml(): void {
    const self: NodeListComponent = this;
    this.getNodeModelElements.forEach(function(nodeModelElement) {
      self.getNodeListElementOrThrow.appendChild(nodeModelElement);
    });
  }

  public get getNodeModels(): NodeModel[] {
    return [
      {nodeId: NodeId.NO_ID, name: "someName", waitingPlayersCount: 2, isPlayerSubscribed: true},
      {nodeId: NodeId.NO_ID, name: "someOtherName", waitingPlayersCount: undefined, isPlayerSubscribed: false}
    ];
  }

  public get getNodeModelElements(): HTMLDivElement[] {
    let nodeModelElements: HTMLDivElement[] = [];
    this.getNodeModels.forEach(function(nodeModel: NodeModel) {
      const nodeModelElement: HTMLDivElement = document.createElement("div");
      nodeModelElement.setAttribute("id", NodeListComponent.nodeModelIdToHtmlId(nodeModel.nodeId));
      nodeModelElement.setAttribute("class", "node");
      nodeModelElement.innerHTML = nodeModel.name + ": " +
        (nodeModel.waitingPlayersCount === undefined ? "?" : nodeModel.waitingPlayersCount?.toString()) + "/4 " +
        (nodeModel.isPlayerSubscribed ? "[unsubscribed]" : "[subscribe]");
      nodeModelElements.push(nodeModelElement);
    });

    return nodeModelElements;
  }

  public get getNodeListElementOrThrow(): HTMLDivElement {
    if(this.nodeListElement === null) {
      this.nodeListElement = getElementByIdOrThrow<HTMLDivElement>("node-list");
    }

    return this.nodeListElement;
  }

  public static nodeModelIdToHtmlId(nodeId: NodeId): string {
    return nodeId.toLowerCase().replace("_", "-");
  }
}
