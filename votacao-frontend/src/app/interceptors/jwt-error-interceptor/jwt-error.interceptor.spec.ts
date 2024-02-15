import { TestBed } from '@angular/core/testing';

import { JwtErrorInterceptor } from './jwt-error.interceptor';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JwtErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtErrorInterceptor,
      HttpClient
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtErrorInterceptor = TestBed.inject(JwtErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
