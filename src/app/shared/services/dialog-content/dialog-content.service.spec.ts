import { TestBed } from '@angular/core/testing';

import { DialogContentService } from './dialog-content.service';

describe('DialogContentService', () => {
  let service: DialogContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
