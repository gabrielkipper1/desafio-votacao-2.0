import { Component, Input } from '@angular/core';
import { TopicDetailComponent } from '../../components/topic-detail-component/topic-detail.component';
import { Topic } from '../../interfaces/topic';
import { TopicService } from '../../services/topic-service/topic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionTimerComponent } from '../../components/session-timer-component/session-timer.component';
import { VotingResultComponent } from '../voting-result-screen/voting-result.component';
import { LoadingComponent } from '../../components/loading-component/loading.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, map } from 'rxjs';

@Component({
  selector: 'app-topic-detail-screen',
  standalone: true,
  imports: [
    TopicDetailComponent, SessionTimerComponent, HttpClientModule, MatButtonModule,
    VotingResultComponent, LoadingComponent, CommonModule, RouterModule, MatIconModule
  ],
  providers: [TopicService, HttpClient],
  templateUrl: './topic-detail-screen.component.html',
  styleUrl: './topic-detail-screen.component.scss'
})
export class TopicDetailScreenComponent {
  topic$!: Observable<Topic>;
  errorMessage: string | undefined = undefined;

  constructor(private topicService: TopicService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const topicId = Number(this.activedRoute.snapshot.paramMap.get('topicId'));
    this.topic$ = this.topicService.getTopicAndSessions(topicId).pipe(
      catchError((err) => { this.setErrorMessage(err.error); return []; }),
      // map((topic) => { this.topic = topic; return topic; })
    );
  }

  setErrorMessage(message: string) {
    console.log("error message!");
    console.log(message);
    if ('string' !== typeof message) {
      message = 'Erro desconhecido';
    }
    this.errorMessage = message;
  }

  gotoHome() {
    this.router.navigate(['/', 'home']);
  }
}
