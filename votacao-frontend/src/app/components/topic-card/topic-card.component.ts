import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Topic } from '../../interfaces/topic';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  constructor(private router: Router, private dialog: Dialog) { }
  @Input() topic!: Topic;

  onDetailsButtonClick() {
    this.router.navigate(['/', "topic", this.topic.id]);
  }

  onVoteButtonClick() {
    this.router.navigate(["vote/" + this.topic.id]);
  }

}
