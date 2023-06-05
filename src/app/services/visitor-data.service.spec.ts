import { TestBed } from '@angular/core/testing';

import { VisitorDataService } from './visitor-data.service';

describe('VisitorDataService', () => {
  let service: VisitorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
