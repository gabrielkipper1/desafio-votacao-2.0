import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenService } from '../services/token-service/token.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth-interceptor/auth.interceptor';
import { LoadingComponent } from '../loading-component/loading.component';

@Component({
  selector: 'app-app-start',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './app-start.component.html',
  styleUrl: './app-start.component.scss',
  providers: [TokenService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AppStartComponent {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkForLoggedInUser();
  }

  async checkForLoggedInUser() {
    const userToken = this.auth.getToken();

    if (!userToken) {
      this.goToHome();
      return;
    }

    this.auth.validate(userToken?.token!).subscribe({
      next: (value) => {
        this.goToHome();
      },
      error: (err) => {
        this.clearInvalidToken();
      },
    })

  }

  clearInvalidToken() {
    this.auth.signOut();
    this.goToHome();
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
