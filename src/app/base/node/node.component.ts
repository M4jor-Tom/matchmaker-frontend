import { AfterViewInit, Component, Input } from '@angular/core';
import { getNodeDatabase } from 'src/app/logic/database/node-database';
import { baseIdToNodeId } from 'src/app/logic/model/enum/node-id';
import * as nm from 'src/app/logic/model/interface/node-model';
import { NodeDataService } from './node-data/node-data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass']
})
export class NodeComponent implements AfterViewInit {

  private baseId: string;

  private nodeModel: nm.NodeModel;

  constructor(private nodeDataService: NodeDataService) {
    this.baseId = "undefined-id";
    this.nodeModel = nm.cloneDefaultValue();
  }

  public ngAfterViewInit(): void {
    this.initNodeModel();
    this.initDynamics();
  }

  private initDynamics(): void {
    this.nodeDataService.getObservable.subscribe(props => {
      if(props.baseId === this.baseId) {
        this.nodeModel = nm.updateWithDynamicProperties(this.nodeModel, props);
      }
    });
  }

  private initNodeModel(): void {
    const name: string | undefined = getNodeDatabase().get(baseIdToNodeId(this.baseId))?.name;

    if(name === undefined) {
      throw new Error("Node component name unfound");
    }
    
    this.nodeModel.name = name;
  }

  public get getNodeModel(): nm.NodeModel {
    return this.nodeModel;
  }

  public get getBaseId(): string {
    return this.baseId;
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
}
