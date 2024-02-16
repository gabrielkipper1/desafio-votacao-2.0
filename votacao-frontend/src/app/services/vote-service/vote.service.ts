import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vote } from '../../interfaces/vote';
import { VotingResult } from '../../interfaces/voting-result';
import { VotePostData } from '../../interfaces/vote-post-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private http: HttpClient) { }

  vote(voteData: VotePostData): Observable<boolean> {
    return this.http.post<boolean>(environment.host + environment.vote, voteData);
  }

  getVotesByTopicId(id: number): Observable<VotingResult[]> {
    return this.http.get<VotingResult[]>(environment.host + environment.votesByTopic(id));
  }
}
