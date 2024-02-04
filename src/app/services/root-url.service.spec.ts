import { TestBed } from '@angular/core/testing';

import { RootUrlService } from './root-url.service';

describe('RootUrlService', () => {
  let service: RootUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
