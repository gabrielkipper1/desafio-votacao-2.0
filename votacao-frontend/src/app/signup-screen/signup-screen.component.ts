import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-signup-screen',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardMdImage],
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss'
})
export class SignupScreenComponent {
  nome: string = "";
  email: string = "";
  cpf: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private router: Router, private snackbar: MatSnackBar, private authService: AuthService) { }

  signup() {

    this.authService.signUp({
      cpf: this.cpf,
      email: this.email,
      name: this.nome,
      password: this.password,
    }).subscribe(
      {
        next: () => this.goToHome(),
        error: (err) => this.showErrorMessage(err.error),
      }
    );
  }

  showErrorMessage(message: string) {
    this.snackbar.open(message, undefined, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' })
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }

  goBack() {
    this.router.navigate(['/', 'login']);
  }
}
