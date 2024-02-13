import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TopicService } from '../services/topic-service/topic.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-create-topic-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, HttpClientModule],
  templateUrl: './create-topic-form.component.html',
  styleUrl: './create-topic-form.component.scss',
  providers: [TopicService]
})
export class CreateTopicFormComponent {
  description!: string;
  category!: string;
  duration!: number;

  constructor(private topicService: TopicService) { }

  createTopic() {
    console.log('Creating topic');
    this.topicService.createTopic({
      description: this.description,
      category: this.category,
      durationInMinutes: this.duration
    }).subscribe(() => {
      console.log('Topic created');
    });
  }
} 
