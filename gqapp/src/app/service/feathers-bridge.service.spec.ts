import { TestBed } from '@angular/core/testing';

import { FeathersBridgeService } from './feathers-bridge.service';

describe('FeathersBridgeService', () => {
  let service: FeathersBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeathersBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
