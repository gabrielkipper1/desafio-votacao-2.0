import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { TokenService } from '../services/token-service/token.service';
import { Observer } from 'rxjs';
import { UserTokenData } from '../interfaces/auth/user-token-data';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteService } from '../services/route-service/route.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, CommonModule, HttpClientModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
  providers: [TokenService, HttpClient, RouteService]
})
export class LoginScreenComponent {
  email!: string;
  password!: string;
  token!: Observer<UserTokenData>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private routeService: RouteService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() { }

  login() {
    console.log("login with email: " + this.email + " and password: " + this.password);
    this.authService.signIn({ email: this.email, password: this.password }).subscribe({
      next: (value: UserTokenData) => {
        console.log('SIGN IN token data', value);
        this.onSignUp(value);
      },
      error: (err) => {
        this.snackbar.open(
          err.error, undefined, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' }
        )
      },
    })
  }

  onSignUp(tokenData: UserTokenData) {
    if (this.routeService.hasSavedRoute()) {
      //if the user tried to access a protected route before logging in, redirect them to that route
      this.router.navigate([this.routeService.navigateToSavedRoute()]);
      return;
    }

    this.router.navigate(['/', 'home']);
  }


  signup() {
    this.router.navigate(['/', 'signup']);
  }
}

