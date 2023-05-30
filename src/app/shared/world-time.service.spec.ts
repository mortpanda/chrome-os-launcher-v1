import { TestBed } from '@angular/core/testing';

import { WorldTimeService } from './world-time.service';

describe('WorldTimeService', () => {
  let service: WorldTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
