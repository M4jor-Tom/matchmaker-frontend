import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NodeDataService } from 'src/app/base/node/node-data/node-data.service';
import { WebsocketService } from 'src/app/logic/controller/websocket/websocket.service';
import { nodeIdToBaseId } from 'src/app/logic/model/enum/node-id';
import { NodeModel } from 'src/app/logic/model/interface/node-model';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.sass']
})
export class NodeListComponent implements OnDestroy {

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

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.websocketService.wsDisconnect();
  }
}
