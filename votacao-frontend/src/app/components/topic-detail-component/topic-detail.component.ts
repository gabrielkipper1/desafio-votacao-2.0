import { Component, Input } from '@angular/core';
import { Topic } from '../../interfaces/topic';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss'
})
export class TopicDetailComponent {
  @Input({ required: true }) topic!: Topic;
  errorMessage: string | undefined = undefined;

  ngOnInit() {
    if (this.topic === undefined) {
      this.errorMessage = "Tópico não encontrado";
    }
  }
}
