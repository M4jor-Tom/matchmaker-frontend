import { AfterViewInit, Component, Input } from '@angular/core';
import { NodeId } from 'src/app/logic/model/enum/node-id';
import * as nm from 'src/app/logic/model/interface/node-model';
import { NodeDataService } from './node-data/node-data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass']
})
export class NodeComponent implements AfterViewInit {

  private baseId: string | undefined;

  private nodeModel: nm.NodeModel;

  constructor(private nodeDataService: NodeDataService) {
    this.baseId = undefined;
    this.nodeModel = nm.cloneDefaultValue();
  }

  public ngAfterViewInit(): void {
    this.initDynamics();
  }

  private initDynamics(): void {
    this.nodeDataService.getObservable.subscribe(props => {
      this.nodeModel = nm.updateWithDynamicProperties(this.nodeModel, props);
    });
  }

  public get getNodeModel(): nm.NodeModel {
    return this.nodeModel;
  }

  @Input("base-id")
  public set setBaseId(baseId: string) {
    this.baseId = baseId;
  }

  public get getWaitingPlayersCountText(): string {
    return this.nodeModel.waitingPlayersCount === undefined
      ? "?"
      : this.nodeModel.waitingPlayersCount.toString();
  }

  public get getSnakeCaseNodeId(): string {
    return NodeComponent.nodeModelIdToHtmlId(this.nodeModel.nodeId);
  }

  public static nodeModelIdToHtmlId(nodeId: NodeId): string {
    return nodeId.toLowerCase().replace("_", "-");
  }
}
