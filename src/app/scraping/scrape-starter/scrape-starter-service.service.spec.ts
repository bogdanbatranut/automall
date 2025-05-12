import { TestBed } from '@angular/core/testing';

import { ScrapeStarterServiceService } from './scrape-starter-service.service';

describe('ScrapeStarterServiceService', () => {
  let service: ScrapeStarterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapeStarterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
