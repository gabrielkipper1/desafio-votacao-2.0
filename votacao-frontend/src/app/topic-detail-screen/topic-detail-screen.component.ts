import { Component, Input } from '@angular/core';
import { TopicDetailComponent } from '../topic-detail-component/topic-detail.component';
import { Topic } from '../interfaces/topic';
import { TopicService } from '../services/topic-service/topic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionTimerComponent } from '../session-timer-component/session-timer.component';
import { TopicResultComponent } from '../topic-result/topic-result.component';
import { LoadingComponent } from '../loading-component/loading.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topic-detail-screen',
  standalone: true,
  imports: [
    TopicDetailComponent, SessionTimerComponent, HttpClientModule, MatButtonModule,
    TopicResultComponent, LoadingComponent, CommonModule, RouterModule, MatIconModule
  ],
  providers: [TopicService, HttpClient],
  templateUrl: './topic-detail-screen.component.html',
  styleUrl: './topic-detail-screen.component.scss'
})
export class TopicDetailScreenComponent {
  topic!: Topic;

  constructor(private topicService: TopicService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const topicId = Number(this.activedRoute.snapshot.paramMap.get('topicId'));
    this.topicService.getTopicAndSessions(topicId).subscribe(
      topic => {
        this.topic = topic;
        console.log('Topic', this.topic);
      });
  }

  gotoHome() {
    this.router.navigate(['/', 'home']);
  }
}
