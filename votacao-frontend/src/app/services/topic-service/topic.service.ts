import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic';
import { TopicPostData } from '../../interfaces/topic-post-data';
import { TopicSearchData } from '../../interfaces/topic-search-data';
import { InterfaceToQuery } from '../helpers/interface-to-query-params';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  endpoint = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getActiveTopics(search: TopicSearchData): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.endpoint}/topic`, { params: InterfaceToQuery(search) });
  }

  getTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.endpoint}/topic/${id}`);
  }

  getTopicAndSessions(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.endpoint}/topic/${id}/session`);
  }

  createTopic(topic: TopicPostData) {
    return this.http.post(`${this.endpoint}/topic`, topic);
  }
}
