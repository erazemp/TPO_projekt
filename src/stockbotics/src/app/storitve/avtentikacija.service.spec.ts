import { TestBed } from '@angular/core/testing';

import { AvtentikacijaService } from './avtentikacija.service';

describe('AvtentikacijaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvtentikacijaService = TestBed.get(AvtentikacijaService);
    expect(service).toBeTruthy();
  });
});
