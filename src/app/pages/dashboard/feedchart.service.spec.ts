import { TestBed, inject } from '@angular/core/testing';

import { FeedchartService } from './feedchart.service';

describe('FeedchartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedchartService]
    });
  });

  it('should be created', inject([FeedchartService], (service: FeedchartService) => {
    expect(service).toBeTruthy();
  }));
});
