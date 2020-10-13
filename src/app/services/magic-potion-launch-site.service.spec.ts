import { TestBed } from '@angular/core/testing';

import { MagicPotionLaunchSiteService } from './magic-potion-launch-site.service';

describe('MagicPotionLaunchSiteService', () => {
  let service: MagicPotionLaunchSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicPotionLaunchSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
