import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { showErrorSnackBar, showSuccessSnackBar } from '../../helper-functions/show-snack-bar';
import { isEmailValid } from '../../helper-functions/email-validator';
import { validateCPF } from '../../helper-functions/cpf-validator';
import { TextFieldModule } from '@angular/cdk/text-field';
import { passwordValidator } from '../../helper-functions/password-match-validator';
import { cpfFormValidator } from '../../helper-functions/cpf-form-validator';


@Component({
  selector: 'app-signup-screen',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardMdImage, ReactiveFormsModule],
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss'
})
export class SignupScreenComponent {
  signupForm!: FormGroup;

  constructor(private router: Router, private snackbar: MatSnackBar, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', [Validators.required, cpfFormValidator()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [passwordValidator,],
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      showErrorSnackBar('Formulário inválido, verifique os campos', this.snackbar);
      return;
    }

    this.authService.signUp({
      cpf: this.signupForm.value.cpf,
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      password: this.signupForm.value.password,
    }).subscribe(
      {
        next: () => this.goToHome(),
        error: (err) => showErrorSnackBar(err.error, this.snackbar),
      }
    );
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }

  goBack() {
    this.router.navigate(['/', 'login']);
  }

  onEnterKey() {
    this.signup();
  }
}
