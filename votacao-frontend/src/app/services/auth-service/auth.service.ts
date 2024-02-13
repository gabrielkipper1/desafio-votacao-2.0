import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData } from '../../interfaces/auth/sign-in-data';
import { SignUpData } from '../../interfaces/auth/sign-up-data';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { UserTokenData } from '../../interfaces/auth/user-token-data';
import { TokenService } from '../token-service/token.service';
import { JsonPipe } from '@angular/common';
import { SubscriptSizing } from '@angular/material/form-field';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: UserTokenData | undefined;
  onSignIn!: Subscription;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  signIn(signInData: SignInData): Observable<UserTokenData> {
    return this.http.post<UserTokenData>('http://localhost:3000/signin', signInData).pipe(map(data => {
      this.saveToken(data);
      return data;
    }));
  }

  signUp(signUpData: SignUpData) {
    return this.http.post('http://localhost:3000/signup', signUpData).pipe(map(data => {
      this.saveToken(data as UserTokenData);
      return data;
    }));
  }

  validate(userToken: string): Observable<boolean> {
    if (this.tokenService === undefined) {
      return new Observable<boolean>(observer => {
        observer.next(false);
      })
    }
    return this.http.post<UserTokenData>('http://localhost:3000/validate', { token: userToken }).
      pipe(map(data => {
        this.saveToken(data);
        return true;
      }));
  }

  updateUserInfo(): Observable<boolean> {
    if (this.userToken === undefined) {
      return this.validate(this.tokenService.getToken()?.token as string).pipe(
        catchError(error => {
          this.signOut();
          return of(true);
        }),
      );
    }

    return this.http.post<UserTokenData>('http://localhost:3000/validate', { token: this.userToken.token }).
      pipe(map(data => {
        this.saveToken(data);
        return true;
      }));
  }

  isLoggedIn(): Observable<boolean> {
    if (this.userToken !== undefined) {
      return this.validate(this.userToken.token).pipe(map(data => {
        return data !== undefined;
      }));
    }

    return new Observable<boolean>(observer => {
      observer.next(false);
    });

  }

  saveToken(tokenData: UserTokenData) {
    this.userToken = tokenData;
    this.tokenService.saveToken(tokenData);
  }

  signOut() {
    this.userToken = undefined;
    this.tokenService.removeToken();
  }

  getToken(): UserTokenData | undefined {
    if (this.tokenService.getToken() !== undefined) {
      return this.userToken;
    }

    this.userToken = this.tokenService.loadToken();
    return this.userToken;
  }

}
