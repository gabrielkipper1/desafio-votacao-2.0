import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TopicService } from '../../services/topic-service/topic.service';
import { BrowserModule } from '@angular/platform-browser';
import { Topic } from '../../interfaces/topic';
import { Session } from '../../interfaces/session';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SessionService } from '../../services/session-service/session.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from '../../components/loading-component/loading.component';
import { CommonModule } from '@angular/common';
import { SessionTimerComponent } from '../../components/session-timer-component/session-timer.component';
import { VoteComponentComponent } from '../../components/vote-component/vote-component.component';
import { TopicDetailComponent } from '../../components/topic-detail-component/topic-detail.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { showErrorSnackBar } from '../../helper-functions/show-snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessage } from '../../helper-functions/get-error-message';

@Component({
  selector: 'app-vote-screen',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatIconModule,
    HttpClientModule, VoteComponentComponent,
    MatProgressSpinnerModule, LoadingComponent, CommonModule,
    SessionTimerComponent, TopicDetailComponent,],
  templateUrl: './vote-screen.component.html',
  styleUrl: './vote-screen.component.scss',
  providers: [TopicService, SessionService, HttpClient, MatSnackBar]
})
export class VoteScreenComponent {
  topic$!: Observable<Topic>;
  sessionActive!: boolean;
  errorMessage: string | undefined = undefined;

  constructor(
    private activedRoute: ActivatedRoute,
    private topicService: TopicService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    const topicId = Number(this.activedRoute.snapshot.paramMap.get('topicId'));
    this.topic$ = this.topicService.getTopicAndSessions(topicId).pipe(
      catchError((err) => {
        this.onError(err);
        return of(err)
      }),
      map((topic) => {
        this.isSessionActive(topic);
        return topic;
      })
    );
  }

  onError(err: Error) {
    this.errorMessage = getErrorMessage(err);
    showErrorSnackBar(getErrorMessage(err), this.snackBar);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  isSessionActive(topic: Topic) {
    this.sessionActive = topic.sessions.filter(session => session.end_date > new Date()).length > 0;
  }
}
