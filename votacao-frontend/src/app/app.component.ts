import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopicService } from './services/topic-service/topic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'votacao-frontend';
}
