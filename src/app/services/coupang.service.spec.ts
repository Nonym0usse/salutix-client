import { TestBed } from '@angular/core/testing';

import { CoupangService } from './coupang.service';

describe('CoupangService', () => {
  let service: CoupangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoupangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
