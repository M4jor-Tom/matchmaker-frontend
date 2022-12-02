import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeDataService } from 'src/app/base/node/node-data/node-data.service';
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

  constructor(
    private websocketService: WebsocketService,
    private nodeDataService: NodeDataService
  ) {
    this.websocketService.wsConnect();
  }

  ngAfterViewInit(): void {
    this.initDataTransfert();
  }

  private initDataTransfert(): void {
    this.websocketService.getNodeModelSubjects.subscribe(nodeModel => {
      nodeModel.forEach(function(nodeModel: NodeModel) {
        //NodeDataService.s
      });
    });
  }

  public get getNodeModels(): NodeModel[] {
    return [
      {nodeId: NodeId.NO_ID, name: "someName", waitingPlayersCount: 2, isPlayerSubscribed: true},
      {nodeId: NodeId.NO_ID, name: "someOtherName", waitingPlayersCount: undefined, isPlayerSubscribed: false}
    ];
  }
}
