import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VoteService } from '../services/vote-service/vote.service';
import { Topic } from '../interfaces/topic';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VotingResult } from '../interfaces/voting-result';
import { CommonModule } from '@angular/common';
import { VoteResultLineComponent } from '../vote-result-line/vote-result-line.component';
import { Observable, Subscription, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, CommonModule, VoteResultLineComponent],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
  providers: [HttpClient, VoteService]
})
export class VotingResultComponent {
  @Input({ required: true }) topic!: Topic;
  votes$!: Observable<VotingResult[]>;
  totalVotes!: number;

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    if (this.topic !== undefined && this.topic.id !== undefined) {
      this.votes$ = this.voteService.getVotesByTopicId(this.topic.id).pipe(
        catchError((error) => {
          return of([]);
        }),
        map((votes: VotingResult[]) => {
          this.totalVotes = votes.reduce((acc, vote) => acc + Number(vote.votes), 0);
          return votes;
        }
        )
      );
    }
  }

  isSessionActive(): boolean {
    return this.topic.sessions.filter(session => session.end_date > new Date()).length > 0;
  }
}
