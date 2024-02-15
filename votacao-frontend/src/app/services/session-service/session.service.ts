import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../interfaces/session';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionByTopicId(id: number): Observable<Session> {
    return this.http.get<Session>(environment.host + environment.session(id));
  }

}
