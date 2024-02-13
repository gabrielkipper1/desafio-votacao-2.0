import { Component, Input, input } from '@angular/core';
import { Topic } from '../interfaces/topic';
import { CommonModule } from '@angular/common';
import { SessionTimerComponent } from '../session-timer-component/session-timer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VotingOption } from '../interfaces/voting-option';
import { VoteService } from '../services/vote-service/vote.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Session } from '../interfaces/session';

@Component({
  selector: 'app-vote-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SessionTimerComponent, MatCardModule, HttpClientModule, MatSnackBarModule],
  providers: [VoteService, HttpClient],
  templateUrl: './vote-component.component.html',
  styleUrl: './vote-component.component.scss'
})
export class VoteComponentComponent {
  @Input() topic!: Topic;
  @Input() validSession!: Session;

  constructor(private voteService: VoteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.topic != undefined && this.topic.sessions !== undefined) {
      this.getValidSession();
    }
  }

  getValidSession() {
    const now = new Date().getTime();
    for (let session of this.topic.sessions) {
      const endTime = new Date(session.end_date).getTime();
      if (endTime > now) {
        this.validSession = session;
      }
    }
  }

  vote(votingOption: string) {
    const vote: VotingOption = VotingOption[votingOption as keyof typeof VotingOption];
    this.voteService.vote({ topicId: this.topic.id, vote: vote, }).subscribe(
      {
        next: () => {
          this.showMessage();
        },
        error: (error) => {
          this.showError(error.error);
        }
      }
    )
  }

  showMessage() {
    this.snackBar.open('Voto realizado com sucesso!', 'Fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  showError(errorMessage: string) {
    this.snackBar.open(`Erro: ${errorMessage}`, 'Fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
