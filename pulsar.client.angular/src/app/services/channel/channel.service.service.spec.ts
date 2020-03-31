import { TestBed } from '@angular/core/testing';

import { Channel.ServiceService } from './channel.service.service';

describe('Channel.ServiceService', () => {
  let service: Channel.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Channel.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
