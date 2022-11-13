import { TestBed } from '@angular/core/testing';

import { SolStarChartService } from './sol-star-chart.service';

describe('SolStarChartService', () => {
  let service: SolStarChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolStarChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
