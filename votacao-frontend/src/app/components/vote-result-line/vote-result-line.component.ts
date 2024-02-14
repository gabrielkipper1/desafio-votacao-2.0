import { Component, Input } from '@angular/core';
import { VotingOptionsDisplayValues } from '../../interfaces/voting-options-display-values';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { VotingOptionsDisplayColors } from '../../interfaces/voting-display-colors';

@Component({
  selector: 'app-vote-result-line',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './vote-result-line.component.html',
  styleUrl: './vote-result-line.component.scss'
})
export class VoteResultLineComponent {
  @Input({ required: true }) option!: string;
  @Input({ required: true }) count!: number;
  @Input({ required: true }) total!: number;
  @Input({ required: true }) showBar!: boolean;

  displayOption!: string;
  lineColor!: string;
  fillPercentage!: number;

  constructor() { }
  ngOnInit() {
    this.displayOption = VotingOptionsDisplayValues[this.option as keyof typeof VotingOptionsDisplayValues];
    this.lineColor = VotingOptionsDisplayColors[this.option as keyof typeof VotingOptionsDisplayColors];
    this.fillPercentage = (this.count / this.total) * 100;
  }
}
