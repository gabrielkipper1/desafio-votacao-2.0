import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic';
import { TopicPostData } from '../../interfaces/topic-post-data';
import { TopicSearchData } from '../../interfaces/topic-search-data';
import { InterfaceToQuery } from '../helpers/interface-to-query-params';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  getActiveTopics(search: TopicSearchData): Observable<Topic[]> {
    return this.http.get<Topic[]>(environment.host + environment.topic, { params: InterfaceToQuery(search) });
  }

  getTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(environment.host + environment.topicById(id));
  }

  getTopicAndSessions(id: number): Observable<Topic> {
    return this.http.get<Topic>(environment.host + environment.topicByIdWithSession(id));
  }

  createTopic(topic: TopicPostData) {
    return this.http.post(environment.host + environment.topic, topic);
  }
}
