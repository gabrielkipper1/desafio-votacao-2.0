import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TopicService } from '../services/topic-service/topic.service';
import { BrowserModule } from '@angular/platform-browser';
import { Topic } from '../interfaces/topic';
import { Session } from '../interfaces/session';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SessionService } from '../services/session-service/session.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from '../loading-component/loading.component';
import { CommonModule } from '@angular/common';
import { SessionTimerComponent } from '../session-timer-component/session-timer.component';
import { VoteComponentComponent } from '../vote-component/vote-component.component';
import { TopicDetailComponent } from '../topic-detail-component/topic-detail.component';
import { AuthService } from '../services/auth-service/auth.service';
import { MatIconModule } from '@angular/material/icon';

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
  providers: [TopicService, SessionService, HttpClient]
})
export class VoteScreenComponent {
  topic!: Topic

  constructor(
    private activedRoute: ActivatedRoute,
    private topicService: TopicService,
    private router: Router) { }

  ngOnInit() {
    const topicId = Number(this.activedRoute.snapshot.paramMap.get('topicId'));
    this.topicService.getTopicAndSessions(topicId).subscribe((top: Topic) => {
      this.topic = top;
      console.log('Topic', this.topic);
    });
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }

  isSessionActive() {
    return this.topic.sessions.filter(session => session.end_date > new Date()).length > 0;
  }

  onVoteButtonClick() {
    console.log('Voting');
  }

  onBackButtonClick() {
    console.log('Back');
  }


}
