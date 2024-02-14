import { Component, Input } from '@angular/core';
import { VotingOptionsDisplayValues } from '../../interfaces/voting-options-display-values';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { VotingOptionsDisplayColors } from '../../interfaces/voting-display-colors';
import { VotingResult } from '../../interfaces/voting-result';

@Component({
  selector: 'app-vote-result-line',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './vote-result-line.component.html',
  styleUrl: './vote-result-line.component.scss'
})
export class VoteResultLineComponent {
  @Input({ required: true }) result!: VotingResult;
  @Input({ required: true }) total!: number;
  @Input({ required: true }) showBar!: boolean;

  displayOption!: string;
  lineColor!: string;
  fillPercentage!: number;
  errorMessage: string | undefined = undefined;

  constructor() { }

  ngOnInit() {
    if (this.result === undefined || this.total === undefined) {
      this.errorMessage = "Dados inválidos, não será possível mostrar o resultado.";
      return;
    }

    this.displayOption = VotingOptionsDisplayValues[this.result.option as keyof typeof VotingOptionsDisplayValues];
    this.lineColor = VotingOptionsDisplayColors[this.result.option as keyof typeof VotingOptionsDisplayColors];
    this.fillPercentage = (this.result.votes / this.total) * 100;
  }
}
