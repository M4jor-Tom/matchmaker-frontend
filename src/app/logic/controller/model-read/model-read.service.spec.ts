import { TestBed } from '@angular/core/testing';

import { ModelReadService } from './model-read.service';

describe('ModelReadService', () => {
  let service: ModelReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
