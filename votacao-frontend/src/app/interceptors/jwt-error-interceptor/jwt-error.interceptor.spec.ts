import { TestBed } from '@angular/core/testing';

import { JwtErrorInterceptor } from './jwt-error.interceptor';

describe('JwtErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtErrorInterceptor = TestBed.inject(JwtErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
