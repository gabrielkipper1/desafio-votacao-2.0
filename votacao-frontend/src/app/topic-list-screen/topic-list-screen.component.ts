import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TopicCardComponent } from '../topic-card/topic-card.component';
import { Router } from '@angular/router';
import { TopicService } from '../services/topic-service/topic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Topic } from '../interfaces/topic';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-topic-list-screen',
  standalone: true,
  imports: [
    TopicCardComponent, MatCardModule, MatInputModule,
    HttpClientModule, CommonModule, TopicCardComponent,
    MatButtonModule, MatIconModule, FormsModule, MatInputModule,
    MatFormFieldModule],
  templateUrl: './topic-list-screen.component.html',
  styleUrl: './topic-list-screen.component.scss',
  providers: [TopicService, HttpClient]
})
export class TopicListScreenComponent {
  topics$!: Observable<Topic[]>;
  searchTerm: string = '';
  canCreateTopic: boolean = false;

  constructor(private router: Router, private topicService: TopicService, private auth: AuthService) { }

  ngOnInit() {
    this.topics$ = this.topicService.getActiveTopics({
      category: ""
    });
    this.checkForAdmin();
  }

  private checkForAdmin() {
    const token = this.auth.getToken();
    if (token !== null) {
      this.canCreateTopic = token?.isAdmin || false;
    }
  }

  update() {
    this.topics$ = this.topicService.getActiveTopics({
      category: this.searchTerm
    });

  }

  onCreateNewTopicClicked() {
    this.router.navigate(['/', 'new-topic']);
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/', 'login']);
  }

}
