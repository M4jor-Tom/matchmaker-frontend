import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as sscm from 'src/app/model/sol-star-chart-model'

@Injectable({
  providedIn: 'root'
})
export class ModelReadService {

  constructor() { }

  public getSolStarChartModelSubject(): BehaviorSubject<sscm.SolStarChartModel> {
    //  [TODO] Unmock
    return new BehaviorSubject<sscm.SolStarChartModel>(sscm.cloneDefaultValue());
  }
}
