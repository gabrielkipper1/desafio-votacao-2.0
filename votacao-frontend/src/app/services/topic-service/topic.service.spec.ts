import { TestBed } from '@angular/core/testing';

import { TopicService } from './topic.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopicService', () => {
  let service: TopicService;
  let http: HttpClient;

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
    service = TestBed.inject(TopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
