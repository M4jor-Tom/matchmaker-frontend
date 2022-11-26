import { AfterViewInit, Component } from '@angular/core';
import * as nm from 'src/app/logic/model/interface/node-model';
import { NodeDataService } from './node-data/node-data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass']
})
export class NodeComponent implements AfterViewInit {

  private nodeModel: nm.NodeModel;

  constructor(private nodeDataService: NodeDataService) {
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
}
