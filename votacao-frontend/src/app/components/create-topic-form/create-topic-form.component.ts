import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TopicService } from '../../services/topic-service/topic.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showErrorSnackBar, showSuccessSnackBar } from '../../helper-functions/show-snack-bar';
import { getErrorMessage } from '../../helper-functions/get-error-message';

@Component({
  selector: 'app-create-topic-form',
  standalone: true,
  imports: [MatIconModule, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, HttpClientModule, FormsModule],
  templateUrl: './create-topic-form.component.html',
  styleUrl: './create-topic-form.component.scss',
  providers: [TopicService]
})
export class CreateTopicFormComponent {
  topicForm!: FormGroup;

  constructor(private topicService: TopicService, private formBuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.topicForm = this.formBuilder.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      duration: [0, Validators.min(0)]
    });
  }

  createTopic() {
    if (this.topicForm.invalid) {
      console.log('Invalid form');
      return;
    }

    this.topicService.createTopic({
      description: this.topicForm.value.description,
      category: this.topicForm.value.category,
      durationInMinutes: this.topicForm.value.duration
    }
    ).subscribe({
      next: () => {
        this.success();
      },
      error: (error) => {
        this.error(error);
      }
    });
  }

  success() {
    showSuccessSnackBar('Pauta criada com sucesso', this.snackbar);
    this.goToHome();
  }

  error(error: Error) {
    showErrorSnackBar(getErrorMessage(error), this.snackbar);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
} 
