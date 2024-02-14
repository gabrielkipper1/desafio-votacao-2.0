import { Component, Input } from '@angular/core';
import { Topic } from '../../interfaces/topic';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss'
})
export class TopicDetailComponent {
  @Input({ required: true }) topic!: Topic;
}
