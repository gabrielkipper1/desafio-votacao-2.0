import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VoteService } from './vote.service';
import { HttpClient } from '@angular/common/http';

describe('VoteService', () => {
  let service: VoteService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
      ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
