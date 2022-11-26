import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialTemplateComponent } from './celestial-template.component';

describe('CelestialTemplateComponent', () => {
  let component: CelestialTemplateComponent;
  let fixture: ComponentFixture<CelestialTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelestialTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelestialTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
