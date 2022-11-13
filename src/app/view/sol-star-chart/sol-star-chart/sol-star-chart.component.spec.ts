import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolStarChartComponent } from './sol-star-chart.component';

describe('SolStarChartComponent', () => {
  let component: SolStarChartComponent;
  let fixture: ComponentFixture<SolStarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolStarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolStarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
