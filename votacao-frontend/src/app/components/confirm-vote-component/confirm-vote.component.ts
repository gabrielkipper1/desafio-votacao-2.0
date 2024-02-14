import { DialogModule } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-vote',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatDialogModule, CommonModule, MatFormFieldModule, DialogModule, MatDialogActions, MatDialogContent, FormsModule, MatInputModule],
  templateUrl: './confirm-vote.component.html',
  styleUrl: './confirm-vote.component.scss'
})
export class ConfirmVoteComponent {
  cpf!: string;

  constructor(private dialog: MatDialogRef<ConfirmVoteComponent>) { }
}
