import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData } from '../../interfaces/auth/sign-in-data';
import { SignUpData } from '../../interfaces/auth/sign-up-data';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { UserTokenData } from '../../interfaces/auth/user-token-data';
import { TokenService } from '../token-service/token.service';
import { JsonPipe } from '@angular/common';
import { SubscriptSizing } from '@angular/material/form-field';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  onSignIn!: Subscription;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  signIn(signInData: SignInData): Observable<UserTokenData> {
    return this.http.post<UserTokenData>(environment.host + environment.signIn, signInData).pipe(map(data => {
      this.saveToken(data);
      return data;
    }));
  }

  signUp(signUpData: SignUpData) {
    return this.http.post(environment.host + environment.signUp, signUpData).pipe(map(data => {
      this.saveToken(data as UserTokenData);
      return data;
    }));
  }

  validate(token: string): Observable<boolean> {
    if (this.getToken() === undefined) {
      return of(false);
    }

    return this.http.post<UserTokenData>(environment.host + environment.validate, { token: this.getToken()?.token }).
      pipe(map(data => {
        this.saveToken(data);
        return true;
      }));
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(environment.host + environment.admin);
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (token !== undefined) {
      return this.validate(token.token).pipe(map(data => {
        return data !== undefined;
      }));
    }
    return of(false);
  }

  getToken(): UserTokenData | undefined {
    return this.tokenService.getToken();
  }

  saveToken(tokenData: UserTokenData) {
    this.tokenService.saveToken(tokenData);
  }

  signOut() {
    this.tokenService.removeToken();
  }


}
