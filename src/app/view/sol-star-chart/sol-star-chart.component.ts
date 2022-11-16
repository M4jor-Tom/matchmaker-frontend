import { Component, OnInit } from '@angular/core';
import { ModelReadService } from 'src/app/logic/controller/model-read/model-read.service';

@Component({
  selector: 'app-sol-star-chart',
  templateUrl: './sol-star-chart.component.html',
  styleUrls: ['./sol-star-chart.component.sass']
})
export class SolStarChartComponent implements OnInit {

  constructor(private modelReadService: ModelReadService) {

  }

  ngOnInit(): void {
  }

}
