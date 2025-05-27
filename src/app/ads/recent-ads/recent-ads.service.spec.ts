import { TestBed } from '@angular/core/testing';

import { RecentAdsService } from './recent-ads.service';

describe('RecentAdsService', () => {
  let service: RecentAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
