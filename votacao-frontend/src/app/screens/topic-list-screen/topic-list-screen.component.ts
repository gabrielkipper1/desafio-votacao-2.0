import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TopicService } from '../../services/topic-service/topic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Topic } from '../../interfaces/topic';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, catchError, ignoreElements, of } from 'rxjs';
import { LoadingComponent } from '../../components/loading-component/loading.component';
import { UserTokenData } from '../../interfaces/auth/user-token-data';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
@Component({
  selector: 'app-topic-list-screen',
  standalone: true,
  imports: [
    TopicCardComponent, MatCardModule, MatInputModule,
    HttpClientModule, CommonModule, TopicCardComponent,
    MatButtonModule, MatIconModule, FormsModule, MatInputModule,
    MatFormFieldModule, LoadingComponent],
  templateUrl: './topic-list-screen.component.html',
  styleUrl: './topic-list-screen.component.scss',
  providers: [TopicService, HttpClient]
})
export class TopicListScreenComponent {
  user$!: Observable<UserTokenData>;
  topics$!: Observable<Topic[]>;
  searchTerm: string = '';
  errorMessage: string | undefined = undefined;
  canCreateTopic: boolean = false;
  isSignedIn: boolean = false;

  constructor(private router: Router, private topicService: TopicService, private auth: AuthService) { }

  ngOnInit() {
    this.topics$ = this.topicService.getActiveTopics({ category: "" }).pipe(
      catchError((err) => {
        console.log("erro catch")
        this.setErrorMessage(err.error);
        return of(err);
      })
    );

    this.checkForAdmin();
  }

  private checkForAdmin() {
    const token = this.auth.getToken();
    console.log("token", token);

    if (token !== null && token !== undefined) {
      this.isSignedIn = true;
      this.canCreateTopic = token?.isAdmin || false;
    }
    else {
      this.isSignedIn = false;
      this.canCreateTopic = false;
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

  setErrorMessage(message: any) {
    if (message === undefined || 'string' !== typeof message) {
      message = 'Erro desconhecido';
    }
    this.errorMessage = message;
  }

}
