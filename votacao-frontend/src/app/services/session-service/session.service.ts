import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionByTopicId(id: number): Observable<Session> {
    return this.http.get<Session>(`http://localhost:3000/topic/${id}/session`);
  }

}
