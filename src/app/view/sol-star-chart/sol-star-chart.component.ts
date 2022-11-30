import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/logic/controller/websocket/websocket.service';

@Component({
  selector: 'app-sol-star-chart',
  templateUrl: './sol-star-chart.component.html',
  styleUrls: ['./sol-star-chart.component.sass']
})
export class SolStarChartComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {

  }

  ngOnInit(): void {
  }

}
