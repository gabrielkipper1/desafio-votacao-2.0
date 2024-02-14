import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VoteService } from '../../services/vote-service/vote.service';
import { Topic } from '../../interfaces/topic';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VotingResult } from '../../interfaces/voting-result';
import { CommonModule } from '@angular/common';
import { VoteResultLineComponent } from '../../components/vote-result-line/vote-result-line.component';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { VotingOptionsDisplayValues } from '../../interfaces/voting-options-display-values';
import { LoadingComponent } from '../../components/loading-component/loading.component';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, CommonModule, VoteResultLineComponent, LoadingComponent],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
  providers: [HttpClient, VoteService]
})
export class VotingResultComponent {
  @Input({ required: true }) topic!: Topic;
  votes$!: Observable<VotingResult[]>;
  totalVotes!: number;
  isActive = false;
  winner: VotingResult | undefined;
  winnerDisplayText: string = "";
  errorMessage: string | undefined = undefined;

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    if (this.topic !== undefined && this.topic.id !== undefined) {
      this.votes$ = this.voteService.getVotesByTopicId(this.topic.id).pipe(
        catchError((error) => {
          this.errorMessage = error.error;
          return of([]);
        }),
        map((votes: VotingResult[]) => {
          //this depends on voting information
          this.calculateTotalVotes(votes);
          this.getWinner(votes);
          return votes;
        }
        )
      );

      //this only depends on topic information
      this.setActiveSession();
    }
  }

  calculateTotalVotes(votes: VotingResult[]) {
    this.totalVotes = votes.reduce((acc, vote) => acc + Number(vote.votes), 0);
  }

  getWinner(votes: VotingResult[]) {
    let winner: VotingResult | undefined;
    let maxCount = 0;

    for (const vote of votes) {
      if (vote.votes > maxCount) {
        winner = vote;
        maxCount = vote.votes;
      } else if (vote.votes === maxCount) {
        winner = undefined;
      }
    }
    this.winner = winner;
    this.winnerDisplayText = winner ? VotingOptionsDisplayValues[this.winner?.option as keyof typeof VotingOptionsDisplayValues] as string : "Empate";
  }

  setActiveSession() {
    this.isActive = this.topic.sessions.filter(
      session => new Date(session.end_date.toString()) > new Date()).length > 0;
  }
}
