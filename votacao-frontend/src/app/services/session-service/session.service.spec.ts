import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionService', () => {
  let http: HttpClientTestingModule;
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient
      ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(SessionService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
