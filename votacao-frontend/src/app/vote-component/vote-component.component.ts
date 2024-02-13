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
import { Router } from '@angular/router';
import { showSuccessSnackBar } from '../helper-functions/show-snack-bar';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-component',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, CommonModule, MatButtonModule, SessionTimerComponent, MatCardModule, HttpClientModule, MatSnackBarModule, MatInputModule],
  providers: [VoteService, HttpClient],
  templateUrl: './vote-component.component.html',
  styleUrl: './vote-component.component.scss'
})
export class VoteComponentComponent {
  @Input({ required: true }) topic!: Topic;
  validSession!: Session;
  cpf!: string;

  constructor(private voteService: VoteService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.topic !== undefined && this.topic.sessions !== undefined) {
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
    this.voteService.vote({ topicId: this.topic.id, vote: vote, cpf: this.cpf }).subscribe(
      {
        next: () => showSuccessSnackBar("Voto computado com sucesso!", this.snackBar),
      }
    )
  }

  goToTopicPage() {
    this.router.navigate(['/', "topic", this.topic.id]);
  }
}
