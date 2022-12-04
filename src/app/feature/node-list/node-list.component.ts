import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NodeDataService } from 'src/app/base/node/node-data/node-data.service';
import { WebsocketService } from 'src/app/logic/controller/websocket/websocket.service';
import { baseIdToNodeId, NodeId, nodeIdLabelToBaseId, nodeIdToBaseId } from 'src/app/logic/model/enum/node-id';
import { NodeModel } from 'src/app/logic/model/interface/node-model';
import { getElementByIdOrThrow } from 'src/app/utils/html-utils';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.sass']
})
export class NodeListComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private nodeDataService: NodeDataService
  ) {
    const self: NodeListComponent = this;

    this.websocketService.wsConnect();
    this.subscription = this.websocketService.getNodeModelSubjects.subscribe(nodeModel => {
      nodeModel.forEach(function(nodeModel: NodeModel) {
        self.nodeDataService.setProperties = {
          baseId: nodeIdToBaseId(nodeModel.nodeId),
          waitingPlayersCount: nodeModel.waitingPlayersCount,
          isPlayerSubscribed: nodeModel.isPlayerSubscribed
        }
      });
    });

  }

  public ngAfterViewInit(): void {
    this.initListeners();
  }

  public initListeners(): void {
    const self: NodeListComponent = this;
    let elements: HTMLDivElement[] = [];

    Object.keys(NodeId).filter(id => id !== "NO_ID").forEach(function(value: string) {
      elements.push(getElementByIdOrThrow(nodeIdLabelToBaseId(value)));
    });

    elements.forEach(function(element: HTMLDivElement) {
      element.addEventListener("mouseup", function(ev: MouseEvent) {
        const elementId: string | null = element.getAttribute("id");
        
        if(elementId == null) {
          throw new Error("elementId is null");
        }

        self.websocketService.subscribeToNodeOfId(baseIdToNodeId(elementId));
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.websocketService.wsDisconnect();
  }
}
