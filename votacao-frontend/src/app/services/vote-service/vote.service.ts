import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vote } from '../../interfaces/vote';
import { VotingResult } from '../../interfaces/voting-result';
import { VotePostData } from '../../interfaces/vote-post-data';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private http: HttpClient) { }

  vote(voteData: VotePostData): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/vote', voteData);
  }

  getVotesByTopicId(id: number): Observable<VotingResult[]> {
    return this.http.get<VotingResult[]>(`http://localhost:3000/vote/topic/${id}`);
  }
}
